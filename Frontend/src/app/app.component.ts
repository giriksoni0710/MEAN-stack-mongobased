import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  message = '';
  messages = [];
  userName = '';

  constructor(private http: HttpClient){
    // this.http.get('http://localhost:3000/api/message').toPromise();

  }

 async ngOnInit() {

   this.messages = (this.http.get('http://localhost:3000//message').toPromise()) as any;



  }

  // ngOnInit () {


  // }
  post() {

    // console.log();

    this.http.post('http://localhost:3000/api/message', { msg : this.message, username: this.userName}).toPromise();
  }
}
