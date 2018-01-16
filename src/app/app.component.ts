import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from "../pages/signin/signin";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any =LoginPage;

  pages: Array<{title: string, component: any}>;
  public sidemenuhide:boolean;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    localStorage.removeItem('login');
    
   this.sidemenuhide=true;

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: HomePage },
      { title: 'Surveys', component: HomePage },
      { title: 'Ring Central', component: HomePage },
      { title: 'Profile', component: HomePage },
      { title: 'Setting', component: HomePage },
      { title: 'Help & FAQ', component: HomePage }
    ];
    

  }
  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')) {
       // console.log("cordova platform found..!!")
        this.statusBar.styleDefault();
        this.splashScreen.hide();
       // this.sidemenuhide=false;
      } else {
       // console.log("cordova platform found..!!")
       // this.sidemenuhide=true;
        //this.menu.close();
        // handle thing accordingly
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout(){
    localStorage.removeItem('login');
    //this.menu.close();
    this.nav.setRoot(LoginPage);
  }
   ngDoCheck(){
    let loginData = localStorage.getItem('login');
    if(loginData){
      this.sidemenuhide=false;
    }else{
        this.sidemenuhide=true;
    }
  }
}


