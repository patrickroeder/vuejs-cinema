<template lang="html">
  <div id="overview">
    <div class="main">
      <movie-list :genre="genre" :time="time" :movies="movies" :day="day"></movie-list>
      <movie-filter></movie-filter>
    </div>
  </div>
</template>

<script>
import MovieList from './MovieList.vue';
import MovieFilter from './MovieFilter.vue';

export default {
  props: [ 'genre', 'time', 'movies', 'day' ],
  // local component registration
  components: {
    MovieList,
    MovieFilter
  }
}
</script>
