import { addClass, removeClass } from './helpers';

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

// export an object
export default {
  install(Vue) {
    Vue.directive('tooltip', {
      bind(el, bindings) {
        // apply side effect to the dom
        let span = document.createElement('SPAN');
        let text = document.createTextNode(`Seats available: ${bindings.value.seats}`);
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
  }
}
