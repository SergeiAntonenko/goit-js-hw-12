'use strict';
import axios from 'axios';

export async function searchImages(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api';
  const API_KEY = '/?key=42307654-d98cffd477e66adb5fa77b8c6';
  const PARAMS = `&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;

  const url = BASE_URL + END_POINT + API_KEY + PARAMS;

  const res = await axios.get(url);
  return res.data;
}
