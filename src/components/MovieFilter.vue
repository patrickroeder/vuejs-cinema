<template lang="html">
  <div id="movie-filter">
    <h2>Filter results</h2>
    <div class="filter-group">
      <check-filter v-for="genre in genres" :title="genre"></check-filter>
    </div>
  </div>
</template>

<script>
  import genres from '../util/genres';
  import CheckFilter from './CheckFilter.vue';

  export default {
    data() {
      return {
        // es6 for genres: genres
        genres
      }
    },
    // component local to movie-filter
    components: {
      CheckFilter
    }
  }
</script>
