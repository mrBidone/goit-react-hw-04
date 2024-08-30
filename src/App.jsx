import { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";
import { getImages } from "./services/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, imgUrl: "", imgAlt: "" });

  const handleSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const { results, total_pages } = await getImages(searchQuery, page);
        if (results.length === 0 && page === 1) {
          setNoResults(true);
        } else {
          setImages((prevImages) =>
            page === 1 ? results : [...prevImages, ...results]
          );
          setPagination(page < total_pages);
          setNoResults(false);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (url, alt) => {
    setModal({ ...modal, isOpen: true, imgUrl: url, imgAlt: alt || "Image" });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false, imgUrl: "", imgAlt: "Image" });
  };

  return (
    <>
      <div className="search-container">
        <SearchBar onSubmit={handleSubmit} />
        {noResults && (
          <p style={{ color: "red" }}>
            No results found for "{searchQuery}". Please try again.
          </p>
        )}
        {error !== null && <ErrorMessage error={error} />}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {pagination && <LoadMoreBtn onClick={handleLoadMore} />}
        {isLoading === true && <Loader />}
        <ImageModal
          isOpen={modal.isOpen}
          imgUrl={modal.imgUrl}
          imgAlt={modal.imgAlt}
          closeModal={closeModal}
        />
      </div>
    </>
  );
};

export default App;
