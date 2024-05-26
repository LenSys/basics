import { useContext, useEffect, useState } from "react";
import { TJobItem, TJobItemDetails } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";
import { JobItemsContext } from "../contexts/JobItemsContextProvider";

type TJobItemApiResponse = {
  public: boolean;
  jobItem: TJobItemDetails;
};

type TJobItemsApiResponse = {
  public: boolean;
  jobItems: TJobItem[];
};

// ---------------------------------------------------------

const fetchJobItem = async (id: number): Promise<TJobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);

  // 4xx or 5xx error
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};

// ---------------------------------------------------------

const fetchJobItems = async (
  searchText: string
): Promise<TJobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

  // 4xx or 5xx error
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};

// ---------------------------------------------------------

export function useJobItems(jobItemIds: number[]) {
  const results = useQueries({
    queries: jobItemIds.map((jobItemId) => ({
      queryKey: ["job-item", jobItemId],
      queryFn: () => fetchJobItem(jobItemId),
      staleTime: 1000 * 60 * 60, // cache for 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: jobItemId ? true : false, // should query run on mount (-> when an id is passed, run the query)
      onError: (error: unknown) => {
        handleError(error);
      },
    })),
  });

  // get all job item results and remove undefined from array
  // and cast to correct type
  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined) as TJobItemDetails[];

  // if one query is still loading, return true
  const isLoading = results.some((result) => result.isLoading);

  return [isLoading, jobItems] as const;
}

// ---------------------------------------------------------

export function useSearchQueryJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60, // cache for 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: searchText ? true : false, // should query run on mount (-> when an id is passed, run the query)
      onError: (error: unknown) => {
        handleError(error);
      },
    }
  );

  const jobItems = data ? data.jobItems : null;
  return [isInitialLoading, jobItems] as const;
}

// ---------------------------------------------------------

export function useJobItemDetails(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60, // cache for 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: id ? true : false, // should query run on mount (-> when an id is passed, run the query)
      onError: (error) => {
        handleError(error);
      },
    }
  );

  // set job item details if available, otherwise set null
  // (convert undefined to null)
  const jobItemDetails = data && data?.jobItem ? data?.jobItem : null;
  return [isInitialLoading, jobItemDetails] as const;
}

// ---------------------------------------------------------

export function useDebounce<T>(value: T, delay = 250): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

export const useActiveId = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  // listen for hash change event with useEffect hook
  useEffect(() => {
    const handleHashChange = () => {
      const id = parseInt(window.location.hash.slice(1));
      setActiveId(id);
    };

    // run event handler once during mounting (hash change event is not called during loading of the page)
    handleHashChange();

    // listen for hash change event
    window.addEventListener("hashchange", handleHashChange);

    // cleanup function when component is unmounted
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
};

// ---------------------------------------------------------

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// ---------------------------------------------------------

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  // add an event listener to the document on mounting
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // check if user clicked outside of the bookmarks button (by comparing if current button ref contains event target)
      if (refs.every((ref) => !ref.current?.contains(event.target as Node))) {
        handler();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
}

// ---------------------------------------------------------

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error(
      "useBookmarksContext can only be used within a BookmarksContextProvider"
    );
  }

  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);

  if (!context) {
    throw new Error(
      "useActiveIdContext can only be used within a ActiveIdContextProvider"
    );
  }

  return context;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);

  if (!context) {
    throw new Error(
      "useSearchTextContext can only be used within a SearchTextContextProvider"
    );
  }

  return context;
}

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);

  if (!context) {
    throw new Error(
      "useJobItemsContext can only be used within a JobItemsContextProvider"
    );
  }

  return context;
}
