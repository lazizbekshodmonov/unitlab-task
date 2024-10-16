import { createStore } from 'vuex'
import jsonData from '@/assets/data.json'

const getFavorites = () => localStorage.getItem('favorites')

const store = createStore({
  state: {
    loadingState: new Set(),
    movies: [],
    movieDetails: null,
    favorites: getFavorites ? JSON.parse(getFavorites()) : []
  },
  mutations: {
    loading(state, key) {
      if (state.loadingState.has(key)) {
        state.loadingState.add(key)
      } else {
        state.loadingState.delete(key)
      }
    },
    getAllMovies(state, movies) {
      state.movies = movies
    },
    addMovie(state, movie) {
      const lastMovies = state.movies.reduce((max, item) => {
        return item.id > max.id ? item : max
      }, state.movies[0])
      state.movies.push({ id: lastMovies.id + 1, ...movie })
    },
    addToFavorites(state, id) {
      const favorites = getFavorites() ? JSON.parse(getFavorites()) : []
      if (favorites) {
        state.favorites = [...favorites, id]
      } else {
        state.favorites = [id]
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    removeFromFavorites(state, id) {
      const favorites = state.favorites
      const index = favorites.findIndex((item) => item === id)
      if (index !== -1) {
        state.favorites.splice(index, 1)
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    getOneMovie(state, id) {
      state.movieDetails = state.movies.find((item) => item.id === id)
    },
    updateMovie(state, payload) {
      const indexMovie = state.movies.findIndex(
        (item) => item.id === payload.id
      )
      if (indexMovie !== -1) {
        state.movies[indexMovie] = { id: payload.id, ...payload.movie }
      }
    },
    deleteMovie(state, id) {
      const index = state.movies.findIndex((item) => item.id === id)
      if (index !== -1) {
        state.movies.splice(index, 1)
      }
    }
  },
  actions: {
    getAllMovies({ commit }) {
      commit('getAllMovies', jsonData.movies)
    },
    addMovie({ commit, state }, movie) {
      commit('loading', 'AddNewMovie')
      commit('addMovie', movie)
      commit('loading', 'AddNewMovie')
    },
    addFavorites(context, id) {
      context.commit('addToFavorites', id)
    },
    removeFromFavorites(context, id) {
      context.commit('removeFromFavorites', id)
    },
    getOneMovieDetails({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        commit('loading', 'MovieDetails')
        commit('getOneMovie', id)
        if (state.movieDetails) {
          resolve(state.movieDetails)
        } else {
          reject()
        }
        commit('loading', 'MovieDetails')
      })
    },
    deleteMovie(context, id) {
      context.commit('deleteMovie', id)
      context.commit('removeFromFavorites', id)
    },
    updateMovie({ commit, state }, payload) {
      commit('updateMovie', payload)
    },
    searchMovies({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        const findMovies = state.movies.filter((item) => {
          const nameSearch = item.name
            ?.toLowerCase()
            .includes(payload.toLowerCase())
          const genreSearch = payload.genre
            ?.toLowerCase()
            .includes(payload.toLowerCase())

          if (payload !== '' && (nameSearch || genreSearch)) {
            return item
          }
        })
        resolve(findMovies)
      })
    }
  },
  getters: {
    isLoading: (state) => (key) => {
      return state.loadingState.has(key)
    },
    favoriteMovies: (state) => {
      return state.movies.filter((movie) => state.favorites.includes(movie.id))
    }
  }
})

export default store
