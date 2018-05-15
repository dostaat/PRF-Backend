import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Quiz } from '../../_modules/quiz';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../../app/app.config';
import { Cities } from "../../_modules/cities";
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { NameConvert } from '../../Utils/nameConverter'

@IonicPage()

@Component({
  selector: 'page-quizme',
  templateUrl: 'quizme.html',
})
export class QuizmePage {  
  quiz: Quiz;  
  lost: boolean;
  questionNum: number;
  gamePoints: number;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private storage: Storage,
    private alertCtrl: AlertController,
    private nC: NameConvert
) {
  
    this.loadRandomQuestion();
  }  

  private loadRandomQuestion() {
    this.http.get<Quiz>(appConfig.apiUrl + '/quiz/random').subscribe( quiz => { 
      this.quiz = quiz; 
      console.log(this.quiz) ;
    });
  }

  checkAnswer(ans: string) {
    if(ans === this.quiz.answer) {
      console.log("The answer is correct");
      console.log("Get the city data");
      
      this.storage.get("selectedCity").then(
        (cityName) => {        
          this.http.post<Cities>(appConfig.apiUrl + "/cities/getByName",{"name":cityName}).subscribe( currentCity => {
            console.log("City data of "+ currentCity.name + " is retrieved");
            currentCity.point += this.quiz.level;
            this.http.put(appConfig.apiUrl + "/cities",currentCity).subscribe( () => {
              console.log("and should be updated");
              this.presentCorrectAlert(currentCity.name,currentCity.point);
              this.navCtrl.setRoot(ListPage)
            })
          }
          )          
        }
      ).catch(
        () => {
          this.presentCorrectAlert(null,null);
          this.navCtrl.setRoot(ListPage)
        }
      );
    } else {
      this.presentFalseAlert();
      this.navCtrl.setRoot(ListPage)
    }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizmePage');
  }

  presentCorrectAlert(cityName, point) {
    if (cityName !== null && point !==null) {
      let alert = this.alertCtrl.create({
        title: 'Correct',
        subTitle: "The answer is correct, and " + this.nC.toFirstUpper(cityName) +"'s new score is: " + point,
        buttons: [ {
          text: 'OK'        
        }]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Correct',
        subTitle: "The answer is correct! (no city info available)",
        buttons: [ {
          text: 'OK'        
        }]
      });
      alert.present();
    }
  }

  presentFalseAlert() {
    let alert = this.alertCtrl.create({
      title: 'Wrong',
      subTitle: "The answer is wrong",
      buttons: [ {
        text: 'OK'        
      }]
    });
    alert.present();
  }

}
