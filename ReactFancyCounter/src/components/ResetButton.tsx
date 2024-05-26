import { ResetIcon } from "@radix-ui/react-icons";

type ResetButtonProps = {
  setCount: (count: number) => void;
};

const ResetButton = ({ setCount }: ResetButtonProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setCount(0);
    event.currentTarget.blur();
  };

  return (
    <button onClick={handleClick} className="reset-btn">
      <ResetIcon className="reset-btn-icon" />
    </button>
  );
};

export default ResetButton;
