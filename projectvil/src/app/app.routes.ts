import { Routes } from '@angular/router';
import { AuthComponent } from "./modules/auth/auth.component";
import { HomeComponent } from "./modules/common/home/home.component";
import { RegistrationComponent } from "./modules/auth/registration/registration.component";
import { ForgetPasswordComponent } from "./modules/auth/forget-password/forget-password.component";
import { ProjectDetailsComponent } from "./modules/personal/project/project-details/project-details.component";
import { ProjectComponent } from "./modules/personal/project/project.component";
import { ProjectParticipantComponent } from "./modules/personal/project/project-paticipant/project-participant.component";
import { authGuard } from "./core/guards/auth.guard";
import { ROUTES } from "./shared/constants/routes";
import { ProjectCreateComponent } from "./modules/personal/project/project-create/project-create.component";
import { PersonalLayerComponent } from "./shared/components/menu/personal-layer/personal-layer.component";
import { CommonLayerComponent } from "./shared/components/menu/common-layer/common-layer.component";
import { PersonalInfoComponent } from "./modules/personal/personal-info/personal-info.component";
import { CommonProjectComponent } from "./modules/common/projects/projects.component";

const personalItems: Routes = [
  { path: ROUTES.personalInfo, component: PersonalInfoComponent, canActivate: [authGuard] },
  { path: ROUTES.project + '/' + ROUTES.create, component: ProjectCreateComponent, canActivate: [authGuard] },
  { path: ROUTES.project + '/' + ROUTES.details + '/:id', component: ProjectDetailsComponent },
  { path: ROUTES.project + '/' + ROUTES.isOwner + '/true', component: ProjectComponent, canActivate: [authGuard] },
  { path: ROUTES.project + '/' + ROUTES.isOwner + '/false', component: ProjectParticipantComponent, canActivate: [authGuard] },
];

const commonItems: Routes = [
  {path: ROUTES.findProject, component: CommonProjectComponent },
];

export const routes: Routes = [
  { path: ROUTES.empty, redirectTo: ROUTES.home, pathMatch: 'full' },
  { path: ROUTES.login, component: AuthComponent },
  { path: ROUTES.home, component: HomeComponent },
  { path: ROUTES.registration, component: RegistrationComponent },
  { path: ROUTES.forgetPassword, component: ForgetPasswordComponent },
  { path: ROUTES.personArea, component: PersonalLayerComponent, children: personalItems },
  { path: ROUTES.commonArea, component: CommonLayerComponent, children: commonItems },
];
