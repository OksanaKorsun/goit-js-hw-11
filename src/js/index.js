import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './markup';
import { serviceSearch } from './api-search';

const elements = {
  form: document.querySelector('.js-search-form'),
  container: document.querySelector('.js-gallery'),
  btnLoad: document.querySelector('.js-load-more'),
  input: document.querySelector('.js-form-input'),
};
const lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
const perPage = 40;

elements.form.addEventListener('submit', handlerSubmit);
elements.btnLoad.addEventListener('click', handlerLoadMore);

async function handlerSubmit(event) {
  event.preventDefault();
  elements.container.innerHTML = '';
  currentPage = 1;
  elements.btnLoad.classList.replace('load-more', 'load-more-hidden');
  const searchInfo = elements.input.value.trim();
  console.log(elements.input.value.trim());
  if (searchInfo === '') {
    Notiflix.Notify.failure('Please enter a query in the search field.');
    return;
  }
  try {
    const data = await serviceSearch(searchInfo, currentPage, perPage);
    if (data.hits.length) {
      elements.container.insertAdjacentHTML(
        'beforeend',
        createMarkup(data.hits)
      );
      lightbox.refresh();
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      elements.btnLoad.classList.replace('load-more', 'load-more-hidden');
      elements.container.innerHTML = '';
    }
    const totalPages = Math.ceil(data.totalHits / perPage);
    if (currentPage < totalPages) {
      elements.btnLoad.classList.replace('load-more-hidden', 'load-more');
    }
  } catch (err) {
    console.log(err);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    elements.btnLoad.classList.replace('load-more', 'load-more-hidden');
    elements.container.innerHTML = '';
  }
}

elements.input.addEventListener('input', () => {
  if (elements.input.value === '') {
    elements.btnLoad.classList.replace('load-more', 'load-more-hidden');
    elements.container.innerHTML = '';
  }
});

async function handlerLoadMore() {
  currentPage += 1;
  const searchInfo = elements.input.value.trim();
  try {
    const data = await serviceSearch(searchInfo, currentPage, perPage);

    elements.container.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    lightbox.refresh();
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    const totalPages = Math.ceil(data.totalHits / perPage);
    console.log(totalPages);
    if (currentPage >= totalPages) {
      elements.btnLoad.classList.replace('load-more', 'load-more-hidden');
    }
  } catch (err) {
    console.log(err);
    elements.btnLoad.classList.replace('load-more', 'load-more-hidden');
  }
}
