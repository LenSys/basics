type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonType?: "primary" | "secondary";
  children: string;
};

const Button = ({ onClick, buttonType = "primary", children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${buttonType === "secondary" ? "btn--secondary" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
