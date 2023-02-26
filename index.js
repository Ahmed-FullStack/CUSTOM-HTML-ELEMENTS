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
const rippleEffectToggler = document.querySelector(`[data-ripple-toggler]`);
let ripples = [];
let optionOff = false;
rippleEffectToggler.addEventListener(`click`, e => {
	if (!optionOff) {
		const mdcRipples = document.querySelectorAll('.mdc-ripple');
		ripples = [];
		mdcRipples.forEach(mdcRipple => {
			const el = mdcRipple.parentElement;
			ripples.push(el);
			el.classList.remove(`ripple`);
			mdcRipple.remove();
		});

		const btns = document.querySelectorAll(`button`);
		const a = document.querySelectorAll(`a`);
		btns.forEach(btn => {
			ripples.push(btn);
		});
		a.forEach(a => {
			ripples.push(a);
		});
		optionOff = true;
	} else {
		ripples.forEach(ripple => {
			rippleElement(ripple);
		});
		optionOff = false;
	}
});
