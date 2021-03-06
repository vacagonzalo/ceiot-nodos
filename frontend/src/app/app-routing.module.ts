import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceReadingsComponent } from './device-readings/device-readings.component';
import { DeviceCalibrationComponent } from './device-calibration/device-calibration.component';
import { DeviceNewComponent } from './device-new/device-new.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthGuard } from './auth.guard';
import { DevicesComponent } from './devices/devices.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ProfileComponent } from './profile/profile.component';
import { LogListComponent } from './log-list/log-list.component';


const routes: Routes = [
  {
    path: 'users/details/:name',
    component: UserDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/new',
    component: NewUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'devices/:tag/detail',
    component: DeviceDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'devices/:tag/readings',
    component: DeviceReadingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'devices/:tag/calibration',
    component: DeviceCalibrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-device',
    component: DeviceNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'devices',
    component: DevicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logs',
    component: LogListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
