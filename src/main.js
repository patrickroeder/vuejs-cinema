import Vue from 'vue';
import axios from 'axios';
import './style.scss';

import { checkFilter } from './util/bus';
import routes from './util/routes';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import moment from 'moment-timezone';
import { addClass, removeClass } from './util/helpers';

moment.tz.setDefault('UTC');
// make moment accessible to all components
// Compments are created from the Vue.prototype
// $: convention "this is a public api method"
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment} } );

// drop-in replacement for vue-resource
Vue.prototype.$http = axios;

// central event dispatcher outside of the main vue instance
window.Event = new Vue();

// TODO: try out abstract mode
const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  data: {
    // filter arrays always contain whichever filters have been checked
    // selected genre(s) and time(s): refactor as es6 set?
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment()
  },
  created() {
    // console.log(this.$moment);
    this.$http.get('/api').then(response => {
      this.movies = response.data;
    });
    // callback: assignment (checkFilter = function checkFilter(x,y,z))
    window.Event.$on('check-filter', checkFilter.bind(this));
  },
  router
});

let mouseOverHandler = function(event) {
  // get the sibling span (our tooltip)
  let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
  addClass(span, 'tooltip-show');
};

let mouseOutHandler = function(even) {
  // get the sibling span (our tooltip)
  let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
  removeClass(span, 'tooltip-show');
};

Vue.directive('tooltip', {
  bind(el, bindings) {
    // apply side effect to the dom
    let span = document.createElement('SPAN');
    let text = document.createTextNode('Seats available: 200');
    span.appendChild(text);
    addClass(span, 'tooltip');
    el.appendChild(span);
    // get child div (not the wrapper), it is the first child element
    let div = el.getElementsByTagName('DIV')[0];
    div.addEventListener('mouseover', mouseOverHandler);
    div.addEventListener('mouseout', mouseOutHandler);
    // mobile
    div.addEventListener('touchstart', mouseOverHandler);
    div.addEventListener('touchend', mouseOutHandler);
  },
  // when elements are removed from the dom -- cleanup
  unbind(el) {
    // get child div (not the wrapper), it is the first child element
    let div = el.getElementsByTagName('DIV')[0];
    div.removeEventListener('mouseover', mouseOverHandler);
    div.removeEventListener('mouseout', mouseOutHandler);
    // mobile
    div.addEventListener('touchstart', mouseOverHandler);
    div.addEventListener('touchend', mouseOutHandler);
  }
});
