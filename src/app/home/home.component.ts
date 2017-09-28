import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  getCourses() {
    // this.authService.getToken().then(token=> console.log(token));
    console.log(this.authService.getToken());
    // console.log(this.authService.getToken)
    // const retVal = this.courseService.getCourses().subscribe(
    //   courses => {
    //     console.log(courses);
    //   },
    //   error => this.errorMessage = <any>error
    // );
  }
}
