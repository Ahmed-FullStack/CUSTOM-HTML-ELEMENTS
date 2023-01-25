import rippleElement from './ripple.js';
import touchFeedback from './touch-feedback.js';

const rippleEls = document.querySelectorAll('.ripple');
const touchFeedbackEls = document.querySelectorAll('.feedback');
rippleEls.forEach(el => {
	rippleElement(el);
});

touchFeedbackEls.forEach(touchFeedbackEl => {
	new touchFeedback(touchFeedbackEl);
});
