import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './views/cart/cart.component';
import { ShowBookComponent } from './views/books/show-book/show-book.component';
import { FeedComponent } from './views/books/feed/feed.component';
import { AuthorsComponent } from './views/authors/authors.component';
import { IndexComponent } from './views/index/index.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LogoutComponent } from './views/logout/logout.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {path: 'register', component:RegisterComponent, data: { animation: 'fader' }},
  {path: 'login', component:LoginComponent, data: { animation: 'fader' }},
  {path:'logout', canActivate:[AuthGuard], component:LogoutComponent},
  {path: 'cesta', component:CartComponent, data: { animation: 'fader' }},
  {path: 'ver/:id', component:ShowBookComponent, data: { animation: 'fader'}},
  {path: 'genero/:id', component:FeedComponent, data: { animation: 'fader'}},
  {path: 'autores', component:AuthorsComponent, data: { animation: 'fader'}},
  {path: 'index', component:IndexComponent, data: { animation: 'fader'}},
  {path: '**', redirectTo:"index", data: { animation: 'fader'}},
  {path: ' ', redirectTo:"index", data: { animation: 'fader'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
