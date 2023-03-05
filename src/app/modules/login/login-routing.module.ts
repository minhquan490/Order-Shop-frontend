import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from '@component/form-login/form-login.component';

const routes: Routes = [
  { path: '', component: FormLoginComponent, title: 'Bach Linh order shop login page' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
