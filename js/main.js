const topBar = document.querySelector('#top-bar');
const exteriorColorSection = document.querySelector('#exterior-buttons');
const interiorColorSection = document.querySelector('#interior-buttons');
const exteriorImage = document.querySelector('#exterior-image');
const interiorImage = document.querySelector('#interior-image');

const handleScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop);
    topBar.classList.toggle('hidden-bar', !atTop);
};

const handleColorButtonClick = (event) => {
    let button;

    if (event.target.tagName === 'IMG') {
        button = event.target.closest('button');
    } else if (event.target.tagName === 'BUTTON') {
        button = event.target;
    }

    if (button) {
        const buttons = event.currentTarget.querySelectorAll('button');
        buttons.forEach((button) => button.classList.remove('btn-selected'));
        button.classList.add('btn-selected');
    }
};

window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));

exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);
