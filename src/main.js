import Vue from 'vue';
import axios from 'axios';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

// drop-in replacement for vue-resource
Vue.prototype.$http = axios;

let vm = new Vue({
  el: '#app',
  data: {
    // filter arrays always contain whichever filters have been checked
    // selected genre(s) and time(s): refactor as es6 set?
    genre: [],
    time: [],
    movies: []
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
    MovieList,
    MovieFilter
  },
  created() {
    this.$http.get('/api').then(response => {
      this.movies = response.data;
    });
  }
});
