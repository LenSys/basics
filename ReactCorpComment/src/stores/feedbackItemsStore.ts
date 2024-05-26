import { TFeedbackItem } from "../lib/types";
import { create } from "zustand";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemsToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",
  getCompanyList: () => {
    return get()
      .feedbackItems.map((feedbackItem) => feedbackItem.company)
      .filter((company, index, array) => {
        // check if first element in array is the current index
        // -> first occourrence of company
        // -> return true (add to list)
        return array.indexOf(company) === index;
      })
      .sort();
  },
  getFilteredFeedbackItems: () => {
    return get().feedbackItems.filter((feedbackItem) =>
      feedbackItem.company.includes(get().selectedCompany)
    );
  },

  addItemsToList: async (text: string) => {
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

    // setFeedbackItems([...feedbackItems, newItem]);
    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

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
  },

  selectCompany: (company: string) => {
    set(() => ({
      selectedCompany: company,
    }));
  },

  fetchFeedbackItems: async () => {
    // setIsLoading(true);
    set(() => ({
      isLoading: true,
    }));

    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      // setErrorMessage("");
      set(() => ({
        errorMessage: "",
      }));

      // setFeedbackItems(data.feedbacks);
      set(() => ({
        feedbackItems: data.feedbacks,
      }));
    } catch (error) {
      // setErrorMessage("Something went wrong. Please try again later.");
      set(() => ({
        errorMessage: "Something went wrong. Please try again later.",
      }));
    }

    // setIsLoading(false);
    set(() => ({
      isLoading: false,
    }));
  },
}));
