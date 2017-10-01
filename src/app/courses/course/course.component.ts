import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  private id: any;
  private course: Course;
  constructor(private route: ActivatedRoute,
    private router: Router, private courseService: CourseService) { }

  ngOnInit() {
    this.route
      .params
      .map(params => params['id'])
      .do(id => this.id = +id)
      .subscribe(id => this.getCourse());
  }

  private isAddMode(): boolean {
    return false;
  }

  private getCourse() {
    if (this.id === 0) { return; }
    if (this.isAddMode()) {
      // this.character = <Course>{ name: '', side: '' };
      // this.editCharacter = this.entityService.clone(this.character);
      return;
    }
    this.courseService.getCourse(this.id)
      .subscribe( course => {
        this.setEditCourse(course);
      },
      error => {
        console.error(error);
      });
  }

  private setEditCourse(course: Course) {
    if (course) {
      this.course = course;
      console.log(course);
      // this.editChara cter = this.entityService.clone(this.character);
    } else {
      // this.gotoCharacters();
    }
  }


}
