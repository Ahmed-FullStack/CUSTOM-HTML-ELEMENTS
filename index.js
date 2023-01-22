import rippleElement from './ripple.js';
import touchFeedback from './touch-feedback.js';

const els = document.querySelectorAll('.ripple');
els.forEach(el => {
	new touchFeedback(el);
	// rippleElement(el);
});
