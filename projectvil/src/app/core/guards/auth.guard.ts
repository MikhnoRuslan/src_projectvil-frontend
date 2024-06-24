import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authGuard = () => {
  const authService = inject(AuthService);
  return  authService.getIsAuthenticated();
};
