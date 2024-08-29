import { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";
import { getImages } from "./services/api";

const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);

  const handleSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchImages = async () => {
      try {
        const { results, total, total_pages } = await getImages(searchQuery);
      } catch (err) {
        console.log("error: ", err);
      } finally {
        console.log();
      }
    };

    fetchImages();
  }, [searchQuery]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Loader />
    </>
  );
};

export default App;
