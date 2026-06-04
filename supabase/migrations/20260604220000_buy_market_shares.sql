-- Atomic fake-money buy: deduct balance, upsert position, ledger entry.
-- Uses auth.uid() only; never accepts user_id from the client.

create or replace function public.buy_market_shares(
  p_market_id uuid,
  p_side text,
  p_amount_cents bigint
)
returns table (
  balance_cents bigint,
  yes_shares_cents bigint,
  no_shares_cents bigint,
  invested_cents bigint
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_balance bigint;
  v_market_status text;
  v_close_date timestamptz;
  v_yes_shares bigint;
  v_no_shares bigint;
  v_invested bigint;
  v_description text;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'not_authenticated'
      using message = 'Sign in to buy shares with fake money.';
  end if;

  if p_amount_cents is null or p_amount_cents <= 0 then
    raise exception 'invalid_amount'
      using message = 'Enter a positive fake dollar amount.';
  end if;

  if p_side is distinct from 'yes' and p_side is distinct from 'no' then
    raise exception 'invalid_side'
      using message = 'Choose Yes or No.';
  end if;

  select m.status, m.close_date
  into v_market_status, v_close_date
  from public.markets m
  where m.id = p_market_id;

  if not found then
    raise exception 'market_not_found'
      using message = 'This market was not found.';
  end if;

  if v_market_status <> 'open' or v_close_date <= now() then
    raise exception 'market_not_buyable'
      using message = 'This market is not open for fake-money trades.';
  end if;

  select p.balance_cents
  into v_balance
  from public.profiles p
  where p.id = v_user_id
  for update;

  if not found then
    raise exception 'profile_not_found'
      using message = 'Your profile was not found.';
  end if;

  if v_balance < p_amount_cents then
    raise exception 'insufficient_balance'
      using message = 'You do not have enough fake balance for this buy.';
  end if;

  update public.profiles
  set balance_cents = balance_cents - p_amount_cents
  where id = v_user_id;

  insert into public.positions (
    user_id,
    market_id,
    yes_shares_cents,
    no_shares_cents,
    invested_cents
  )
  values (
    v_user_id,
    p_market_id,
    case when p_side = 'yes' then p_amount_cents else 0 end,
    case when p_side = 'no' then p_amount_cents else 0 end,
    p_amount_cents
  )
  on conflict (user_id, market_id) do update
  set
    yes_shares_cents = public.positions.yes_shares_cents + excluded.yes_shares_cents,
    no_shares_cents = public.positions.no_shares_cents + excluded.no_shares_cents,
    invested_cents = public.positions.invested_cents + excluded.invested_cents
  returning
    public.positions.yes_shares_cents,
    public.positions.no_shares_cents,
    public.positions.invested_cents
  into v_yes_shares, v_no_shares, v_invested;

  v_description := case
    when p_side = 'yes' then 'Bought Yes — fake workshop money'
    else 'Bought No — fake workshop money'
  end;

  insert into public.ledger_entries (
    user_id,
    market_id,
    amount_cents,
    entry_type,
    description
  )
  values (
    v_user_id,
    p_market_id,
    -p_amount_cents,
    'trade',
    v_description
  );

  return query
  select
    v_balance - p_amount_cents,
    v_yes_shares,
    v_no_shares,
    v_invested;
end;
$$;

revoke all on function public.buy_market_shares(uuid, text, bigint) from public;
grant execute on function public.buy_market_shares(uuid, text, bigint) to authenticated;
