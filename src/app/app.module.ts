import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './views/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
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
import { CartComponent } from './views/cart/cart.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FeedComponent } from './views/books/feed/feed.component';
import { LoginComponent } from './views/login/login.component';
import { LogoutComponent } from './views/logout/logout.component';
import { RegisterComponent } from './views/register/register.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { MainComponent } from './views/admin/main/main.component';
import { OrdersComponent } from './views/admin/orders/orders.component';
import { UsersComponent } from './views/admin/users/users.component';
import { BooksComponent } from './views/admin/books/books.component';
import { EditBookComponent } from './views/admin/books/edit-book/edit-book.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateBookComponent } from './views/admin/books/create-book/create-book.component';
import { ShowOrderComponent } from './views/admin/orders/show-order/show-order.component';
import { SearchComponent } from './views/books/search/search.component';
import { RecentComponent } from './views/books/recent/recent.component';
import { TopSellersComponent } from './views/books/top-sellers/top-sellers.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ProfileComponent } from './views/user/profile/profile.component';
import { InfoComponent } from './views/user/info/info.component';
import { UserOrdersComponent } from './views/user/user-orders/user-orders.component';
import { OrderDetailsComponent } from './views/user/user-orders/order-details/order-details.component';
import { EditUserInfoComponent } from './views/user/info/edit-user-info/edit-user-info.component';
import { PartnerComponent } from './views/user/partner/partner.component';


// const appRoutes:Routes = [
//   {path: 'cesta', component:CartComponent, data: { animation: 'fader' }},
//   {path: 'ver/:id', component:ShowBookComponent, data: { animation: 'fader'}},
//   {path: 'genero/:id', component:FeedComponent, data: { animation: 'fader'}},
//   {path: 'autores', component:AuthorsComponent, data: { animation: 'fader'}},
//   {path: 'index', component:IndexComponent, data: { animation: 'fader'}},
//   {path: '**', redirectTo:"index", data: { animation: 'fader'}},
//   {path: ' ', redirectTo:"index", data: { animation: 'fader'}}
// ]

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
    ShowBookComponent,
    CartComponent,
    CarouselComponent,
    FeedComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    DashboardComponent,
    MainComponent,
    OrdersComponent,
    UsersComponent,
    BooksComponent,
    EditBookComponent,
    ConfirmationDialogComponent,
    CreateBookComponent,
    ShowOrderComponent,
    SearchComponent,
    RecentComponent,
    TopSellersComponent,
    ProfileComponent,
    InfoComponent,
    UserOrdersComponent,
    OrderDetailsComponent,
    EditUserInfoComponent,
    PartnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // RouterModule,
    // RouterModule.forRoot(appRoutes),
    HttpClientModule,
    LoaderModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
