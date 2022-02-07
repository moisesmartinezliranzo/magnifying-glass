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

    if (isDown) {
        let x = e.pageX - magnifyingGlassContainer.offsetLeft;
        let y = e.pageY - magnifyingGlassContainer.offsetTop;

        if ((x + magnifyingGlassContainer.offsetLeft) < Math.abs(offset[0])) {
            x = Math.abs(offset[0]);
        }

        if ((x - Math.abs(offset[0])) > (magnifyingGlassContainer.clientWidth - magnifyingGlass.offsetWidth + magnifyingGlassContainer.offsetLeft - 12)) {
            x = magnifyingGlassContainer.clientWidth - magnifyingGlass.offsetWidth + Math.abs(offset[0]) - 2;
        }

        if ((y + magnifyingGlassContainer.offsetTop) < Math.abs(offset[1])) {
            y = Math.abs(offset[1]);
        }

        if ((y - Math.abs(offset[1])) > (magnifyingGlassContainer.clientHeight - magnifyingGlass.offsetHeight + magnifyingGlassContainer.offsetTop - 12)) {
            y = magnifyingGlassContainer.clientHeight - magnifyingGlass.offsetHeight + Math.abs(offset[1]) - 2;
        }


        let backgroundPositionLeft = ((x + offset[0] + magnifyingGlassContainer.offsetLeft)) * zoom;
        let backgroundPositionTop = ((y + offset[1] + magnifyingGlassContainer.offsetTop)) * zoom;

        magnifyingGlass.style.left = `${x + offset[0] + magnifyingGlassContainer.offsetLeft}px`;
        magnifyingGlass.style.top = `${y + offset[1] + magnifyingGlassContainer.offsetTop}px`;
        magnifyingGlass.style.backgroundPosition = `-${backgroundPositionLeft + (backgroundPositionLeft * 0.22)}px -${backgroundPositionTop}px`;
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
    magnifyingGlass.style.backgroundPosition = `-500px -915px`;
}

let bgPath = './images/veronica_mars_poster_bw.jpg';
let poster = './images/veronica_mars_poster.jpg';

initialState(bgPath, poster);