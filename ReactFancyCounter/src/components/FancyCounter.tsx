import { useEffect, useState } from "react";
import Count from "./Count";
import ButtonContainer from "./ButtonContainer";
import ResetButton from "./ResetButton";
import CountButton from "./CountButton";
import Title from "./Title";

const FancyCounter = () => {
  const [count, setCount] = useState(0);
  const isLocked = count === 5 ? true : false;

  // useEffect for keyboard events
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        let newCount = count + 1;
        if (newCount > 5) {
          newCount = 5;
        }

        setCount(newCount);
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [count]);

  return (
    <div className={`fancycounter ${isLocked ? "fancycounter--limit" : ""}`}>
      <Title title={isLocked ? "Limit! Buy Pro for >5" : "Fancy Counter"} />
      <Count count={count} />
      <ResetButton setCount={setCount} />
      <ButtonContainer>
        <CountButton setCount={setCount} type="minus" isLocked={isLocked} />
        <CountButton setCount={setCount} type="plus" isLocked={isLocked} />
      </ButtonContainer>
    </div>
  );
};

export default FancyCounter;
