type ErrorMessageProps = {
  errorMessage: string;
};

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  return <div className="error-message">{errorMessage}</div>;
}
