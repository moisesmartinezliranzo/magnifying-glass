
const magnifyingGlassContainer = document.querySelector("#magnifying-glass-container");
const backgroundImage = document.querySelector("#background-image");
const magnifyingGlass = document.querySelector("#magnifying-glass");

const zoom = 3;
let offset = [0, 0];
let isDown = false;

document.addEventListener('mousemove', (event) => moveMagnifyingGlass(event));
document.addEventListener('mouseup', () => mouseUp());
magnifyingGlass.addEventListener('mousedown', (event) => mouseDown(event));

document.addEventListener('touchmove', (event) => moveMagnifyingGlass(event), { passive: false });
magnifyingGlass.addEventListener('touchend', () => mouseUp(), { passive: false });
magnifyingGlass.addEventListener('touchstart', (event) => mouseDown(event), { passive: false });

const moveMagnifyingGlass = (event) => {
    let e = event;

    e.preventDefault();
    e.stopPropagation();

    if (e.type === "touchmove") {
        e = e.touches[0];
    }

    let x = e.pageX;
    let y = e.pageY;

    if (isDown) {
        if (x < Math.abs(offset[0])) {
            x = Math.abs(offset[0]);
        }
        if (x - Math.abs(offset[0]) > (magnifyingGlassContainer.clientWidth - magnifyingGlass.offsetWidth)) {
            x = magnifyingGlassContainer.clientWidth - magnifyingGlass.offsetWidth + Math.abs(offset[0]);
        }
        if ((y + magnifyingGlassContainer.offsetTop) < Math.abs(offset[1])) {
            y = Math.abs(offset[1]);
        }
        if ((y - Math.abs(offset[1])) > (magnifyingGlassContainer.clientHeight - magnifyingGlass.offsetHeight)) {
            y = magnifyingGlassContainer.clientHeight - magnifyingGlass.offsetHeight + Math.abs(offset[1]);
        }

        magnifyingGlass.style.left = `${x + offset[0]}px`;
        magnifyingGlass.style.top = `${y + offset[1]}px`;

        let left = ((x - Math.abs(offset[0])) * zoom);

        if (backgroundImage.width > 390 && backgroundImage.width < 428) {
            left = left + Math.abs(left * 0.30);
        }

        if (backgroundImage.width <= 390) {
            left = left + Math.abs(left * 0.43);
        }

        let top = (y - Math.abs(offset[1])) * zoom;

        magnifyingGlass.style.backgroundPositionX = `-${left}px`;
        magnifyingGlass.style.backgroundPositionY = `-${top}px`;
    }
}

const mouseUp = () => {
    isDown = false;
    magnifyingGlass.style.cursor = "grab";
}

const mouseDown = (event) => {
    let e = event;

    if (e.type === "touchstart") {
        e = e.touches[0];
    }

    isDown = true;
    magnifyingGlass.style.cursor = "grabbing";
    offset = [
        magnifyingGlass.offsetLeft - e.clientX,
        magnifyingGlass.offsetTop - e.clientY
    ];
}

const initialState = (backgroundImageSrc, magnifyingGlassImgageSrc) => {
    backgroundImage.src = backgroundImageSrc;
    magnifyingGlass.style.backgroundImage = `url(${magnifyingGlassImgageSrc})`;

    magnifyingGlass.style.setProperty('top', 'calc(50% - 75px)');
    magnifyingGlass.style.setProperty('left', 'calc(50% - 75px)');

    magnifyingGlass.style.backgroundSize = `${backgroundImage.offsetWidth * zoom}px ${backgroundImage.offsetHeight * zoom}px`;;
    magnifyingGlass.style.backgroundPosition = `-530px -900px`;
}

let bgPath = 'https://raw.githubusercontent.com/moisesmartinezliranzo/magnifying-glass/main/images/veronica_mars_poster_bw.jpg';
let poster = 'https://raw.githubusercontent.com/moisesmartinezliranzo/magnifying-glass/main/images/veronica_mars_poster.jpg';

initialState(bgPath, poster);