import Counter from "./Counter";
import Logo from "./Logo";
import { ItemType } from "../lib/types";
import { useItemsStore } from "../store/itemsStore";

const Header = () => {
  const items = useItemsStore((state) => state.items);

  return (
    <header>
      <Logo />
      <Counter
        packedNumberOfItems={
          items.filter((item: ItemType) => item.packed).length
        }
        totalNumberOfItems={items.length}
      />
    </header>
  );
};

export default Header;
