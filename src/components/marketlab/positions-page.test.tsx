import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { PositionWithMarket } from "@/lib/positions/types";
import { PositionCard } from "./position-card";
import { PositionsEmptyState } from "./positions-empty-state";
import { PositionsList } from "./positions-list";
import { PositionsPageIntro } from "./positions-page-intro";
import { PositionsSignIn } from "./positions-sign-in";

const marketId = "11111111-1111-1111-1111-111111111111";

const basePosition: PositionWithMarket = {
  positionId: "22222222-2222-2222-2222-222222222222",
  marketId,
  yesSharesCents: 0,
  noSharesCents: 0,
  investedCents: 0,
  market: {
    id: marketId,
    title: "Will it rain tomorrow?",
    status: "open",
    close_date: "2026-06-15T18:00:00.000Z",
  },
};

describe("PositionsSignIn", () => {
  it("shows sign-in prompt and login link", () => {
    const html = renderToStaticMarkup(<PositionsSignIn />);

    expect(html).toContain("Sign in to view positions");
    expect(html).toContain('href="/login"');
    expect(html).not.toContain("Yes shares");
  });
});

describe("PositionsEmptyState", () => {
  it("shows empty message and link to markets", () => {
    const html = renderToStaticMarkup(<PositionsEmptyState />);

    expect(html).toContain("No positions yet");
    expect(html).toContain('href="/markets"');
  });
});

describe("PositionsList", () => {
  it("shows empty state when there are no positions", () => {
    const html = renderToStaticMarkup(<PositionsList positions={[]} />);

    expect(html).toContain("No positions yet");
    expect(html).not.toContain("Yes shares");
  });
});

describe("PositionCard", () => {
  it("renders Yes shares when held", () => {
    const html = renderToStaticMarkup(
      <PositionCard
        position={{
          ...basePosition,
          yesSharesCents: 500,
          investedCents: 500,
        }}
      />,
    );

    expect(html).toContain("Yes shares");
    expect(html).toContain("$5.00 fake");
    expect(html).toContain("Will it rain tomorrow?");
    expect(html).toContain("Open");
  });

  it("renders No shares when held", () => {
    const html = renderToStaticMarkup(
      <PositionCard
        position={{
          ...basePosition,
          noSharesCents: 250,
          investedCents: 250,
        }}
      />,
    );

    expect(html).toContain("No shares");
    expect(html).toContain("$2.50 fake");
  });

  it("renders invested fake amount", () => {
    const html = renderToStaticMarkup(
      <PositionCard
        position={{
          ...basePosition,
          yesSharesCents: 1000,
          investedCents: 1000,
        }}
      />,
    );

    expect(html).toContain("Invested");
    expect(html).toContain("$10.00 fake");
  });

  it("links to the market detail page", () => {
    const html = renderToStaticMarkup(<PositionCard position={basePosition} />);

    expect(html).toContain("View market");
    expect(html).toContain(`/markets/${marketId}`);
  });
});

describe("Positions page UI", () => {
  it("renders intro without hero sections", () => {
    const html = renderToStaticMarkup(<PositionsPageIntro />);

    expect(html).toContain("My Positions");
    expect(html).not.toContain("hero2-bg.webp");
  });
});
