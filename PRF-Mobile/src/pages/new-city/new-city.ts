import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HttpClient} from "@angular/common/http";
import {appConfig} from "../../app/app.config";
import { NameConvert } from "../../Utils/nameConverter";
import { Cities } from "../../_modules/cities";
import { AlertController } from 'ionic-angular';


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

export class NewCityPage implements OnInit {
  newCityObj: Cities;
  newCityName : string;  
  xcoord: number;
  ycoord: number;

  constructor(
    public navCtrl: NavController, 
    private http: HttpClient, 
    public navParams: NavParams, 
    private storage: Storage, 
    public nC: NameConvert,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.storage.get("gpsPos").then(
      (gP) => {        
        this.xcoord = gP.x_coord;
        this.ycoord = gP.y_coord;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewCityPage');
  }

  AddCity(){
    //var input = document.getElementById('cityName').getElementsByTagName('input')[1];
        
    console.log(this.nC.toLower(this.newCityName));
    console.log(this.xcoord);
    console.log(this.ycoord);
    this.newCityObj = new Cities();
    this.newCityObj.name = this.nC.toLower(this.newCityName);
    this.newCityObj.x_coordinate = this.xcoord;
    this.newCityObj.y_coordinate = this.ycoord;
    console.log("About to send the request to the server");
    this.http.post<Cities>(appConfig.apiUrl + "/cities",this.newCityObj).subscribe( 
      respond => { 
        console.log(respond)
        this.presentAlert(this.newCityName);
      });
    
  }

  presentAlert(cityName) {
    let alert = this.alertCtrl.create({
      title: 'City created',
      subTitle: "Successfully added " + cityName + " to the database",
      buttons: [ {
        text: 'OK'        
      }]
    });
    alert.present();
  }

}
