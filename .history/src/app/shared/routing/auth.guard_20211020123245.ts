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
        let isAuthenticated = this.authService.isUserLoggedIn();
        let token = this.authService.getToken();
       // if (token == null) {
            this.router.navigate(['/']);
        //}
        return true; //token != null ? true : false;
    }
}