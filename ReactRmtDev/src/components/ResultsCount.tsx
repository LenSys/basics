import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
  const { totalNumberOfJobResults } = useJobItemsContext();

  return (
    <p className="count">
      <span className="u-bold">{totalNumberOfJobResults}</span> results
    </p>
  );
}
