<template lang="html">
  <div id="movie-list">
    <div v-for="movie in filteredMovies" class="movie"> {{ movie.title }} </div>
  </div>
</template>

<script>
  import genres from '../util/genres';

  export default {
    // ES6 syntax for data: function()
    data() {
      return {
        // return a fresh data object for each component instance
        // see: https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
        movies: [
          { title: 'Up!', genre: genres.ANIMATION },
          { title: 'The Incredibles', genre: genres.ANIMATION },
          { title: 'Star Wars', genre: genres.FANTASY },
          { title: '13 Days', genre: genres.DRAMA },
          { title: 'Lord Of The Rings', genre: genres.FANTASY }
        ]
      };
    },
    props: [ 'genre', 'time' ],
    methods: {
      // callback function for filteredMovies()
      movieFilter(movie) {
        // find: new ES6 array method, similar to filter, but only returns one element
        // "genre" refers to the prop (array)
        if (!this.genre.length) { // if genre array empty, let this movie pass
          return true;
        } else {
          return this.genre.find(genre => movie.genre === genre);
        }
      }
    },
    computed: {
      filteredMovies() {
        return this.movies.filter(this.movieFilter);
      }
    }
  }
</script>
