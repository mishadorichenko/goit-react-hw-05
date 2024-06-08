import css from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1>404 - Page Not Found</h1>
      <p className={css.text}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link className={css.linkToHome} to="/">
        Go to Home Page
      </Link>
    </div>
  );
}

export default NotFoundPage;
