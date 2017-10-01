import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../../models/course';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor(private courseService: CourseService, private authSerivce: AuthService) { }
  errorMessage: string;
  courses: Course[] = [];
  ngOnInit() {
  }

  getCourses() {
    console.log(this.authSerivce.getToken());
    this.courses = [];
    const retVal = this.courseService.getCourses().subscribe(
      courses => {
        this.courses = courses;
        console.log(courses);
      },
      error => {
        console.error(error);
        this.errorMessage = <any>error;
      }
    );
  }
}
