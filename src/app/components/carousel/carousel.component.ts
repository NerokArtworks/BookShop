import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef, Input } from '@angular/core';
import { Libro } from 'src/app/interfaces/Libro';
import { RestService } from 'src/app/services/api/rest.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: [
    './carousel.component.css',
    './swiper-bundle.css'
  ]
})
export class CarouselComponent {
  @ViewChild('slider', {static: false}) slider!: ElementRef;
  @Input() autor!: string;
  @Input() id!: string;

  swiper!: Swiper;

  // Libros que muestra
  libros: Libro[] = [];
  librosShow: Libro[] = [];

  showSlider: boolean = false;

  constructor(private LibroService: RestService, private cd: ChangeDetectorRef) {}

  // Cargar libros
  ngOnInit(): void {
    if (this.autor) {
      this.LibroService.getLibrosByAutor(this.autor).subscribe(libro => { (this.libros = libro); console.log(libro); this.loadBooks(); });
    }
  }

  // Libros a mostrar
  loadBooks() {
    this.libros.forEach(l => {
      // if (l.id == 8 || l.id == 12 || l.id == 4 || l.id == 13) {
        l.oferta = (l.precio * 0.95).toFixed(2);
        this.librosShow.push(l);
      // }
    });
    this.showSlider = true;
    this.cd.detectChanges(); // detect changes
    this.initCarousel();
  }

  // Detectar elementos cargados y entonces iniciar carousel
  ngAfterViewInit(): void {
    if (this.showSlider) {
      this.initCarousel();
    }
  }

  // Iniciar carousel
  initCarousel() {
    console.log("Init carousel", this.slider);
    if (this.slider && this.slider.nativeElement && this.slider.nativeElement.children.length > 0) {
      this.swiper = new Swiper(`.slide-content${this.id}`, {
        slidesPerView: 3,
        spaceBetween: 50,
        speed: 400,
        loop: true,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        breakpoints:{
            0: {
                slidesPerView: 1,
            },
            520: {
                slidesPerView: 2,
            },
            950: {
                slidesPerView: 4,
            },
        },
      });
    }
  }

  nextSlide(): void {
    console.log("Slide next");
    this.swiper.slideNext();
  }

  prevSlide(): void {
    console.log("Slide prev");
    this.swiper.slidePrev();
  }

}
