import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { AuthService } from "../service/auth.service";
  
@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Promise<boolean> {
        var isAuthenticated = this.authService.isUserLoggedIn();
        if (!isAuthenticated) {
            this.router.navigate(['/']);
        }
        return isAuthenticated;
    }
}