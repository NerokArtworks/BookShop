import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './views/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { PoesiaComponent } from './components/sections/poesia/poesia.component';
import { EBooksComponent } from './components/sections/e-books/e-books.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthorsComponent } from './views/authors/authors.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { CestaButtonComponent } from './components/cesta-button/cesta-button.component';
import { BannerComponent } from './components/banner/banner.component';
import { ShowBookComponent } from './views/books/show-book/show-book.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from './components/loader/loader.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes:Routes = [
  {path: 'ver/:id', component:ShowBookComponent, data: { animation: 'fader'}},
  {path: 'autores', component:AuthorsComponent, data: { animation: 'fader'}},
  {path: 'index', component:IndexComponent, data: { animation: 'fader'}},
  {path: '**', redirectTo:"index", data: { animation: 'fader'}},
  {path: ' ', redirectTo:"index", data: { animation: 'fader'}}
]

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    PoesiaComponent,
    EBooksComponent,
    FooterComponent,
    AuthorsComponent,
    PrimaryButtonComponent,
    CestaButtonComponent,
    BannerComponent,
    ShowBookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    LoaderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
