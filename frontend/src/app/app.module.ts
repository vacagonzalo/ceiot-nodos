import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { LoginComponent } from './login/login.component';
import { DeviceCalibrationComponent } from './device-calibration/device-calibration.component';
import { DeviceReadingsComponent } from './device-readings/device-readings.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { CredentialsInterceptorService } from './services/credentials-interceptor.service';
import { NavigationComponent } from './navigation/navigation.component';
import { DeviceNewComponent } from './device-new/device-new.component';
import { UnitPipe } from './pipes/unit.pipe';
import { NewUserComponent } from './new-user/new-user.component';
import { ProfileComponent } from './profile/profile.component';
import { LogListComponent } from './log-list/log-list.component';
import { UserPipe } from './pipes/user.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UsersComponent,
    UserDetailComponent,
    DevicesComponent,
    DeviceDetailComponent,
    LoginComponent,
    DeviceCalibrationComponent,
    DeviceReadingsComponent,
    NavigationComponent,
    DeviceNewComponent,
    UnitPipe,
    NewUserComponent,
    ProfileComponent,
    LogListComponent,
    UserPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: CredentialsInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
