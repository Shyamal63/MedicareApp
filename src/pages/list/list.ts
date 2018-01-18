import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,PopoverController } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard'

import {UserServiceProvider} from '../../providers/user-service/user-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  
  public patientlist:any;

  public othermenu:boolean;
  public toggled: boolean = false;

  constructor(public navCtrl: NavController,public popoverCtrl: PopoverController, public navParams: NavParams,public loadingCtrl:LoadingController, public userService:UserServiceProvider) {
         this.toggled=false;
    /*if(window.innerWidth >= 768){
      this.othermenu = false;
    }else{
      this.othermenu = true;
    }*/
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();


    this.initializeItems();
    loading.dismiss();
   
}
initializeItems() {
  let res = this.navParams.get('data');
  console.log(res[0]);
 this.userService.getList(res[0].AuthtokenKey, res[0].id).subscribe((response:any)=>{
  this.patientlist = response;
  console.log(response);
})
}
toLowerCase(){
  
}
  getItems(ev) {
    // this.initializeItems();
    let val = ev.target.value;
    console.log(val);
    if (val && val.trim() != '') {
      this.patientlist = this.patientlist.filter((item) => {
        return (item.FirstName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      this.initializeItems();
      console.log(this.initializeItems());
    } 
  }
  public toggle(): void {
    this.toggled = true;
    console.log('hiiii');
 }

 test(event){
  this.toggled = false;
  console.log('hello');
  this.initializeItems();
 }
}

 












