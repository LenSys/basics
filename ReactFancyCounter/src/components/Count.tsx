type CountProps = {
  count: number;
};

const Count = ({ count }: CountProps) => {
  return <p className="count">{count}</p>;
};

export default Count;
