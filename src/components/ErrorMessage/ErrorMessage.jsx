import css from './ErrorMessage.module.css';

function ErrorMessage() {
  return (
    <div className={css.errorContainer}>
      <p>Something went wrong(((</p>
      <p>Check your internet connection and refresh the page</p>
    </div>
  );
}

export default ErrorMessage;
