import axios from "axios";

const API_KEY = "bwg2SWQOwx2j7-hVwUk1fshz5wKZXrVBZxPo15y2ZAg";

axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};

export const getImages = async (searchQuery, page) => {
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${searchQuery}&page=${page}`
  );
  return data;
};
