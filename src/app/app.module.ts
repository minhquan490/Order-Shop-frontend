import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from '@component/home/home.component';
import { LoginModule } from '@module/login/login.module';
import { AppComponent } from './app.component';

import { DefaultNavigateService } from '@service/internal/default-navigate.service';
import { LocalStorageService } from '@service/internal/local-storage.service';
import { NavigateService } from '@service/navigate.service';
import { StorageService } from '@service/storage.service';
import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './interceptors/tree';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      headerName: 'X-XSRF-TOKEN',
      cookieName: 'XSRF-TOKEN'
    }),
    LoginModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: StorageService, useClass: LocalStorageService },
    { provide: NavigateService, useClass: DefaultNavigateService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
