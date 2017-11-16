// we're getting our overview component here, no need to import it in main.js

import Overview from '../components/Overview.vue';
import Detail from '../components/Detail.vue';

export default [
  { path: '/', component: Overview, name: 'home' },
  { path: '/movie/:id', component: Detail, name: 'movie' },
  { path: '*', redirect: { name: 'home' } }
]
