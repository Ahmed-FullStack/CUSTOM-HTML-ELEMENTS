export default class touchFeedback {
	constructor(el) {
		this.el = el;
		this.touchFeedbackContainer = this.touchFeedbackSetup();
		this.touchFeedback();
	}

	handlePointerDown(keyboard = false, e) {
		if (keyboard.type === `pointerdown`) {
			const e = arguments[0];
			if (e.buttons !== 1) return;
			if (this.el !== e.target) return;
			const touchFeedbackClass = 'touch-feedback-down';
			const touchFeedbackUp = 'touch-feedback-up';

			this.touchFeedbackContainer.classList.add(touchFeedbackClass);
			const touchFeedbackContainer = this.touchFeedbackContainer;
			const el = this.el;
			function handlePointerUp() {
				window.timer = setTimeout(() => {
					touchFeedbackContainer.classList.remove(touchFeedbackClass);
					touchFeedbackContainer.classList.remove(touchFeedbackUp);
				}, 50);
				touchFeedbackContainer.classList.add(touchFeedbackUp);

				document.removeEventListener('pointerup', handlePointerUp);
				el.removeEventListener('dragend', handlePointerUp);
			}

			document.addEventListener('pointerup', handlePointerUp, {
				once: true,
			});
			document.addEventListener('touchmove', handlePointerUp, {
				once: true,
			});

			this.el.addEventListener('dragend', handlePointerUp, {
				once: true,
			});
		} else {
			const e = arguments[1];
			if (e.key !== 'Enter' && e.key !== ' ') return;
			if (this.el !== e.target) return;
			const touchFeedbackClass = 'touch-feedback-down';
			const touchFeedbackUp = 'touch-feedback-up';

			this.touchFeedbackContainer.classList.add(touchFeedbackClass);
			const touchFeedbackContainer = this.touchFeedbackContainer;
			const el = this.el;
			function handlePointerUp() {
				clearTimeout(window.timer);
				window.timer = setTimeout(() => {
					touchFeedbackContainer.classList.remove(touchFeedbackUp);
				}, 50);
				touchFeedbackContainer.classList.remove(touchFeedbackClass);
				touchFeedbackContainer.classList.add(touchFeedbackUp);

				// document.removeEventListener('pointerup', handlePointerUp);
			}

			document.addEventListener('keyup', handlePointerUp, {
				once: true,
			});
		}
	}

	touchFeedbackSetup() {
		const touchFeedbackContainer = document.createElement('div');
		touchFeedbackContainer.classList.add('touch-feedback');
		this.el.appendChild(touchFeedbackContainer);

		return touchFeedbackContainer;
	}
	touchFeedback() {
		this.el.classList.add('feedback');
		this.el.addEventListener('pointerdown', this.handlePointerDown.bind(this));
		this.el.addEventListener(
			'keydown',
			this.handlePointerDown.bind(this, true)
		);
	}
}
