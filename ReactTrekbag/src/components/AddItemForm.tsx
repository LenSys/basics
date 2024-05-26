import { useRef, useState } from "react";
import Button from "./Button";

type AddItemFormProps = {
  onAddItem: (newItemText: string) => void;
};

const AddItemForm = ({ onAddItem }: AddItemFormProps) => {
  const [itemText, setItemText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    // basic validation
    if (itemText.length === 0) {
      alert("Item can't be empty");

      // focus input ref
      if (inputRef && inputRef.current) {
        inputRef.current?.focus();
      }
      return;
    }

    onAddItem(itemText);
    setItemText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        value={itemText}
        onChange={(event) => setItemText(event.target.value)}
        autoFocus={true}
      />
      <Button>Add to list</Button>
    </form>
  );
};

export default AddItemForm;
