import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

new Vue({
  el: '#app',
  data: {
    // filter arrays always contain whichever filters have been checked
    // selected genre(s) and time(s): refactor as es6 set?
    genre: [],
    time: []
  },
  methods: {
    checkFilter(category, title, checked) {
      if (checked) {
        this[category].push(title);
      } else {
        // this return -1 if title is not in the array
        let index = this[category].indexOf(title);
        if (index > -1) {
          // remove 1 element from array
          this[category].splice(index, 1);
        }
      }
    }
  },
  // local component registration
  components: {
    'movie-list': {
      template: `
        <div id="movie-list">
          <div v-for="movie in filteredMovies" class="movie"> {{ movie.title }} </div>
        </div>
      `,
      // ES6 syntax for data: function()
      data() {
        return {
          // return a fresh data object for each component instance
          // see: https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
          movies: [
            { title: 'Up!', genre: genres.ANIMATION },
            { title: 'The Incredibles', genre: genres.ANIMATION },
            { title: 'Star Wars', genre: genres.FANTASY },
            { title: '13 Days', genre: genres.DRAMA }
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
    },
    'movie-filter': {
      data() {
        return {
          // es6 for genres: genres
          genres
        }
      },
      template: `
        <div id="movie-filter">
          <h2>Filter results</h2>
          <div class="filter-group">
            <check-filter v-for="genre in genres" :title="genre" v-on:check-filter="checkFilter"></check-filter>
          </div>
        </div>
      `,
      methods: {
        checkFilter(category, title, checked) {
          this.$emit('check-filter', category, title, checked);
        }
      },
      // component local to movie-filter
      components: {
        'check-filter': {
          data() {
            return {
              checked: false
            }
          },
          props: [ 'title' ],
          template: `
            <div :class="{ 'check-filter': true, 'active': checked }" v-on:click="checkFilter">
              <span class="checkbox"></span>
              <span class="check-filter-title">{{ title }}</span>
            </div>
          `,
          methods: {
            checkFilter() {
              this.checked = !this.checked;
              this.$emit('check-filter', 'genre', this.title, this.checked);
            }
          }
        }
      }
    }
  }
});
