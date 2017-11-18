<!-- This component's job: handle filtering -->

<template lang="html">
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item v-for="movie in filteredMovies" :movie="movie.movie"></movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results">
      No results.
    </div>
    <div v-else class="no-results">
      Loading...
    </div>
  </div>
</template>

<script>
  import MovieItem from './MovieItem.vue';

  export default {
    props: [ 'genre', 'time', 'movies' ],
    methods: {
      // callback function for filteredMovies()
      movieFilter(movie) {
        // find: new ES6 array method, similar to filter, but only returns one element
        // "genre" refers to the prop (array)
        if (!this.genre.length) { // if genre array empty, let this movie pass
          return true;
        } else {
          let movieGenres = movie.movie.Genre.split(", ");
          let matched = true;
          // for each selected genre, iterate
          this.genre.forEach(genre => {
            if (movieGenres.indexOf(genre) === -1) { // no match
              matched = false;
            }
          });
          return matched;
        }
      }
    },
    computed: {
      filteredMovies() {
        return this.movies.filter(this.movieFilter);
      }
    },
    components: {
      MovieItem
    }
  }
</script>
