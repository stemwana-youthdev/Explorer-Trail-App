import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import * as Sentry from '@sentry/angular';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { ProfilePhotoDialogComponent } from './containers/profile-photo-dialog/profile-photo-dialog.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from './store/store.module';
import { CoreModule } from './core/core.module';
import { ChallengeModule } from 'src/challenge/challenge.module';
import { LocationsModule } from 'src/locations/locations.module';
import { FeaturedLocationsComponent } from './containers/featured-locations/featured-locations.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SplashScreenComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ProfilePhotoDialogComponent,
    FeaturedLocationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    StoreModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    LocationsModule,
    ChallengeModule,
  ],
  entryComponents: [
    SplashScreenComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    { provide: 'googleTagManagerId', useValue: 'GTM-W79HP9V' },
  ]
})
export class AppModule { }
