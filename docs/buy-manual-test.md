# Buy flow manual test checklist

Run after `task db:push` and signing in with a seeded open market.

1. **Yes buy** — On `/markets/[id]`, buy $1.00 Yes. Balance decreases by $1.00 fake; Yes shares increase; ledger has a `trade` row with negative `amount_cents`.
2. **No buy** — Buy $0.50 No. No shares increase; balance decreases again.
3. **Invalid amount** — Submit `1.234`. UI shows validation error; balance unchanged.
4. **Overspend** — Enter more fake dollars than balance. Error about insufficient fake balance; balance unchanged.
5. **Closed market** — Open a closed market URL. “Buying unavailable” shown; no buy form.
6. **Signed out** — Log out, open open market. Sign-in prompt; submitting buy via devtools should fail with sign-in message.
7. **Page load** — `/markets/[id]` loads without `next/headers` errors from the buy form.
