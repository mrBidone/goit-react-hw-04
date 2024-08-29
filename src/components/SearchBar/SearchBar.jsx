import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.query.value.trim();
    if (!searchQuery) {
      const notify = () =>
        toast("Please enter the search query!", {
          duration: 2000,
          position: "top-center",
          style: {
            marginTop: "80px",
          },
          className: "",
          icon: "⛔️",
        });
      notify();
      return;
    }
    onSubmit(searchQuery);
    form.reset();
  };

  return (
    <header className={css.pageHeader}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.submitBtn} type="submit">
          Search
        </button>
        <Toaster />
      </form>
    </header>
  );
};

export default SearchBar;
