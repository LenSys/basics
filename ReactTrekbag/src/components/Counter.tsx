type CounterProps = {
  packedNumberOfItems: number;
  totalNumberOfItems: number;
};

const Counter = ({ packedNumberOfItems, totalNumberOfItems }: CounterProps) => {
  return (
    <p>
      <b>{packedNumberOfItems}</b> / {totalNumberOfItems} items packed
    </p>
  );
};

export default Counter;
