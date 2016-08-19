import './main.less';

let menuIcon = document.querySelector('.menu-icon');
let sideMenu = document.querySelector('.side-menu');
let layout = document.querySelector('.layout');

layout.addEventListener('click', toggleMenu, true);
sideMenu.addEventListener('click', toggleMenu, false);

function toggleMenu(evt) {
    if (evt.currentTarget === layout) {
        if ((evt.target === layout && layout.classList.contains('menu-visiable')) || evt.target === menuIcon) {
            sideMenu.classList.add('menu-animatable');
            layout.classList.toggle('menu-visiable');
        }
    }
}

sideMenu.addEventListener('transitionend', evt => {
  sideMenu.classList.remove('menu-animatable');
}, false);