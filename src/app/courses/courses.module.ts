import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course/course.component';
import { CourseService } from './course.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoursesRoutingModule
  ],
  declarations: [CoursesComponent, CourseListComponent, CourseComponent],
  providers: [CourseService]
})
export class CoursesModule { }
