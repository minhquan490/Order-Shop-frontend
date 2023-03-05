import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterFormComponent } from '@component/register-form/register-form.component';

const routes: Routes = [
  { path: '', component: RegisterFormComponent, title: 'Bach Linh order shop register page' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
