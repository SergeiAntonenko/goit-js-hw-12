'use strict';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryList = document.querySelector('.gallery');

export function renderImages(data) {
  const markup = data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
      <img
        class="gallery-image"
        src="${webformatURL}"
        alt="${tags}"
      />
      <div class="descriptions-container">
       <div class="img-description">
      <p class="img-description-title">Likes</p>
      <p class="img-description-content">${likes}</p>
    </div>
    <div class="img-description">
      <p class="img-description-title">Views</p>
      <p class="img-description-content">${views}</p>
    </div>
    <div class="img-description">
      <p class="img-description-title">Comments</p>
      <p class="img-description-content">${comments}</p>
    </div>
    <div class="img-description">
      <p class="img-description-title">Downloads</p>
      <p class="img-description-content">${downloads}</p>
    </div>
    </div>
    </a>
  </li>`;
      }
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);

  const gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionsData: 'alt',
  });
  gallery.refresh();
}
