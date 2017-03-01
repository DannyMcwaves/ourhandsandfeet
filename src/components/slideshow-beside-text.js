import {bindable} from 'aurelia-framework';

export class SlideshowBesideText {

  get widescreen() {
    return document.documentElement.clientWidth > 1200;
  }

}
