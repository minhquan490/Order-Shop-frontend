import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormLoginComponent } from '@component/form-login/form-login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from '@service/http.service';
import { AngularClientHttp } from '@service/internal/angular-client.service';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    FormLoginComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    LoginRoutingModule,
    FontAwesomeModule
  ],
  bootstrap: [FormLoginComponent],
  providers: [
    { provide: HttpService, useClass: AngularClientHttp }
  ]
})
export class LoginModule {

}
