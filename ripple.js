class RippleEffect {
	constructor(el) {
		this.el = el;
		this.wavesContainer = this.createWavesContainer();
		this.rippleElement();
	}

	setCoordinates(e, wave, keyboard = false) {
		const { x, y, width, height } = e.target.getBoundingClientRect();

		const max = Math.max(width, height);

		wave.style.setProperty('--max-value', `${max}px`);

		const xCoordinate = !keyboard
			? (e.clientX - x - max / 2).toFixed(2)
			: max / 2 - width / 2;
		const yCoordinate = !keyboard
			? (e.clientY - y - max / 2).toFixed(2)
			: max / 2 - height / 2;

		const customXCoordinate = !keyboard ? xCoordinate : -xCoordinate;
		const customYCoordinate = !keyboard ? yCoordinate : -yCoordinate;

		wave.style.setProperty('--x', `${customXCoordinate}px`);
		wave.style.setProperty('--y', `${customYCoordinate}px`);
	}

	createWavesContainer() {
		const ripple = document.createElement('div');

		ripple.classList.add('mdc-ripple');
		this.el.appendChild(ripple);

		return ripple;
	}

	createWave() {
		const wave = document.createElement('div');
		wave.classList.add('mdc-ripple-wave');
		wave.classList.add('mdc-ripple-wave-animate');

		this.wavesContainer.appendChild(wave);

		return wave;
	}

	removeRippleFunc(e) {
		const styles = window.getComputedStyle(e.target);

		const waveRemoveDelay = styles.getPropertyValue(
			'--paper-ripple-duration-wms'
		);
		const waveOpacityMS = styles.getPropertyValue(
			'--paper-ripple-opacity-duration-wms'
		);

		setTimeout(() => {
			this.wave.classList.add('paper-ripple-opacity-animate');
			setTimeout(() => {
				this.wave.remove();
			}, waveOpacityMS);
		}, waveRemoveDelay);
	}

	rippleElement() {
		this.el.classList.add('ripple');
		this.el.addEventListener('pointerdown', e => {
			if (e.target !== this.el) return;
			if (e.buttons !== 1) return;

			const wave = this.createWave();
			this.setCoordinates(e, wave);

			const rippleRemoverFunction = this.removeRippleFunc.bind({
				...this,
				wave,
			});

			this.el.addEventListener('pointerup', rippleRemoverFunction, {
				once: true,
			});
			this.el.addEventListener('pointerleave', rippleRemoverFunction, {
				once: true,
			});
			this.el.addEventListener('dragend', rippleRemoverFunction, {
				once: true,
			});
		});
		this.el.addEventListener('keydown', e => {
			if (e.key !== ' ' && e.key !== 'Enter') return;
			if (e.target !== this.el) return;
			if (e.repeat) return;

			const wave = this.createWave();

			this.setCoordinates(e, wave, true);

			const rippleRemoverFunction = this.removeRippleFunc.bind({
				...this,
				wave,
			});

			this.el.addEventListener('keyup', rippleRemoverFunction, { once: true });
		});
	}
}

const btn = document.querySelectorAll('button');
const anchors = document.querySelectorAll('a');

btn.forEach(btn => {
	new RippleEffect(btn);
});
anchors.forEach(anchor => {
	new RippleEffect(anchor);
});

export default function rippleElement(el) {
	const elType = el.tagName.toLowerCase();
	const elStatement = elType === 'button' || elType === 'a';

	if (elStatement) return;

	new RippleEffect(el);
}
