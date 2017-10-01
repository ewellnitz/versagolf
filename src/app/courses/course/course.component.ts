import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  teeTypes: Array<TeeType> = [];
  course: Course = <Course>{};
  private id: any;
  constructor(private route: ActivatedRoute,
    private router: Router, private courseService: CourseService) {
    // create teetypes
    this.teeTypes.push({ id: 1, name: 'Black', selected: false });
    this.teeTypes.push({ id: 2, name: 'Blue', selected: false });
    this.teeTypes.push({ id: 3, name: 'Gold', selected: false });
    this.teeTypes.push({ id: 4, name: 'Green', selected: false });
    this.teeTypes.push({ id: 5, name: 'Red', selected: false });
    this.teeTypes.push({ id: 6, name: 'White', selected: false });
    this.teeTypes.push({ id: 7, name: 'Yellow', selected: false });
  }

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
      .subscribe(course => {
        this.setEditCourse(course);
      },
      error => {
        console.error(error);
      });
  }

  private setEditCourse(course: Course) {
    if (course) {
      this.course = course;
      // since all holes should have the same tee types, only inspect the first hole
      const hole = this.course.holes[0];

      // select tee types based on existing holes
      this.teeTypes.forEach((teeType) => {
        // find the hole tee for this hole
        const value = hole.holeTees.find(holeTee => holeTee.teeTypeId === teeType.id);
        if (value !== undefined) {
          teeType.selected = true;
        }
      });
      // this.editChara cter = this.entityService.clone(this.character);
    } else {
      // this.gotoCharacters();
    }
  }

  public onTeeTypeChange(teeType) {

    // loop through holes
    this.course.holes.forEach((hole) => {

      // find the holeTee associcated with the selected id
      const value = hole.holeTees.find(holeTee => holeTee.teeTypeId === teeType.id);

      // if the tee type is not selected, remove the holeTee
      if (!teeType.selected) {
        if (value !== undefined) {
          const index = hole.holeTees.indexOf(value);
          hole.holeTees.splice(index, 1);
        }
      // if the tee type is selected but we dont have a holeTee, add one
      } else if (value === undefined) {
        hole.holeTees.push({
          holeId: hole.id,
          id: -1,
          teeTypeId: teeType.id,
          length: 300,
          latitude: this.course.latitude,
          longitude: this.course.longitude
        });
      }

    });
  }
}

class TeeType {
  public id: number;
  public name: string;
  public selected: boolean;
}
