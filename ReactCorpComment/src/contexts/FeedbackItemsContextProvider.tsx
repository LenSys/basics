import { createContext, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../lib/hooks";

type TFeedbackItemsContext = {
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (company: string) => void;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const { feedbackItems, isLoading, errorMessage, setFeedbackItems } =
    useFeedbackItems();

  const [selectedCompany, setSelectedCompany] = useState("");

  // useMemo for performance optimization
  const filteredFeedbackItems = useMemo(
    () =>
      feedbackItems.filter((feedbackItem) =>
        feedbackItem.company.includes(selectedCompany)
      ),
    [feedbackItems, selectedCompany]
  );

  // create hashtag list of companies
  const companyList = useMemo(
    () =>
      feedbackItems
        .map((feedbackItem) => feedbackItem.company)
        .filter((company, index, array) => {
          // check if first element in array is the current index
          // -> first occourrence of company
          // -> return true (add to list)
          return array.indexOf(company) === index;
        })
        .sort(),
    [feedbackItems]
  );

  // function is async because of fetch() API POST request
  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName as string,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedbackItems([...feedbackItems, newItem]);

    // send post request to backend
    try {
      await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        {
          method: "POST",
          body: JSON.stringify(newItem),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  return (
    <FeedbackItemsContext.Provider
      value={{
        filteredFeedbackItems,
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        handleSelectCompany,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
