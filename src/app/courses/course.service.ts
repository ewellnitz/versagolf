import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }
  getCourses(): Observable<Course[]> {

    const url = 'http://versagolf-api.azurewebsites.net/api/courses/search?courseName=a';

    // return this.http
    //   .get(url)
    //   .map((response: Response) => <Course[]>response.json())
    //   .do(data => console.log(data))
    //   .catch(this.handleError);

    return this.http.get<Course[]>(url);
  }

  private handleError(error: Response) {
    console.error(error);
    const msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }
}
