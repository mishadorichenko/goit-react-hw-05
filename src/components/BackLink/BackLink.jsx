import css from './BackLink.module.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

function BackLink({ to, children }) {
  return (
    <>
      <Link to={to} className={css.backLinkWrapper}>
        <IoMdArrowRoundBack />
        {children}
      </Link>
    </>
  );
}
export default BackLink;
