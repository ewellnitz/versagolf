import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';

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
    CoursesRoutingModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDidE4E_ydjjIH3eSKlaVtzqxuv1SLaesM'
    })
  ],
  declarations: [CoursesComponent, CourseListComponent, CourseComponent],
  providers: [CourseService]
})
export class CoursesModule { }
