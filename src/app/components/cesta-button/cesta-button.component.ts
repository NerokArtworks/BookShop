import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { buttonAnimation } from 'src/app/Animations/cesta-button-animation';
import { Libro } from 'src/app/interfaces/Libro';
import { RestService } from 'src/app/services/api/rest.service';
import { CestaService } from 'src/app/services/cesta-service.service';

@Component({
  selector: 'app-cesta-button',
  templateUrl: './cesta-button.component.html',
  styleUrls: ['./cesta-button.component.css']
})
export class CestaButtonComponent implements OnInit{
  @Input() id!: string | null | number | undefined;
  libro!: Libro;
  @ViewChild('addToCartButton') addToCartButton!: ElementRef;
  @ViewChild('addToCartIcon') addToCartIcon!: ElementRef;
  @ViewChild('addToCartText') addToCartText!: ElementRef;
  @ViewChild('addToCartPlus') addToCartPlus!: ElementRef;
  @ViewChild('addToCartCon') addToCartCon!: ElementRef;

  constructor (private LibroService: RestService, private CestaService: CestaService) { }

  ngOnInit(): void {
    // Controlar que id no sea null porque intenta hacer la solicitud antes de tener el valor de id
    console.log("Viendo libro id: " + this.id);
    if (this.id != null && this.id != undefined) {
      this.LibroService.getLibro(this.id).subscribe(libro => { (this.libro = libro); });
    }

    const cookieName = 'carrito';
    const expiryHours = 12;
    const now = new Date();

    // Comprobamos si la cookie ya existe
    if (!document.cookie.includes(`${cookieName}=`)) {
      // Creamos una nueva cookie con la fecha de expiración
      const expiryTime = now.getTime() + expiryHours * 60 * 60 * 1000;
      now.setTime(expiryTime);
      const expires = `expires=${now.toUTCString()}`;

      // Creamos un array vacío de libros y lo codificamos a JSON
      const emptyCart: never[] = [];
      const emptyCartJson = JSON.stringify(emptyCart);

      // Creamos la cookie con el array vacío y la fecha de expiración
      document.cookie = `${cookieName}=${emptyCartJson};${expires};path=/`;
    }
  }

  addToCart() {
    // Recuperar la cookie "carrito"
    let carrito = JSON.parse(this.getCookie("carrito") || "[]");
    console.log(`Carrito: ${carrito}`);
    // Agregar un nuevo libro al array
    // Borro la descripcion y la sinopsis para liberar espacio de la cookie
    // this.libro.descripcion = "";
    // this.libro.sinopsis = "";
    if (carrito.push(this.libro)) {
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
        this.addToCartText.nativeElement.style.opacity = 0;
        this.addToCartIcon.nativeElement.style.opacity = 0;
        this.addToCartText.nativeElement.style.paddingLeft = 0;
        this.addToCartText.nativeElement.innerHTML = 'Añadir';
        setTimeout(() => {
          this.addToCartText.nativeElement.style.opacity = 1;
          this.addToCartIcon.nativeElement.style.opacity = 1;
        }, 200);
      }, 600);
      // Guardar la cookie actualizada
      this.setCookie("carrito", JSON.stringify(carrito), 7);

      // CESTASERVICE
      this.CestaService.addItem(this.libro);
    }
  }

  // Función para obtener el valor de una cookie por su nombre
  getCookie(nombre: string): string | undefined {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [nombreCookie, valorCookie] = cookie.split("=");
      if (nombreCookie === nombre) {
        return decodeURIComponent(valorCookie);
      }
    }
    return undefined;
  }

  // Función para establecer el valor de una cookie
  setCookie(nombre: string, valor: string, diasExpiracion: number): void {
    const fechaExpiracion = new Date();
    fechaExpiracion.setDate(fechaExpiracion.getDate() + diasExpiracion);
    const cookie = `${nombre}=${encodeURIComponent(valor)};expires=${fechaExpiracion.toUTCString()};path=/`;
    document.cookie = cookie;
  }
}
