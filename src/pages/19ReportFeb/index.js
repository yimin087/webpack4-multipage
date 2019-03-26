import 'amfe-flexible/index.min.js';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import './index.scss';

let tipUp = document.querySelector('#tipUp')
let tipDown = document.querySelector('#tipDown')

new Swiper('.swiper-container', {
  direction: 'vertical',
  on: {
    slideChangeTransitionStart: function(){
      // alert(this.activeIndex);
      switch (this.activeIndex) {
        case 0: 
          tipUp.style.display = 'none';
          break;
        case 11:
          tipDown.style.display = 'none'; 
          break;
        default:
          tipUp.style.display = 'block';
          tipDown.style.display = 'block';  
      }
    }
  }
});     