import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

type CountButtonProps = {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  type: "plus" | "minus";
  isLocked: boolean;
};

const CountButton = ({ setCount, type, isLocked }: CountButtonProps) => {
  return (
    <button
      disabled={isLocked}
      onClick={(event) => {
        setCount((count: number) => {
          let newCount = 0;
          if (type === "plus") {
            newCount = count + 1;
            if (newCount > 5) {
              newCount = 5;
            }
          } else {
            newCount = count - 1;
            if (newCount < 0) {
              newCount = 0;
            }
          }

          return newCount;
        });

        // remove focus state of current target
        event.currentTarget.blur();
      }}
      className="count-btn"
    >
      {type === "plus" && <PlusIcon className="count-btn-icon" />}
      {type === "minus" && <MinusIcon className="count-btn-icon" />}
    </button>
  );
};

export default CountButton;
