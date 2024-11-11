const topBar = document.querySelector('#top-bar');
const exteriorColorSection = document.querySelector('#exterior-buttons');
const interiorColorSection = document.querySelector('#interior-buttons');
const exteriorImage = document.querySelector('#exterior-image');
const interiorImage = document.querySelector('#interior-image');
const wheelButtonsSection = document.querySelector('#wheel-buttons');
const performanceBtn = document.querySelector('#performance-btn');
const totalPriceElement = document.querySelector('#total-price');

const basePrice = 52490;
let currentPrice = basePrice;
let selectedColor = 'Stealth Grey';
const selectedOptions = {
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving': false,
};

const pricing = {
    'Performance Wheels': 2500,
    'Performance Package': 5000,
    'Full Self-Driving': 8500,
    Accessories: {
        'Center Console Trays': 35,
        Sunshade: 105,
        'All-Wheather Interior Liners': 225,
    },
};

const updateTotalPrice = () => {
    currentPrice = basePrice;

    if (selectedOptions['Performance Wheels']) {
        currentPrice += pricing['Performance Wheels'];
    }

    totalPriceElement.textContent = `$${currentPrice.toLocaleString()}`;
};

const handleScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop);
    topBar.classList.toggle('hidden-bar', !atTop);
};

const exteriorImages = {
    'Stealth Grey': './images/model-y-stealth-grey.jpg',
    'Pearl White': './images/model-y-pearl-white.jpg',
    'Deep Blue': './images/model-y-deep-blue-metallic.jpg',
    'Solid Black': './images/model-y-solid-black.jpg',
    'Ultra Red': './images/model-y-ultra-red.jpg',
    Quicksilver: './images/model-y-quicksilver.jpg',
};

const interiorImages = {
    Dark: './images/model-y-interior-dark.jpg',
    Light: './images/model-y-interior-light.jpg',
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

        //Change exterior image

        if (event.currentTarget === exteriorColorSection) {
            selectedColor = button.querySelector('img').alt;
            updateExteriorImage();
        }
        if (event.currentTarget === interiorColorSection) {
            const color = button.querySelector('img').alt;
            interiorImage.src = interiorImages[color];
        }
    }
};

//Update exterior image based on color and wheelButtonsSection
const updateExteriorImage = () => {
    const performanceSuffix = selectedOptions['Performance Wheel']
        ? '-performance'
        : '';
    const colorKey =
        selectedColor in exteriorImages ? selectedColor : 'Stealth Grey';
    exteriorImage.src = exteriorImages[colorKey].replace(
        '.jpg',
        `${performanceSuffix}.jpg`
    );
};

//Wheel Selection
const handleWheelButtonClick = (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttons = document.querySelectorAll('#wheel-buttons button');
        buttons.forEach((button) => {
            button.classList.remove('bg-gray-700', 'text-white');
            event.target.classList.add('bg-gray-700', 'text-white');
            selectedOptions['Performance Wheel'] =
                event.target.textContent.includes('Performance');
            updateExteriorImage();
            updateTotalPrice();
        });
    }
};

// Performance Package
const handlePerformanceButtonClick = () => {
    performanceBtn.classList.toggle('bg-gray-700');
    performanceBtn.classList.toggle('text-white');
};

window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);
wheelButtonsSection.addEventListener('click', handleWheelButtonClick);
performanceBtn.addEventListener('click', handlePerformanceButtonClick);
