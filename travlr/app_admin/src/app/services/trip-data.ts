
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripData {

  // API endpoint shared by all methods
  private url = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  // GET: Retrieve all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  // POST: Add a new trip
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  
getTrip(tripCode: string): Observable<Trip[]> {
  // console.log('Inside TripDataService: getTrips');
  return this.http.get<Trip[]>(this.url + '/' + tripCode);
}

updateTrip(formData: Trip): Observable<Trip> {
  // console.log('Inside TripDataService: addTrips');
  return this.http.put<Trip>(
    this.url + '/' + formData.code,
    formData
  );
}

}
