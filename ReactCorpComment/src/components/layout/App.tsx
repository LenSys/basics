import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "../hashtag/HashtagList";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";
import { useEffect } from "react";
// import { useFeedbackItemsContext } from "../../lib/hooks";

function App() {
  // const { companyList, handleSelectCompany } = useFeedbackItemsContext();

  const getCompanyList = useFeedbackItemsStore((state) =>
    state.getCompanyList()
  );
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);

  const fetchFeedbackItems = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems
  );

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <div className="app">
      <Footer />

      <Container />
      <HashtagList hashtags={getCompanyList} onSelectHashtag={selectCompany} />
    </div>
  );
}

export default App;
