import { useJobItemsContext } from "../lib/hooks";
import JobList from "./JobList";

export default function JobListSearch() {
  const { sortedAndSlicedJobItems, isLoadingJobItems } = useJobItemsContext();

  return (
    <JobList jobItems={sortedAndSlicedJobItems} isLoading={isLoadingJobItems} />
  );
}
