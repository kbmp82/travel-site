class MobileMenu {
constructor(){
  this.menuIcon = document.querySelector('.header__menu-icon');
  this.menuContent = document.querySelector('.header__menu-content'); 
  this.siteHeader = document.querySelector('.header');
  this.events(); 
}

events() {
    this.menuIcon.addEventListener('click', () => this.toggleMenu());
}

toggleMenu() {
    this.menuContent.classList.toggle('header__menu-content--is-visible');
    this.siteHeader.classList.toggle('header--is-expanded');
    this.menuIcon.classList.toggle('header__menu-icon--close-x');
}
}




export {MobileMenu as default}