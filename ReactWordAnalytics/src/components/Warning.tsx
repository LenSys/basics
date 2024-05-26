type WarningProps = {
  message: string;
};

const Warning = ({ message }: WarningProps) => {
  return <p className="warning">{message}</p>;
};

export default Warning;
