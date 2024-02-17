'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import { galleryList } from './js/render-functions';

const form = document.querySelector('.form');
const loaderContainer = document.querySelector('.loader-container');
const loadMoreBtn = document.querySelector('.load-more-btn');
const gallery = document.querySelector('.gallery');
let page;
let maxPage;
let searchQuery;

const iziToastOptions = {
  backgroundColor: 'red',
  messageColor: 'white',
  messageSize: '14',
  position: 'topRight',
  timeout: 3000,
};

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault();
  galleryList.innerHTML = '';
  showLoader();
  searchQuery = e.target.elements.input.value.trim();
  page = 1;

  try {
    const data = await searchImages(searchQuery, page);
    maxPage = Math.ceil(data.totalHits / 15);
    if (data.totalHits === 0) {
      iziToast.show({
        ...iziToastOptions,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else if (searchQuery === '') {
      iziToast.show({
        ...iziToastOptions,
        message: 'Fill out the search form!',
      });
      hideLoader();
      return;
    } else {
      renderImages(data);
    }
  } catch (err) {
    iziToast.error({
      ...iziToastOptions,
      title: 'Error',
      message: err,
    });
  }

  hideLoader();
  checkBtnVisibleStatus();
  e.target.reset();
}

async function onLoadMoreClick() {
  page += 1;
  showLoader();

  try {
    const data = await searchImages(searchQuery, page);
    renderImages(data);
  } catch (err) {
    iziToast.error({
      ...iziToastOptions,
      title: 'Error',
      message: err,
    });
  }

  hideLoader();
  checkBtnVisibleStatus();

  const height = gallery.firstElementChild.getBoundingClientRect().height;

  scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}

//===============================================

function showLoader() {
  loaderContainer.classList.remove('is-hidden');
}

function hideLoader() {
  loaderContainer.classList.add('is-hidden');
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}

function checkBtnVisibleStatus() {
  if (page >= maxPage) {
    hideLoadMoreBtn();
    iziToast.show({
      ...iziToastOptions,
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    showLoadMoreBtn();
  }
}
