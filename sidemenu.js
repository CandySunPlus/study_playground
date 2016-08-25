export default class SideMenuPage {
    initialize() {
        document.querySelector('.container').innerHTML = `
          <div class="layout">
            <div class="side-menu"></div>
            <div class="header">
              <div class="menu-icon"></div>
            </div>
          </div>
        `;
    }

    toggleMenu(evt) {
        if (evt.currentTarget === this.layout) {
            if ((evt.target === this.layout && this.layout.classList.contains('menu-visiable')) || evt.target === this.menuIcon) {
                this.sideMenu.classList.add('menu-animatable');
                this.layout.classList.toggle('menu-visiable');
            }
        }
    }

    pageDidMounted() {
        this.menuIcon = document.querySelector('.menu-icon');
        this.sideMenu = document.querySelector('.side-menu');
        this.layout = document.querySelector('.layout');

        this.layout.addEventListener('click', evt => this.toggleMenu(evt), true);
        this.sideMenu.addEventListener('click', evt => this.toggleMenu(evt), false);
        this.sideMenu.addEventListener('transitionend', evt => {
            this.sideMenu.classList.remove('menu-animatable');
        }, false);
    }

    render() {
        this.initialize();
        this.pageDidMounted();
    }
}
