import axios from 'axios';
// axios.defaults.baseURL = 'https://pixabay.com/api/';
export async function serviceSearch(searchInfo, currentPage, perPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '39210626-76714a19412a01689ebadc3ae',
    q: searchInfo,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: perPage,
  });

  const responce = await axios.get(`${BASE_URL}?${params}`);
  return await responce.data;
}
