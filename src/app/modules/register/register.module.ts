import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from '@component/register-form/register-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from '@service/http.service';
import { AngularClientHttp } from '@service/internal/angular-client.service';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  bootstrap: [RegisterFormComponent],
  providers: [
    { provide: HttpService, useClass: AngularClientHttp }
  ]
})
export class RegisterModule { }
