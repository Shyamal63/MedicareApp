import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
   public dashboardlist: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let data = this.navParams.get('data');
    console.log(data);
    if(data){
      this.dashboardlist=data;
    }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  

}
