import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';

import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';

import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard ],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripData]
})

export class TripListing implements OnInit {

  trips!: Trip[];
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private authenticationService: Authentication,
    private cdr: ChangeDetectorRef
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private getStuff(): void { 
    this.tripData.getTrips() 
      .subscribe({
        
        next: (value: Trip[]) => {
          this.trips = value;

          if (value.length > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          } else {
            this.message = 'There were no trips retrieved from the database';
          }

          console.log(this.message);

          // Tell Angular to refresh the displayed trip cards.
          this.cdr.detectChanges();
        },     
        error: (error: any) => {           
          console.log('Error: ' + error);         
        }       
      })   
  } 

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
