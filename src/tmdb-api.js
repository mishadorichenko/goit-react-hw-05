import axios from 'axios';

const API_KEY =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNmFkYTU1NjM4MjdmZWM2MjAwMmQ4OTI1NDQzOGZmMyIsInN1YiI6IjY2NTVkMGJkYTZlYzZhZGZhYTIxMjhlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NWtgo92iwR8pS3bVu3yU_GFfol0im3Z65XKflX_g2ZQ';
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: API_KEY,
  },
});

// Trending movies
export const getTrendingMovies = async () => {
  const response = await axiosInstance.get('/trending/movie/day', {
    params: { language: 'en-US' },
  });
  return response.data;
};

// Search movie
export const searchMovie = async query => {
  const response = await axiosInstance.get('/search/movie', {
    params: {
      include_adult: 'false',
      language: 'en-US',
      page: '1',
      query,
    },
  });
  return response.data;
};

// Movie details
export const getMovieDetails = async movieId => {
  const response = await axiosInstance.get(`/movie/${movieId}`, {
    params: { language: 'en-US' },
  });
  return response.data;
};

// Movie cast
export const getMovieCast = async movieId => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`, {
    params: { language: 'en-US' },
  });
  return response.data;
};

// Movie reviews
export const getMovieReviews = async (movieId, page = 1) => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`, {
    params: {
      language: 'en-US',
      page,
    },
  });
  return response.data;
};
