import { Routes } from '@angular/router';
import { AuthComponent } from "./modules/auth/auth.component";
import { HomeComponent } from "./modules/home/home.component";
import { RegistrationComponent } from "./modules/auth/registration/registration.component";
import { ForgetPasswordComponent } from "./modules/auth/forget-password/forget-password.component";
import { ProjectDetailsComponent } from "./modules/project/project-details/project-details.component";
import { MenuLayerComponent } from "./shared/components/menu/menu-layer/menu-layer.component";
import { ProjectComponent } from "./modules/project/project.component";
import { ProjectParticipantComponent } from "./modules/project/project-paticipant/project-participant.component";

const menuItems: Routes = [
  { path: 'project/details', component: ProjectDetailsComponent },
  { path: 'project/isOwner/true', component: ProjectComponent },
  { path: 'project/isOwner/false', component: ProjectParticipantComponent },
]

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'menu', component: MenuLayerComponent, children: menuItems },
];
