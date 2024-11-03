var animated = `
@keyframes ScanlineAnimationLeft {
    0% {transform: translateX(0px) translateY(0px);}100% {transform: translateX(-32px) translateY(-32px);}
}
body::before {
    content: "";
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100% + 32px);
    height: calc(100% + 32px);
    background-image: url(graphics/scenery/computeroverlay.png);
    background-position-x: 0px;
    background-position-y: 0px;
    background-repeat: repeat;
    z-index: 10000000;
    animation: ScanlineAnimationLeft 2s linear infinite;
    animation-name: ScanlineAnimationLeft;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    pointer-events: none;
    opacity: 1;
    image-rendering: auto;
}
`
var still = `
body::before {
    content: "";
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100% + 32px);
    height: calc(100% + 32px);
    background-image: url(graphics/scenery/computeroverlay.png);
    background-position-x: 0px;
    background-position-y: 0px;
    background-repeat: repeat;
    z-index: 10000000;
    pointer-events: none;
    opacity: 1;
    image-rendering: auto;
}
`
var styleSheet = document.createElement("style")
// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
//     styleSheet.innerText = mobile
// }
// else {
//     styleSheet.innerText = desktop
// }

styleSheet.innerText = still
document.head.appendChild(styleSheet)