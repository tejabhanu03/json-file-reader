import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { LoginComponent } from './login/login.component';
import { RegistorComponent } from './registor/registor.component';

const routes: Routes = [
  { path : '', component :  LoginComponent},
  { path : 'login', component :  LoginComponent},
  { path : 'fileupload', component :  FileuploadComponent},
  { path : 'register', component :  RegistorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
