export default class touchFeedback {
	constructor(el) {
		this.el = el;
		this.touchFeedbackContainer = this.touchFeedbackSetup();
		this.touchFeedback();
	}

	handlePointerDown(e) {
		if (this.el !== e.target) return;
		const touchFeedbackClass = 'touch-feedback-down';
		const touchFeedbackUp = 'touch-feedback-up';

		this.touchFeedbackContainer.classList.add(touchFeedbackClass);
		const touchFeedbackContainer = this.touchFeedbackContainer;
		const el = this.el;
		function handlePointerUp() {
			touchFeedbackContainer.classList.remove(touchFeedbackClass);
			touchFeedbackContainer.classList.add(touchFeedbackUp);

			setTimeout(() => {
				touchFeedbackContainer.classList.remove(touchFeedbackUp);
			}, 50);
			document.removeEventListener('pointerup', handlePointerUp);
			el.removeEventListener('dragend', handlePointerUp);
		}

		document.addEventListener('pointerup', handlePointerUp, {
			once: true,
		});
		this.el.addEventListener('dragend', handlePointerUp, {
			once: true,
		});
	}

	createElements(elClasses, appendChildrens = null, elType = 'div') {
		const el = document.createElement(elType);
		appendChildrens?.forEach(children => {
			el.appendChild(children);
		});
		elClasses.forEach(elClass => {
			el.classList.add(elClass);
		});
		return el;
	}

	touchFeedbackSetup() {
		const touchFeedbackFill = this.createElements([
			'touch-feedback',
			'touch-feedback-fill',
		]);
		const touchFeedbackStroke = this.createElements([
			'touch-feedback',
			'touch-feedback-stroke',
		]);

		const touchFeedbackContainer = this.createElements(
			['touch-feedback'],
			[touchFeedbackFill, touchFeedbackStroke]
		);
		this.el.appendChild(touchFeedbackContainer);

		return touchFeedbackContainer;
	}
	touchFeedback() {
		this.el.classList.add('ps-r');
		this.el.addEventListener('pointerdown', this.handlePointerDown.bind(this));
	}
}
