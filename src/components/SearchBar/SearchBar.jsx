import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { TbDatabaseSearch } from 'react-icons/tb';

function SearchBar({ onSearch }) {
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const searchQuery = form.elements.searchQuery.value.trim();

    if (searchQuery === '') {
      toast('Please fill out this field.', {
        style: {
          border: '2px solid #646cff',
          width: '300px',
        },
      });
    }
    onSearch(searchQuery);
    form.reset();
  };
  return (
    <div className={css.search}>
      <Toaster position="top-left" />
      <form className={css.formSearch} onSubmit={handleSubmit}>
        <input
          className={css.inpt}
          type="text"
          autoComplete="off"
          autoFocus
          name="searchQuery"
          placeholder="Search movies"
        />
        <button className={css.btn} type="submit">
          <TbDatabaseSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
