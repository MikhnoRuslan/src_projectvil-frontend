import { Routes } from '@angular/router';
import {AuthComponent} from "./modules/auth/auth.component";
import {HomeComponent} from "./modules/home/home.component";
import {RegistrationComponent} from "./modules/auth/registration/registration.component";
import {ForgetPasswordComponent} from "./modules/auth/forget-password/forget-password.component";
import {MenuComponent} from "./shared/components/menu/menu.component";
import {ProjectCreateComponent} from "./modules/project/project-create/project-create.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },

  { path: 'menu', component: MenuComponent },
  { path: 'dd', component: ProjectCreateComponent }
];
