import { Place } from "../models/place";
import { Location } from "../models/location";

import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { Injectable } from "@angular/core";

@Injectable()
export class PlacesService {
    private places: Place[] = [];

    constructor(private storage: Storage, private file: File) { }

    addPlace(title: string, descriprion: string, location: Location, imageUrl: string) {
        const place = new Place(title, descriprion, location, imageUrl);
        this.places.push(place);
        this.storage.set('places', this.places)
            .then()
            .catch(
            err => {
                this.places.splice(this.places.indexOf(place), 1);
            }
            )
    }

    loadPlaces() {
        return this.places.slice();
    }

    fetchPlaces() {
        this.storage.get('places')
            .then(
            (places: Place[]) => {
                this.places = places != null ? places : [];
            })
            .catch( 
            err => console.log(err)
            );
    }

    deletePlace(index: number) {
        const place = this.places[index];
        this.places.splice(index, 1);
        this.storage.set('places', this.places)
            .then(
                () => {
                    this.removeFile(place);
                }
            )
            .catch(
                err => console.log(err)
            )
    }

    private removeFile(place: Place) {
        const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
        this.file.removeFile(this.file.dataDirectory, currentName)
            .then(
                () => console.log('Arquivo removido')
            )
            .catch(
                () => {
                    console.log('Erro ao remover o arquivo');
                    this.addPlace(place.title, place.description, place.location, place.imageUrl);
                }
            )

            ;
    }
}