"use strict";

const carousel = document.querySelector("[data-carousel]");
const track = carousel.querySelector(".carousel-track");
const cards = [...track.children];
const gap = 20;
let offset = 0;
let startX = 0;
let startOffset = 0;
let isDragging = false;

// Duplicate the visible roster in both directions so wrapping is invisible.
cards.forEach((card) => track.append(card.cloneNode(true)));
cards.forEach((card) => track.prepend(card.cloneNode(true)));
const setWidth = cards.reduce((total, card) => total + card.getBoundingClientRect().width + gap, 0);
offset = -setWidth;

function wrapOffset(value) {
	while (value <= -setWidth * 2) value += setWidth;
	while (value >= 0) value -= setWidth;
	return value;
}

function render() {
	offset = wrapOffset(offset);
	track.style.transform = `translate3d(${offset}px, 0, 0)`;
}

function onPointerDown(event) {
	isDragging = true;
	startX = event.clientX;
	startOffset = offset;
	carousel.classList.add("is-dragging");
	carousel.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
	if (!isDragging) return;
	offset = startOffset + event.clientX - startX;
	render();
}

function onPointerUp() {
	isDragging = false;
	carousel.classList.remove("is-dragging");
}

carousel.addEventListener("pointerdown", onPointerDown);
carousel.addEventListener("pointermove", onPointerMove);
carousel.addEventListener("pointerup", onPointerUp);
carousel.addEventListener("pointercancel", onPointerUp);
carousel.addEventListener("dragstart", (event) => event.preventDefault());
render();
