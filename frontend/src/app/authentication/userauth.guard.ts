import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const userauthGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService);
  const router = inject(Router);
  if(authservice.isLoggedIn() && authservice.getUserRole() == "registered_user"){
    
    return true;
  }else{
router.navigate(['/login']);
    return false;
  }
};
