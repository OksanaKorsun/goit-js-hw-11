export function createMarkup(data) {
  return data
    .map(
      ({
        tags,
        webformatURL,
        largeImageURL,
        views,
        downloads,
        likes,
        comments,
      }) => `<a class="info-link" href="${largeImageURL}">
        <div class="photo-card">
          <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" width="335" height="200" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>${likes}
            </p>
            <p class="info-item">
              <b>Views</b>${views}
            </p>
            <p class="info-item">
              <b>Comments</b>${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>${downloads}
            </p>
          </div>
        </div>
      </a>`
    )
    .join('');
}