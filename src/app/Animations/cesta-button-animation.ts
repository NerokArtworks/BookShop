import { trigger, state, style, animate, transition } from '@angular/animations';

export const buttonAnimation = trigger('buttonAnimation', [
  state('initial', style({
    transform: 'translateY(0)'
  })),
  state('final', style({
    transform: 'translateY(-2px)'
  })),
  transition('initial=>final', animate('100ms')),
  transition('final=>initial', animate('100ms'))
]);
