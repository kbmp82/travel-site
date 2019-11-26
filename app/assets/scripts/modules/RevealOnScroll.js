import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {
    constructor(el, percent) {
        this.percent = percent;
        this.itemsToReveal = el;
        this.hideInitially();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.browserHeight = window.innerHeight;
        this.resizeThrottle = debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 400)
        this.events();
    }

    hideInitially() {
        this.itemsToReveal.forEach( (el) =>  {
            el.classList.add('reveal-item');
            el.isRevealed = false;
            this.itemsToReveal[this.itemsToReveal.length -1].isEnd = true;
        });
    }

    events() {
        window.addEventListener('scroll', this.scrollThrottle);
        window.addEventListener('resize', this.resizeThrottle);
    }

    calcCaller() {
        this.itemsToReveal.forEach((el, index) => {
            if(el.isRevealed === false){
                this.calculateIfScrolledTo(el);
            }else{
              if(el.isEnd) {
                  window.removeEventListener('scroll', this.scrollThrottle);  
                }
            }
            
         })
    }

    calculateIfScrolledTo(el) {
      if(window.scrollY + this.browserHeight > el.offsetTop) {
        const scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
        if(scrollPercent < this.percent) {
            el.classList.add('reveal-item--is-visible');
            el.isRevealed = true;
        }
      }
    }
}


export {RevealOnScroll as default} 