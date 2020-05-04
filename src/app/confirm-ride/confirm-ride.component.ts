import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '@app/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-ride',
  templateUrl: './confirm-ride.component.html',
  styleUrls: ['./confirm-ride.component.less']
})
export class ConfirmRideComponent implements OnInit {
  source: any
  destination: any

  lat: Number = 17.4699
  lng: Number = 78.3578
  zoom: number = 6

  constructor(private _location: Location, private dataService: DataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.source = this.dataService.getOption().source
    this.destination = this.dataService.getOption().destination
    console.log('map origin and direction: ', this.source, this.destination)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  goBack() {
    this._location.back()
  }

}
