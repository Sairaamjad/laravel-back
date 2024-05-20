import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';

import { TodoComponent } from './todo/todo.component';
const routes: Routes = [
   {path:"register", component:RegisterComponent},
   {path: '',  component:LoginComponent } ,
   {path: 'todos',  component:TodoComponent } ,

  //  { path: '', redirectTo: '/signin', pathMatch: 'full' }


];

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
