import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokentimer: any
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string){
    const authData: AuthData = {
      email: email,
      password: password
    }
    this.http.post("http://localhost:3000/api/user/singup", authData)
      .subscribe(response => {
        console.log(response);
      })
  }

  login(email: string, password: string){
    const authData: AuthData = {
      email: email,
      password: password
    }
    this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/user/login", authData)
      .subscribe( response => {
        const token = response.token
        this.token = token;
        if (token){
          const expiresDuration = response.expiresIn;
          this.setAuthTimer(expiresDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresDuration*1000)
          this.saveAuthData(token,  expirationDate)
          this.router.navigate(['/'])
          console.log("you are logged in" + token);
        }
      })
  }

  autoAuthUser(){
    const authInformation = this.getAuthData()
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true);
    }
  }

  logout(){
    this.token=null
    this.isAuthenticated = false
    this.authStatusListener.next(false);
    this.router.navigate(['/'])
    this.clearAuthData();
    clearTimeout(this.tokentimer);
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private setAuthTimer(duration: number){
    this.tokentimer = setTimeout(() => {
      this.logout();
    }, duration * 1000)
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");

  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if(!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}