type ButtonContainerProps = {
  children: React.ReactNode;
};

const ButtonContainer = ({ children }: ButtonContainerProps) => {
  return <div className="button-container">{children}</div>;
};

export default ButtonContainer;
