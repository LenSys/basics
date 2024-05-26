// import { useItemsContext } from "../lib/hooks";
import { useItemsStore } from "../store/itemsStore";
import AddItemForm from "./AddItemForm";
import ButtonGroup from "./ButtonGroup";

const Sidebar = () => {
  // const { handleAddItem } = useItemsContext();

  const handleAddItem = useItemsStore((state) => state.addItem);

  console.log("Sidebar renders");
  return (
    <div className="sidebar">
      <AddItemForm onAddItem={handleAddItem} />
      <ButtonGroup />
    </div>
  );
};

export default Sidebar;
