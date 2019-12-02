import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class StickyHeader {
    constructor() {
        this.header = document.querySelector('.header');
        this.logo = document.querySelector('.header__logo');
        this.browserHeight = window.innerHeight;
        this.previousScrollY = window.scrollY;
        this.pageSections = document.querySelectorAll('.page-section');
        this.resizeThrottle = debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 400)
        this.events(); 
    }

    events() {
        window.addEventListener('scroll', throttle(() => this.runOnScroll(), 200));
        window.addEventListener('resize', this.resizeThrottle);
    }

    runOnScroll() {
        this.determineScrollDirection();

        if (window.scrollY > 60) {
          this.header.classList.add('header--dark'); 
          this.logo.classList.add('header__logo--shrink'); 
        }else{
            this.header.classList.remove('header--dark'); 
            this.logo.classList.remove('header__logo--shrink');
        }

        this.pageSections.forEach(el => this.checkSection(el))
    }

    determineScrollDirection() {
        if(window.scrollY > this.previousScrollY){
            this.scrollDirection = 'down';
        }else{
            this.scrollDirection = 'up'; 
        }
        this.previousScrollY = window.scrollY;

    }

    //check browser page section and highlight corresponding nav href
    checkSection(el) {

        if(window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < (el.offsetTop + el.offsetHeight)) {
            let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100
            if(scrollPercent < 33 && scrollPercent > -0.1 && this.scrollDirection === 'down' || scrollPercent < 33 && this.scrollDirection === 'up' ){
              let matchingLink = el.getAttribute('data-matching-link');
              document.querySelectorAll(`.nav a:not(${matchingLink})`).forEach(link => link.classList.remove('nav--is-current'));
              document.querySelector(matchingLink).classList.add('nav--is-current');
            }else if(window.scrollY < 300){
                document.querySelectorAll('.nav a').forEach(link => link.classList.remove('nav--is-current'));
            }
        }
    }
}

export {StickyHeader as default}