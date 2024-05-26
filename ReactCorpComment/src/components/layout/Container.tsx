import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

export default function Container() {
  return (
    <main className="main">
      <Header />
      <FeedbackList />
    </main>
  );
}
