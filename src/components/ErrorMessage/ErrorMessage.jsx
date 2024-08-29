import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ error }) => {
  return (
    <>
      <p className={css.errorMessage}>{error}! Please, try again later!</p>
    </>
  );
};

export default ErrorMessage;
