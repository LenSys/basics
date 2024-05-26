import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQueryJobItems, useSearchTextContext } from "../lib/hooks";
import { TJobItem, TPageDirection, TSortBy } from "../lib/types";
import { JOB_ITEMS_PER_PAGE } from "../lib/constants";

type JobItemsContextProviderProps = {
  children: React.ReactNode;
};

type TJobItemsContext = {
  isLoadingJobItems: boolean;
  jobItems: TJobItem[] | null;
  sortedAndSlicedJobItems: TJobItem[];
  totalNumberOfJobResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: TSortBy;
  handleChangePage: (direction: TPageDirection) => void;
  handleChangeSortBy: (newSortBy: TSortBy) => void;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: JobItemsContextProviderProps) {
  // dependency on other context
  const { debouncedSearchText } = useSearchTextContext();

  // state
  const [isLoadingJobItems, jobItems] =
    useSearchQueryJobItems(debouncedSearchText);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>("relevant");

  // derived / computed state
  const totalNumberOfJobResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfJobResults / JOB_ITEMS_PER_PAGE;

  // only calculate sorted job items if the job items or the sortby variable changes
  const sortedJobItems = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else if (sortBy === "recent") {
          return a.daysAgo - b.daysAgo;
        }
        return 0;
      }) || [],
    [jobItems, sortBy]
  );

  const sortedAndSlicedJobItems = useMemo(
    () =>
      sortedJobItems.slice(
        (currentPage - 1) * JOB_ITEMS_PER_PAGE,
        currentPage * JOB_ITEMS_PER_PAGE
      ),
    [currentPage, sortedJobItems]
  );

  // event handlers / actions

  const handleChangePage = useCallback((direction: TPageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: TSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  const contextValue = useMemo(
    () => ({
      isLoadingJobItems,
      jobItems,
      sortedAndSlicedJobItems,
      totalNumberOfJobResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      isLoadingJobItems,
      jobItems,
      sortedAndSlicedJobItems,
      totalNumberOfJobResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
