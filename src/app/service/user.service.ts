import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ISelletLogin, IUserSignUp } from '../interface/seller-details';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //API_URL = 'https://ecomm-pearl-phi.vercel.app';
  //API_URL = 'http://localhost:3000'; 
  //API_URL = 'https://api.jsonbin.io/v3/b/6860d43c8960c979a5b37ec2';
  API_URL  = 'https://api.jsonbin.io/v3/b/6860d43c8960c979a5b37ec2';
  MASTER_KEY = '$2a$10$d8jUJPX5oYZKLv1ImkiNmur76JC2.RujA/KrrKi1AMUvchJNulZnG';
  
  invalidUserAuth = new EventEmitter<boolean>(false); 
  constructor(private _http: HttpClient, private router: Router) { }
  /*userSignUp(user: IUserSignUp){
    debugger;
    console.log(user);
    this._http.post(`${this.API_URL}/users`, user, {observe: 'response'})
    .subscribe((result) => {
      console.log('After user registration, result is: ',result);
      localStorage.setItem('user',JSON.stringify(result.body));
      this.router.navigate(['/']);
    });
  }*/
 //*******************To post data to other server deployed to JSONBIN.io */
 userSignUp(user: IUserSignUp){
    debugger;
    console.log(user);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Master-Key': this.MASTER_KEY
    });
    return this._http.post(`${this.API_URL}`, user, {
      headers: headers,
      observe: 'response'
    }).subscribe((result) => {
      debugger;
      console.log('After user registration, result is: ',result);
      localStorage.setItem('user',JSON.stringify(result.body));
      this.router.navigate(['/']);
    })
 }
 //*************************post data end */
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
  userLogin(data: ISelletLogin){
    debugger
    return this._http.get<IUserSignUp>(`${this.API_URL}/users?userEmailId=${data.username}&userPassword=${data.password}`, {observe: 'response'});
  }
}
