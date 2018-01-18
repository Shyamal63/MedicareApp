//import { HttpClient } from '@angular/common/http';
//import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  public loginUrl:any;

  constructor(public http: Http) {
    console.log('Hello UserServiceProvider Provider');
    this.loginUrl = "http://rpmdevqaapi.htohnetwork.net/mobility/userlogin";

  }


  //userlogin
  userlogin(userid,password,authkey,expdate){
    let body =  {
      "userid": "Administrator",
      "password": "Admin@1234",
      "AuthtokenKey": "",
      "expiry": "2017-12-27T03:40:53.911Z"
    }
    /*
  let body =  {
       "userid": userid,
       "password": password,
       "AuthtokenKey": authkey,
       "expiry": expdate
     }
*/
  let headers = new Headers({'Content-Type': 'application/json'}); 
  let options  = new RequestOptions({ headers: headers }); 
  return this.http.post(this.loginUrl, body , options) 
                      .map((res:Response) => res.json())
                      .catch((error:any)=>Observable.of(error));
  }

  //getlists
  getList(strAuthKey, Patient_id){
    console.log(strAuthKey, Patient_id)

    let listurl = "http://rpmdevqaapi.htohnetwork.net/mobility/PatientList?strAuthToken=" + strAuthKey + " &user_id=" + Patient_id + "&sortBy=";
    //let listurl = "http://rpmdevqaapi.htohnetwork.net/mobility/PatientList?strAuthToken=0&user_id=1&sortBy=";
    let headers = new Headers({'Content-Type': 'application/json'}); 
    let options  = new RequestOptions({ headers: headers }); 
    return this.http.get(listurl, options) 
                        .map((res:Response) => res.json())
                        .catch((error:any)=>Observable.of(error));
  }

}
