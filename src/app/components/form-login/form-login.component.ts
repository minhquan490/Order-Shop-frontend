import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from '@service/http.service';
import { NavigateService } from '@service/navigate.service';
import { StorageService } from '@service/storage.service';

const message = () => {
  const errorMsgMap: Map<string, string> = new Map<string, string>();
  errorMsgMap.set("username-require", environment.usernameErrMsgRequire);
  errorMsgMap.set("username-minlength", environment.usernameErrMsgMinLength)
  errorMsgMap.set("username-maxlength", environment.usernameErrMsgMaxLength);
  errorMsgMap.set("password-require", environment.passwordErrMsgRequire);
  return errorMsgMap;
}

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit, OnDestroy {
  private loginUrl = "/login";

  constructor(private httpService: HttpService,
    private storageService: StorageService,
    private navigator: NavigateService) { }

  errorMsg = message();
  model: LoginForm = { username: "", password: "" };
  loginError = false;
  loginErrorMsg: Array<string> = [];
  usernameIcon = faUser;
  passwordIcon = faLock;
  xmarkIcon = faXmark;
  googleIcon = faGoogle;
  facebookIcon = faFacebook;
  twitterIcon = faTwitter;

  toggleModal() {
    this.loginError = false;
  }

  onSubmit() {
    const resp = this.httpService.post<LoginResp>(this.loginUrl, this.model);
    this.loginError = resp.isError;
    this.loginErrorMsg = resp.error.messages;
    if (!this.loginError) {
      const accessToken = resp.headers.get(environment.accessTokenHeaderName);
      const body = resp.body;
      if (accessToken === null || body === null) {
        this.loginError = true;
        this.loginErrorMsg.push("Problem occur when try to login");
      } else {
        this.storageService.setItem(environment.accessTokenHeaderName, accessToken);
        this.storageService.setItem(environment.refreshTokenHeaderName, body.refresh_token);
        this.navigator.navigateTo("/home");
      }
    } else {
      resp.error.messages.forEach(err => this.loginErrorMsg.push(err));
    }
  }

  ngOnInit(): void {
    this.reset();
  }

  ngOnDestroy(): void {
    this.reset();
  }

  private reset(): void {
    this.model = { username: "", password: "" };
    this.loginError = false;
    this.loginErrorMsg = [];
  }
}

type LoginResp = {
  refresh_token: string
}

type LoginForm = {
  username: string,
  password: string
}
