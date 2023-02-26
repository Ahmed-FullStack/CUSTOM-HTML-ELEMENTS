'use strict';

let template = document.createElement('template');

template.innerHTML = `
	<style>
	slot{
		border-radius: inherit;
	}
	.todo-label{
		box-sizing: border-box;
		display: flex;
		justify-content: left;
		align-items: center;

	}
	.todo-item{
		display: flex;
		justify-content: left;
		align-items: center;
		margin: 2rem 1rem;
		user-select: none;
		border-radius: inherit;
	}
	.todo-title{
		display: inline-block;
		margin: 0 1rem 0 .2rem;
		font-size: 1.2rem;
		color: hsl( 227 100% 95%);
	}
	.todo-input{
		position: relative;
		width: 2rem;
		aspect-ratio: 1 / 1;
		border: none;
		accent-color: blue;
		appearance: none;
		background-color: hsl(227 50% 88%);
		border-radius: 2rem;
		box-shadow: 0 .1rem 1rem hsl( 0 0% 0% / .1);
	}
	.todo-input::before, .todo-input::after{
		content:"";
		position: absolute;
		width: 15%;
		background-color: var(--tick-bg, hsl( 0 0% 0%));
		opacity: 0;
		border-radius: 2rem;
		scale: 1 0;
		pointer-events: none;
		transition: scale 200ms ease-out, opacity 300ms ease-out, transform 200ms ease-out;
	}
	.todo-input::before{
		top: 50%;
		left: 15%;
		height: 30%;
		translate: 140% -30%;
		rotate: -45deg;
		transform: scaleY(0);
		transform-origin: bottom;
	}
	.todo-input::after{
		top: 50%;
		left: 50%;
		height: calc(80% - 15%);
		translate: 0% -50%;
		rotate: 45deg;
	}
	.todo-input:checked.todo-input::before, .todo-input:checked.todo-input::after{
		opacity:1;
		scale: 1;
	}
	.todo-input:checked.todo-input::before{
		translate: 0% 0%;
		transform: scaleY(1);
		transform-origin: top;
	}
	.todo-input:checked.todo-input::after{
		transform: scaleY(1);
	}

	.todo-input:checked{
		background: hsl( 225 50% 70%);
	}
	.todo-info{
		pointer-events: none;
	}
	
	</style>
	<div class="todo-item">
		<label class="todo-label">
			<input class="todo-input" type="checkbox"/>
			<h3 class="todo-title">
				<slot></slot>
			</h3>
		</label>
		<span class="todo-info">
			<slot name="description"></slot>
		</span>
	</div>

`;

class TodoItem extends HTMLElement {
	constructor() {
		super();
		let shadowDOM = this.attachShadow({ mode: 'open' });
		shadowDOM.appendChild(template.content.cloneNode(true));

		const checkbox = shadowDOM.querySelector('input[type="checkbox"]');
		checkbox.addEventListener('click', e => {
			this.classList.remove(`animate`);
			clearTimeout(window.todoItemTimeout);
			clearTimeout(window.animationTimeOut);
			if (!checkbox.checked) return;
			window.animationTimeOut = setTimeout(() => {
				this.classList.add(`animate`);
				window.todoItemTimeout = setTimeout(() => {
					this.remove();
				}, 500);
			}, 350);
		});
	}
}

customElements.define('todo-item', TodoItem);
