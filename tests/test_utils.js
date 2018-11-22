export const getResetAnimationsCSS = () => `
  * {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -ms-transition: none !important;
    -o-transition: none !important;
    transition: none !important;

    -webkit-animation: none !important;
    -moz-animation: none !important;
    -ms-animation: none !important;
    -o-animation: none !important;
    animation: none !important;
  }

  .animation-container [class^="skeleton-line-"]::after {
    display: none;
  }`;

export default getResetAnimationsCSS;
