import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router) {
    }

    login(username: string, password: string, departmentId: number) 
    {
        return this.http.post<any>(`http://localhost:8080/api/login`, {username, password, departmentId})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('username', username);
                    console.log("Dostalismy tokena");
                    this.router.navigate(['/home2']);
                }
                else
                {
                    console.log("Nie dostalismy tokena");
                }
                return user;
            }));    
    }

    logout() {
        // remove user from local storage to log user out
        // console.log(localStorage.getItem('currentUser'));
        localStorage.removeItem('token');
        console.log("token po usunieciu");
        console.log(localStorage.getItem('token'));
        this.router.navigate(['']);
    }
}
