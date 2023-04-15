import { trigger, transition, style, animate, query } from '@angular/animations';

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', [
        style({
          opacity: 0,
        }),
      ], { optional: true }),
      query(':enter', [
        animate('1000ms 1000ms ease',
          style({opacity: 1})
        ),
      ], { optional: true }),
      query(':leave', [
        animate('1000ms ease',
          style({opacity: 0})
        ),
      ], { optional: true }),
    ]),
]);

