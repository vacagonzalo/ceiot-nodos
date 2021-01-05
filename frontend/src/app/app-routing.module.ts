import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceReadingsComponent } from './device-readings/device-readings.component';
import { DeviceCalibrationComponent } from './device-calibration/device-calibration.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [
  {
    path: 'users/:name',
    component: UserDetailComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'devices/:tag/detail',
    component: DeviceDetailComponent
  },
  {
    path: 'devices/:tag/readings',
    component: DeviceReadingsComponent
  },
  {
    path: 'devices/:tag/calibration',
    component: DeviceCalibrationComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
