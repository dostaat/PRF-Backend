import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Cities } from '../../_modules/cities';
import { HttpClient } from '@angular/common/http';
import { not } from '@angular/compiler/src/output/output_ast';
import { appConfig } from '../../app/app.config'
import {NameConvert} from '../../Utils/nameConverter';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  cities: Cities[] = [];
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient, public nC: NameConvert) {
    this.selectedItem = navParams.get('item');
    this.loadAllCities();
  }
  private loadAllCities() {
    this.http.get<Cities[]>(appConfig.apiUrl + '/cities').subscribe(cities => { 
        this.cities = cities;
        this.orderCitiesByPoints();
        console.log(this.cities);
    });
  }

  private orderCitiesByPoints() {
      this.cities.sort((city1, city2) => {
          return (city2.point - city1.point);
      })
  }
}
