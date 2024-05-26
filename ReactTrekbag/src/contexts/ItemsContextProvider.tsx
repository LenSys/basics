import { createContext, useEffect, useState } from "react";
import { initialItems } from "../lib/constants";
import { ItemType } from "../lib/types";

type ItemsContextProviderProps = {
  children: React.ReactNode;
};

type ItemsContextType = {
  items: ItemType[];
  handleAddItem: (newItemText: string) => void;
  handleDeleteItem: (itemId: number) => void;
  handleToggleItem: (itemId: number) => void;
  handleRemoveAllItems: () => void;
  handleResetToInitial: () => void;
  handleMarkAllAsComplete: () => void;
  handleMarkAllAsIncomplete: () => void;
};

export const ItemsContext = createContext<ItemsContextType | null>(null);

export default function ItemsContextProvider({
  children,
}: ItemsContextProviderProps) {
  // run the function for useState only once!
  const [items, setItems] = useState(() => {
    // get local storage data
    const localStorageItemsData = localStorage.getItem("items");

    let localStorageItems = initialItems;
    if (localStorageItemsData !== null) {
      localStorageItems = JSON.parse(localStorageItemsData);
    }
    return localStorageItems;
  });

  const handleAddItem = (newItemText: string) => {
    const newItem = {
      id: new Date().getTime(),
      name: newItemText,
      packed: false,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
  };

  const handleToggleItem = (itemId: number) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, packed: !item.packed };
      } else {
        return item;
      }
    });
    setItems(newItems);
  };

  const handleRemoveAllItems = () => {
    setItems([]);
  };

  const handleResetToInitial = () => {
    setItems(initialItems);
  };

  const handleMarkAllAsComplete = () => {
    const newItems = items.map((item) => {
      return { ...item, packed: true };
    });
    setItems(newItems);
  };

  const handleMarkAllAsIncomplete = () => {
    const newItems = items.map((item) => {
      return { ...item, packed: false };
    });
    setItems(newItems);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        handleAddItem,
        handleDeleteItem,
        handleToggleItem,
        handleRemoveAllItems,
        handleResetToInitial,
        handleMarkAllAsComplete,
        handleMarkAllAsIncomplete,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
