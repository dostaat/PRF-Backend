import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ElementRef } from '@angular/core';


/**
 * Generated class for the NewCityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-city',
  templateUrl: 'new-city.html'

})
export class NewCityPage {
  newCityName :any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCityPage');
  }
  AddCity(){
    var input = document.getElementById('cityName').getElementsByTagName('input')[1];
    
    console.log((this.newCityName));

  }

}
