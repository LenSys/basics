// import { useFeedbackItemsContext } from "../../lib/hooks";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";
import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

export default function Header() {
  // const { handleAddToList } = useFeedbackItemsContext();
  const addItemsToList = useFeedbackItemsStore((state) => state.addItemsToList);

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onFeedbackFormSubmit={addItemsToList} />
    </header>
  );
}
