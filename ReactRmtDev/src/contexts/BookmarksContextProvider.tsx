import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { TJobItemDetails } from "../lib/types";

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

type TBookmarksContext = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: TJobItemDetails[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<TBookmarksContext | null>(null);

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const [isLoading, bookmarkedJobItems] = useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      const newBookmarkIds = bookmarkedIds.filter(
        (bookmarkItemId) => bookmarkItemId !== id
      );
      setBookmarkedIds(newBookmarkIds);
    } else {
      const newBookmarkIds = [...bookmarkedIds, id];
      setBookmarkedIds(newBookmarkIds);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
