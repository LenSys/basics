import { useMemo, useState } from "react";
import { ItemType } from "../lib/types";
import EmptyView from "./EmptyView";
import Select from "react-select";
import { useItemsStore } from "../store/itemsStore";
// import { useItemsContext } from "../lib/hooks";

const sortingOptions = [
  {
    label: "Sort by default",
    value: "default",
  },
  {
    label: "Sort by packed",
    value: "packed",
  },
  {
    label: "Sort by unpacked",
    value: "unpacked",
  },
];

const ItemList = () => {
  const [sortBy, setSortBy] = useState<string | undefined>("default");

  // const { items, handleDeleteItem, handleToggleItem } = useItemsContext();

  const items = useItemsStore((state) => state.items);
  const handleDeleteItem = useItemsStore((state) => state.deleteItem);
  const handleToggleItem = useItemsStore((state) => state.toggleItem);

  // create a new array which will be sorted
  // -> run this calculation only when items or sortBy is changed, not during each rendering of this component
  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === "packed") {
          // b is packed -> b is sorted higher than a
          return (b.packed ? 1 : 0) - (a.packed ? 1 : 0);
        } else if (sortBy === "unpacked") {
          // b is packed -> b is sorted lower than a
          return (a.packed ? 1 : 0) - (b.packed ? 1 : 0);
        } else {
          // do nothing
          return a.id - b.id;
        }
      }),
    [items, sortBy]
  );

  return (
    <ul className="item-list">
      {sortedItems.length === 0 && <EmptyView />}
      {sortedItems.length > 0 && (
        <section className="sorting">
          <Select
            defaultValue={sortingOptions[0]}
            options={sortingOptions}
            onChange={(option) => setSortBy(option?.value)}
          />
        </section>
      )}
      {sortedItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          onDeleteItem={handleDeleteItem}
          onToggleItem={handleToggleItem}
        />
      ))}
    </ul>
  );
};

type ItemProps = {
  item: ItemType;
  onDeleteItem: (itemId: number) => void;
  onToggleItem: (itemId: number) => void;
};

const Item = ({ item, onDeleteItem, onToggleItem }: ItemProps) => {
  return (
    <li className="item">
      <label htmlFor={item.id as unknown as string}>
        <input
          type="checkbox"
          checked={item.packed}
          id={item.id as unknown as string}
          onChange={() => onToggleItem(item.id)}
        />
        {item.name}
      </label>
      <button
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
};

export default ItemList;
