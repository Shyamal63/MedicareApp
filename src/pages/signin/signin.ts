import { Component } from '@angular/core';
import {NavController, NavParams, AlertController } from 'ionic-angular';

//providers
import {UserServiceProvider} from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';
import {ListPage} from '../list/list';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class LoginPage {
  public userid:any;
  public password:any;
  public expdate :any;
  public authkey:any;
  public username:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public userService:UserServiceProvider, public alertCtrl: AlertController) {
    this.expdate = this.formatLocalDate();
    this.authkey=""
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  forgetPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Forget Password',
      message: "Enter your Username or Email Id to reset your Password",
      cssClass: "forgetPrompt",
      inputs: [
        {
          name: 'title',
          placeholder: 'Email Id / Username'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  presentAlert(title,text){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {text: 'Cancel',
        handler: () => {
          this.userid='';
          this.password='';
        }
      }
      ]
    });
    alert.present();
  }
 
  goLogin(){
    this.userService.userlogin(this.userid, this.password,this.authkey,this.expdate).subscribe((response:any)=>{

      if(response){
        console.log(response);
        /*console.log("1 res")
        if(response.ok ==false){
          console.log(response);
        }else{
          localStorage.setItem('login',"true");
          this.navCtrl.setRoot(ListPage,{data:response});
        }*/
        if(response[0].username == 0){
          this.presentAlert("Error","Username/Password invalid")
        }else{
          localStorage.setItem('login',"true");
          this.navCtrl.setRoot(ListPage,{data:response});
        }
      }
      
    });
  
  }

  formatLocalDate() {
    var now = new Date(),
        tzo = -now.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return now.getFullYear() 
        + '-' + pad(now.getMonth()+1)
        + '-' + pad(now.getDate() +1)
        + 'T' + pad(now.getHours())
        + ':' + pad(now.getMinutes()) 
        + ':' + pad(now.getSeconds()) 
				+ '.000Z'
}

}
