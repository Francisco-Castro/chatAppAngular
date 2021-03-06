import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map } from 'rxjs/operators';

export class TestUser{
    constructor(public status: string){}
}

export class JwtResponse{
    constructor(public jwtToken:string){}
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {


    constructor(private httpClient: HttpClient) {
    }

    authenticate(username, password) {
        return this.httpClient.post<any>('http://localhost:8080/authenticate', {username, password}).pipe(
            map(
                userData => {
                    sessionStorage.setItem('username', username);
                    let tokenString = 'Bearer ' + userData.token;
                    sessionStorage.setItem('token', tokenString);
                    return userData;
                }
            )
        );
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('username');
        return !(user === null)
    }

    logOut() {
        sessionStorage.removeItem('username')
    }

}
