import Notiflix from 'notiflix';
import { serviceSearch } from './pix-api';
// import "simplelightbox/dist/simple-lightbox.min.css";

const elements = {
  form: document.querySelector('.search-form'),
  container: document.querySelector('.gallery'),
  btnLoad: document.querySelector('.load-more'),
};
elements.form.addEventListener('submit', handlerSubmit);
function handlerSubmit(event) {
  event.preventDefault();
  const searchInfo = event.target.value;
  serviceSearch(searchInfo)
    .then(data => {
      elements.container.insertAdjacentHTML('beforeend', createMarkup(data));
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
    })
    .catch(err => {
      console.log(err);
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

function createMarkup(data) {
  return data.hits
    .map(
      ({
        tags,
        webformatURL,
        largeImageURL,
        views,
        downloads,
        likes,
        comments,
      }) => `<a href="${largeImageURL}">
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b> ${likes}
            </p>
            <p class="info-item">
              <b>Views</b> ${views}
            </p>
            <p class="info-item">
              <b>Comments</b> ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b> ${downloads}
            </p>
          </div>
        </div>
      </a>`
    )
    .join('');
}
