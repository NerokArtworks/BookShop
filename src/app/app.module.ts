import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './views/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { PoesiaComponent } from './components/sections/poesia/poesia.component';
import { EBooksComponent } from './components/sections/e-books/e-books.component';
import { FooterComponent } from './components/footer/footer.component';

const appRoutes:Routes = [
  {path: 'index', component:IndexComponent},
  {path: '**', redirectTo:"index"},
  {path: ' ', redirectTo:"index"}
]

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    PoesiaComponent,
    EBooksComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
