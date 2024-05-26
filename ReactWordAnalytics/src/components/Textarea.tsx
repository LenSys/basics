import { useState } from "react";
import Warning from "./Warning";

type TextareaProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const Textarea = ({ text, setText }: TextareaProps) => {
  const [warningMessage, setWarningMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newText = event.target.value;
    if (newText.includes("<script>")) {
      // prevent <script> tag
      newText = newText.replace("<script>", "");
      setWarningMessage("No script tag allowed");
    } else if (newText.includes("@")) {
      // prevent @ symbol
      newText = newText.replace("@", "");
      setWarningMessage("No @ symbol allowed");
    } else {
      setWarningMessage("");
    }

    setText(newText);
  };

  return (
    <div className="textarea">
      <textarea
        placeholder="Enter your text"
        spellCheck={false}
        value={text}
        onChange={handleChange}
      ></textarea>
      {warningMessage && <Warning message={warningMessage} />}
    </div>
  );
};

export default Textarea;
