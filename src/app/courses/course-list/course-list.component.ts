import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  constructor(private courseService: CourseService) { }
  errorMessage: string;
  courses: Course[];
  ngOnInit() {
  }

  getCourses() {
    const retVal = this.courseService.getCourses().subscribe(
      courses => {
        console.log(courses);
      },
      error => this.errorMessage = <any>error
    );
  }
}
