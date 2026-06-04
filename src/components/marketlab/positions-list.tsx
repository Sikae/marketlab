import { PositionCard } from "@/components/marketlab/position-card";
import { PositionsEmptyState } from "@/components/marketlab/positions-empty-state";
import type { PositionWithMarket } from "@/lib/positions/types";

export function PositionsList({
  positions,
}: {
  positions: PositionWithMarket[];
}) {
  if (positions.length === 0) {
    return <PositionsEmptyState />;
  }

  return (
    <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {positions.map((position) => (
        <li key={position.positionId}>
          <PositionCard position={position} />
        </li>
      ))}
    </ul>
  );
}
