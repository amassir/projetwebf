import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  canActivate(): boolean {
    // Vérifie que l'on est bien dans un navigateur avant d'accéder à sessionStorage
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = !!sessionStorage.getItem('user'); 
      if (!isLoggedIn) {
        this.router.navigate(['/login']); 
        return false;
      }
      return true;
    }

    // Si on est côté serveur, on bloque l'accès (ou on retourne false par sécurité)
    return false;
  }
}
