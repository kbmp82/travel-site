//jshint esversion:6
import '../styles/styles.css';
import 'lazysizes';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
//import ClientArea from './modules/ClientArea';


/*React related code goes here
import React from 'react';
import ReactDOM from 'react-dom';
import MyReactComponent from './modules/MyReactComponent';

ReactDOM.render(<MyReactComponent />, document.querySelector('#react-example'));
*/
new MobileMenu();
new RevealOnScroll(document.querySelectorAll('.feature-item'), 75);
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60);
new StickyHeader();
new ClientArea();
let modal;

document.querySelectorAll('.open-modal').forEach(el => el.addEventListener('click', e => {
    e.preventDefault();
    if(typeof modal == 'undefined') {
        //webpackChunkName set name for bundle that is created. Can view it network tab of dev console
        import(/* webpackChunkName: "modal" */'./modules/Modal').then(x => {
            modal = new x.default();
            setTimeout(() => modal.openModal(), 20);
         }).catch(() => console.log('error'));
    }else{
       modal.openModal();
    }
}));


if(module.hot){
    module.hot.accept();
}

