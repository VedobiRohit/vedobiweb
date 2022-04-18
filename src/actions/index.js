import axios from 'axios';
import { baseUrl, token } from "../utils/global";

import {
    FETCH_PRODUCTS
  } from "./types";

import config from "../../config";

export const FETCH_ARTICLES = 'fetch_articles';

export const fetchArticles = (movieId) => async dispatch => {
    let url;
    if (!movieId) {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${config.apikey}&language=en-US&page=1`;
    } else {
        url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${config.apikey}&language=en-US`;
    }

    const res = await axios.get(url);

    dispatch({
        type: FETCH_ARTICLES,
        payload: res.data
    });
};

const URL = baseUrl + "api/productAllList";
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL, { token: token })
      dispatch({ type: FETCH_PRODUCTS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};