import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  comment: string = ''
  modelName: string = 'CNB'
  prediction: string = ''
  waitMessage: string = ''

  constructor(private httpClient: HttpClient){}

  onPredict(){
    // console.log({comment: this.comment, modelName: this.modelName})
    this.prediction = ''
    this.waitMessage = 'Calcul en cours. Patientez svp...'

    this.httpClient
    .post('https://feelings-prediction-api.onrender.com/',
            {comment: this.comment, modelName: this.modelName})
    .subscribe({
      next: (value)=>{
        this.waitMessage = ''
        this.prediction = String(value)
      },
      error: (err)=>{
        console.log('Erreur lors de la prédiction:', err)
      }
    })
  }
}
