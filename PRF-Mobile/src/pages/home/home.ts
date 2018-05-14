import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { appConfig } from '../../app/app.config';
import {HttpClient} from "@angular/common/http";
import { Cities } from '../../_modules/cities';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {
  gpsPos: any = {};
  nearbyCities: Cities[];  
  selectedCity = null;
  constructor(public navCtrl: NavController, private geolocation: Geolocation, private http: HttpClient, private storage: Storage) {
    console.log(http);
  }  

  ngOnInit() {
    
    this.geolocation.getCurrentPosition().then((resp) => {
      this.gpsPos.x_coord = resp.coords.latitude;
      this.gpsPos.y_coord = resp.coords.longitude;      
      console.log("Mindjárt küldjük");
      console.log(appConfig.apiUrl + "/cities/getClosest");      
      this.http.post<Cities[]>(appConfig.apiUrl + "/cities/getClosest",this.gpsPos).subscribe( cities => { this.nearbyCities = cities});
      console.log("A kérés biza elment");
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     this.storage.get("selectedCity").then( (selectedCity) => {
      this.selectedCity = selectedCity;
      });
  }

  itemSelected(city) {
    console.log("set storage city");
    this.storage.set("selectedCity",city.name);
    this.selectedCity = city.name;
    console.log(city.name);
  }
}
