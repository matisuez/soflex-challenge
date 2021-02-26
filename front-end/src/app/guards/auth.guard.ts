import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(
    private router: Router,
  ) {}
  
  canActivate(): boolean {
    let status : boolean = false;
    localStorage.getItem('JWT') ? status = true : status = false;
    return status;
  }

}
