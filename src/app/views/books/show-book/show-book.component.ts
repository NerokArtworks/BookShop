import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from 'src/app/interfaces/Libro';
import { RestService } from 'src/app/services/api/rest.service';
import { CestaService } from 'src/app/services/cesta-service.service';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit{
  public id!: string | null;
  public libro!: Libro;
  protected precioOriginal!: number;
  selectedType: string = "tapadura";
  protected showStockAlert: boolean = false;

  // Cesta button
  @ViewChild('addToCartButton') addToCartButton!: ElementRef;
  @ViewChild('addToCartIcon') addToCartIcon!: ElementRef;
  @ViewChild('addToCartText') addToCartText!: ElementRef;
  @ViewChild('addToCartPlus') addToCartPlus!: ElementRef;
  @ViewChild('addToCartCon') addToCartCon!: ElementRef;

  constructor(private LibroService: RestService, private route: ActivatedRoute, private router: Router, private CestaService: CestaService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    this.LibroService.getLibro(id).subscribe(libro => {
      (this.libro = libro); 
      console.log(libro); 
      // Asignar el tipo de tapa preseleccionada
      if (this.libro.tipo == 'tapablanda') {
        // Exclusivo en tapablanda
        this.selectedType = 'tapablanda';
      }
      this.libro.tapa = this.selectedType;
      
      // Guardar el precio original
      this.precioOriginal = this.libro.precio;
      this.calcularPrecio();
      // this.libro.tapa = this.libro.tipo;
    });
  }

  // Select de Tapa
  alterTapa() {
    this.libro.tapa = this.selectedType;
    this.calcularPrecio();
  }

  calcularPrecio() {  
    // Resetear precio para calcular de nuevo
    this.libro.precio = this.precioOriginal;
    if (this.libro.tapa == 'tapablanda') {
      console.log(this.libro.precio);
      // Mostrar precio tapa blanda
      let pow = Math.pow(10, 2);
      this.libro.precio = Math.round(((this.libro.precio * 48.57) / 100) * pow) / pow;
      this.libro.oferta = (this.libro.precio * 0.95).toFixed(2);
    } else if(this.libro.tapa == 'ebook') {
      // Mostrar precio ebook
      this.libro.precio = 9.99;
      this.libro.oferta = (this.libro.precio * 0.95).toFixed(2);
    } else {
      // Mostar precio tapa dura
      this.libro.oferta = (this.libro.precio * 0.95).toFixed(2);
    }
  }

  addToCart() {
    this.animarBoton();
    // CESTASERVICE
    if (!this.CestaService.addItem(this.libro)) {
      this.showStockAlert = true;
    }
  }

  animarBoton() {
    let cestaIcon = document.querySelector('.cesta-icon');
    if (cestaIcon) {
      cestaIcon.classList.add('active');
    }
    this.addToCartIcon.nativeElement.classList.add('cart-active');
    this.addToCartPlus.nativeElement.classList.add('cart-plus-active');
    this.addToCartCon.nativeElement.classList.add('cart-con-active');
    this.addToCartText.nativeElement.classList.add('cart-text-active');
    this.addToCartText.nativeElement.style.paddingLeft = '10px';
    this.addToCartText.nativeElement.innerHTML = 'Añadido';
    setTimeout(() => {
      this.addToCartIcon.nativeElement.classList.remove('cart-active');
      this.addToCartPlus.nativeElement.classList.remove('cart-plus-active');
      this.addToCartCon.nativeElement.classList.remove('cart-con-active');
      this.addToCartText.nativeElement.classList.remove('cart-text-active');
      if (cestaIcon) {
        cestaIcon.classList.remove('active');
      }
      this.addToCartText.nativeElement.style.opacity = 0;
      this.addToCartIcon.nativeElement.style.opacity = 0;
      this.addToCartText.nativeElement.style.paddingLeft = 0;
      this.addToCartText.nativeElement.innerHTML = 'Añadir';
      setTimeout(() => {
        this.addToCartText.nativeElement.style.opacity = 1;
        this.addToCartIcon.nativeElement.style.opacity = 1;
      }, 200);
    }, 600);
  }
}
