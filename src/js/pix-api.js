import axios from 'axios';

export function serviceSearch(searchInfo) {
const BASE_URL = 'https://pixabay.com/api/';
const params = new URLSearchParams({
  key: '39210626-76714a19412a01689ebadc3ae',
  q: searchInfo,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});
  axios.get(`${BASE_URL}?${params}`).then(resp => {
    console.log(resp);
  });
}
