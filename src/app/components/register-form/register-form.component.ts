import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from '@environments/environment';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from '@service/http.service';
import { NavigateService } from '@service/navigate.service';

const messages = () => {
  const errorMsgMap: Map<string, string> = new Map<string, string>();
  errorMsgMap.set("username-require", environment.usernameErrMsgRequire);
  errorMsgMap.set("username-minlength", environment.usernameErrMsgMinLength)
  errorMsgMap.set("username-maxlength", environment.usernameErrMsgMaxLength);
  errorMsgMap.set("password-require", environment.passwordErrMsgRequire);
  errorMsgMap.set("firstName-require", environment.firstNameErrMsgRequire);
  errorMsgMap.set("firstName-minlength", environment.firstNameErrMsgMinLength)
  errorMsgMap.set("firstName-maxlength", environment.firstNameErrMsgMaxLength);
  errorMsgMap.set("lastName-require", environment.lastNameErrMsgRequire);
  errorMsgMap.set("lastName-minlength", environment.lastNameErrMsgMinLength)
  errorMsgMap.set("lastName-maxlength", environment.lastNameErrMsgMaxLength);
  errorMsgMap.set("phoneNumber-require", environment.phoneNumberErrMsgRequire);
  errorMsgMap.set("phoneNumber-invalid", environment.phoneNumberErrMsgInvalid);
  errorMsgMap.set("email-require", environment.emailErrMsgRequire);
  errorMsgMap.set("email-invalid", environment.emailErrMsgInvalid);
  errorMsgMap.set("gender-require", environment.genderErrMsgRequire);
  errorMsgMap.set("repeatPassword", "The repeat do not match with your password");
  errorMsgMap.set("termAgree", "You need to agree user terms");
  return errorMsgMap;
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  private registerUrl = "/register";

  constructor(
    private client: HttpService,
    private navigator: NavigateService,
    private formBuilder: FormBuilder
  ) { }

  errorMsg = messages();
  isRegisterErr = false;
  registerErr: Array<string> = [];

  registerSuccessMsg = '';
  isRegisterSuccess = false;

  xmarkIcon = faXmark;

  toggleModal() {
    this.isRegisterErr = false;
  }

  registerForm = this.formBuilder.group({
    firstName: ['', Validators.compose(
      [Validators.required, Validators.minLength(4), Validators.maxLength(36)]
    )],
    lastName: ['', Validators.compose(
      [Validators.required, Validators.minLength(4), Validators.maxLength(36)]
    )],
    phoneNumber: ['', Validators.compose(
      [Validators.required, Validators.pattern(/^(03|05|07|08|09)+(\d{8})\b$/)]
    )],
    email: ['', Validators.compose(
      [Validators.required, Validators.email, Validators.maxLength(32)]
    )],
    gender: ['', Validators.required],
    username: ['', Validators.compose(
      [Validators.required, Validators.minLength(4), Validators.maxLength(24)]
    )],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    termAgree: [false, Validators.requiredTrue]
  });


  handleSubmit() {
    this.registerErr = [];
    if (this.registerForm.invalid) {
      return;
    }
    const resp = this.client.post<{ message: string }>(this.registerUrl, this.registerForm.value);
    if (typeof resp === 'undefined') {
      this.isRegisterErr = true;
      this.registerErr.push("Checking your network before try again");
      return;
    }
    this.isRegisterErr = resp.isError;
    if (resp.isError) {
      resp.error.messages.forEach(message => this.registerErr.push(message));
    } else {
      console.log(resp.isError)
      console.log(resp.status);
      this.registerSuccessMsg = "Register success you will be navigate to login page in 10s";
      setTimeout(() => this.navigator.navigateTo("/login"), 10000);
    }
  }
}
