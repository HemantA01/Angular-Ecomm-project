import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { ISelletLogin, IUserSignUp } from '../interface/seller-details';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //API_URL = 'https://ecomm-pearl-phi.vercel.app';
  //API_URL = 'http://localhost:3000'; 
  //API_URL = 'https://api.jsonbin.io/v3/b/6860d43c8960c979a5b37ec2';
  private readonly API_URL  = 'https://api.jsonbin.io/v3/b/6860d43c8960c979a5b37ec2';
  //API_URL  = 'https://api.jsonbin.io/v3/b';
  private readonly MASTER_KEY = '$2a$10$d8jUJPX5oYZKLv1ImkiNmur76JC2.RujA/KrrKi1AMUvchJNulZnG';
  private readonly headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Master-Key': this.MASTER_KEY
    });
  
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
 //*******************To post data to other server deployed to JSONBIN.io */    //not working
 getSellerDetails() : Observable<any>{    //This function is added to fetch all records from JSON file and then insert/update record in JSONBIN.io
  debugger;
  /*return this._http.get<any>(this.API_URL,{ headers: this.headers }).pipe(
    map(response => response.record.seller)
  ); */    // Commented as demo to get fetch the records in "Seller" section in JSON file deploted in JSONBIN.io
  return this._http.get<any>(this.API_URL,{ headers: this.headers }); // this line is used to insert record in JSON file deployed in JSONBIN.io
 }
 //userSignUp(user: IUserSignUp){ //Commented as it is used to insert record in ecomm.json file on local
 userSignUp(user: any){   //  this line is used to insert record in JSON file deployed in JSONBIN.io
// userSignUp(user: any) : Observable<any>{
    debugger;
      console.log(user);
    /*return this._http.post(`${this.API_URL}`, user, {
      headers,
      observe: 'response'
    }).subscribe((result) => {
      debugger;
      console.log('After user registration, result is: ',result);
      localStorage.setItem('user',JSON.stringify(result.body));
      this.router.navigate(['/']);
    })*/    //Commented as it is used to insert record in ecomm.json file on local
   
   return this.getSellerDetails().pipe(   // this set of code is used to insert record in JSON file deployed in JSONBIN.io
    switchMap((res: any) => {
      debugger;
      const data = res.record;
      const updateSeller = [...(data.users || []), user];
      const updatedJson = {...data, seller: updateSeller};

     return this._http.put(`${this.API_URL}`,updatedJson, { headers: this.headers })
    })
   ).subscribe((result) => {
          debugger;
          console.log('New record inserted: ',result);
          //next: res => console.log('success',res),
          //error: err => console.log('error',err)
        });

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
