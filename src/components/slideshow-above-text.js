import {Router} from 'aurelia-router'
import {inject, bindable} from 'aurelia-framework'

@inject(Router)
export class SlideshowAboveText {

    constructor(Router) {
        this.router = Router;
    }
}
