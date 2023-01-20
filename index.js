import rippleElement from './ripple.js';

const els = document.querySelectorAll('.ripple');

els.forEach(el => {
	rippleElement(el);
});
