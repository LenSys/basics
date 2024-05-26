import { create } from "zustand";
import { initialItems } from "../lib/constants";
import { ItemType } from "../lib/types";
import { persist } from "zustand/middleware";

export const useItemsStore = create(
  persist(
    (set) => ({
      items: initialItems,
      removeAllItems: () => {
        set(() => ({ items: [] }));
      },
      resetToInitial: () => {
        set(() => ({ items: initialItems }));
      },
      markAllAsComplete: () => {
        set((state: { items: ItemType[] }) => {
          const newItems = state.items.map((item: ItemType) => {
            return { ...item, packed: true };
          });
          return { items: newItems };
        });
      },
      markAllAsIncomplete: () => {
        set((state: { items: ItemType[] }) => {
          const newItems = state.items.map((item) => {
            return { ...item, packed: false };
          });
          return { items: newItems };
        });
      },
      addItem: (newItemText: string) => {
        set((state: { items: ItemType[] }) => {
          const newItem = {
            id: new Date().getTime(),
            name: newItemText,
            packed: false,
          };

          const newItems = [...state.items, newItem];

          return { items: newItems };
        });
      },
      deleteItem: (itemId: number) => {
        set((state: { items: ItemType[] }) => {
          const newItems = state.items.filter((item) => item.id !== itemId);
          return { items: newItems };
        });
      },
      toggleItem: (itemId: number) => {
        set((state: { items: ItemType[] }) => {
          const newItems = state.items.map((item) => {
            if (item.id === itemId) {
              return { ...item, packed: !item.packed };
            } else {
              return item;
            }
          });
          return { items: newItems };
        });
      },
    }),
    {
      name: "items",
    }
  )
);
