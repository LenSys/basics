import { useState } from "react";
import { MAX_FEEDBACK_CHARACTERS } from "../../lib/constants";
import { TIndicator } from "../../lib/types";

type FeedbackFormProps = {
  onFeedbackFormSubmit: (text: string) => void;
};

export default function FeedbackForm({
  onFeedbackFormSubmit,
}: FeedbackFormProps) {
  const [feedbackText, setFeedbackText] = useState("");
  const [indicator, setIndicator] = useState<TIndicator>("");

  const remainingFeedbackCharacters =
    MAX_FEEDBACK_CHARACTERS - feedbackText.length;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length > MAX_FEEDBACK_CHARACTERS) {
      return;
    }
    setFeedbackText(newText);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // basic validation
    if (feedbackText.includes("#") && feedbackText.length >= 5) {
      // feedback text is valid, submit form
      onFeedbackFormSubmit(feedbackText);
      setFeedbackText("");

      // set indicator (feedback for user)
      setIndicator("valid");
    } else {
      // stop submitting

      // set indicator (feedback for user)
      setIndicator("invalid");
    }

    // reset indicator (feedback for user)
    setTimeout(() => {
      setIndicator("");
    }, 2000);
  };

  return (
    <form
      className={`form ${
        indicator === "valid"
          ? "form--valid"
          : indicator === "invalid"
          ? "form--invalid"
          : ""
      }`}
      onSubmit={handleSubmit}
    >
      <textarea
        id="feedback-textarea"
        placeholder="Enter feedback"
        spellCheck={false}
        value={feedbackText}
        onChange={handleChange}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to hashtag the company
      </label>
      <div>
        <p className="u-italic">{remainingFeedbackCharacters}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
