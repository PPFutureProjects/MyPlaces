import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Geolocation } from "@ionic-native/geolocation";
import { SetLocationPage } from "../set-location/set-location";
import { Location} from "../../models/location";

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: -21.1995766,
    lng: -47.8254043
  };

  locationIsSet = false;

  constructor(private modalCtrl: ModalController, private geolocation: Geolocation) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
          console.log(this.location);
        }
      }
    );
  }

  onLocate() {
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
  }

}
