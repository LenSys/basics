import { useItemsStore } from "../store/itemsStore";
import Button from "./Button";
// import { useItemsContext } from "../lib/hooks";

const ButtonGroup = () => {
  /*
  const {
    handleMarkAllAsComplete,
    handleMarkAllAsIncomplete,
    handleResetToInitial,
    handleRemoveAllItems,
  } = useItemsContext();
  */

  const handleMarkAllAsComplete = useItemsStore(
    (state) => state.markAllAsComplete
  );
  const handleMarkAllAsIncomplete = useItemsStore(
    (state) => state.markAllAsIncomplete
  );
  const handleResetToInitial = useItemsStore((state) => state.resetToInitial);
  const handleRemoveAllItems = useItemsStore((state) => state.removeAllItems);

  return (
    <section className="button-group">
      <Button onClick={handleMarkAllAsComplete} buttonType="secondary">
        Mark all as complete
      </Button>
      <Button onClick={handleMarkAllAsIncomplete} buttonType="secondary">
        Mark all as incomplete
      </Button>
      <Button onClick={handleResetToInitial} buttonType="secondary">
        Reset to initial
      </Button>
      <Button buttonType="secondary" onClick={handleRemoveAllItems}>
        Remove all items
      </Button>
    </section>
  );
};

export default ButtonGroup;
