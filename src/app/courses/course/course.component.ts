import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../../models/course';
import { TeeType, Hole, HoleLocationType } from '../../models/course';
// import { LatLng, AgmMarker } from '@agm/core';
import { GeoLocation } from '../../models/geo-location';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  teeTypes: Array<TeeTypeData> = [];
  course: Course = <Course>{};
  markers: Array<Marker> = [];
  currentHole: Hole;
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

  private clearMarkers(): void{
    this.markers = [];
  }

//   private getLatLng(location: GeoLocation) {
//     return new LatLng(location.latitude, location.longitude);
// }

  private setMarkers(): void {

    // clear markers
    this.clearMarkers();

    // expand to include hole locaitons
    this.currentHole.holeLocations.forEach(location => {
      // let position = this.getLatLng(location);
      const marker: Marker = {
        latitude: location.latitude,
        longitude: location.longitude,
        label: '',
        draggable: true,
        iconUrl: 'assets/images/marker_flag.png'
      };

      // create location marker
      // var image: AgmIcon = {};
      // if (location.holeLocationTypeId === HoleLocationType.GreenCenter) {
      //   image.url = "assets/images/marker_flag.png";
      //   image.anchor = new google.maps.Point(31, 48);
      // } else {
      //   image.url = "assets/images/marker_hazard.png";
      //   image.anchor = new google.maps.Point(25, 48);
      // }


      this.markers.push(marker);

      // google.maps.event.addListener(marker,
      //   "dragend",
      //   event => {
      //     var latLng: google.maps.LatLng = event.latLng;
      //     location.latitude = latLng.lat();
      //     location.longitude = latLng.lng();
      //   });
    });

    // expand to include tee
    // var tee = this.currentHole.holeTees[0];

    // //create tee marker
    // const position = this.getLatLng(tee);
    // const marker = new google.maps.Marker({
    //   position: position,
    //   map: this.map,
    //   icon: "assets/images/marker_tee.png",
    //   draggable: true
    // });
    // google.maps.event.addListener(marker,
    //   "dragend",
    //   event => {
    //     var latLng: google.maps.LatLng = event.latLng;
    //     tee.latitude = latLng.lat();
    //     tee.longitude = latLng.lng();
    //   });

    // this.markers.push(marker);
  }

  private setEditCourse(course: Course) {
    if (course) {
      this.course = course;
      // since all holes should have the same tee types, only inspect the first hole
      const hole = this.course.holes[0];

      // select tee types based on existing holes
      this.teeTypes.forEach((teeType) => {
        // find the hole tee for this hole
        const value = hole.holeTees.find(holeTee => holeTee.teeTypeId === teeType.name);
        if (value !== undefined) {
          teeType.selected = true;
        }
      });

      this.currentHole = this.course.holes[0];
      this.setMarkers();
      // this.editChara cter = this.entityService.clone(this.character);
    } else {
      // this.gotoCharacters();
    }
  }

  public onTeeTypeChange(teeType) {

    // loop through holes
    this.course.holes.forEach((hole) => {

      // find the holeTee associcated with the selected id
      const value = hole.holeTees.find(holeTee => holeTee.teeTypeId === teeType.name);

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
          teeTypeId: teeType.name,
          length: 300,
          latitude: this.course.latitude,
          longitude: this.course.longitude
        });
      }

    });
  }
}

class TeeTypeData {
  public id: number;
  public name: string;
  public selected: boolean;
}

// just an interface for type safety.
class Marker {
  latitude: number;
  longitude: number;
  label?: string;
  draggable: boolean;
  iconUrl: string;
}
