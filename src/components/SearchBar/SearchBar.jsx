import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.query.value.trim();
    if (!searchQuery) {
      const notify = () =>
        toast("Please enter the search query!", {
          duration: 4000,
          position: "top-center",
          style: {},
          className: "",
          icon: "👏",
        });
      notify();
      return;
    }
    onSubmit(searchQuery);
    form.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
        <Toaster />
      </form>
    </header>
  );
};

export default SearchBar;
