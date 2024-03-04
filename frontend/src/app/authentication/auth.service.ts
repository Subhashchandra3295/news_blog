import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean{
    const token= localStorage.getItem('token');
    return !!token;
  }

  getUserRole(){
    const role= localStorage.getItem('user_role');
    return role;
  }
}