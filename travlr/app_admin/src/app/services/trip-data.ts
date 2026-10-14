import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';


@Injectable({
  providedIn: 'root'
})
export class TripData {

  // API endpoint shared by all methods
  private url = 'http://localhost:3000/api/trips';
  baseUrl = 'http://localhost:3000/api';

  
  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  
  public handleAuthAPICall(
    endpoint: string,
    user: User,
    passwd: string
  ): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(
      this.baseUrl + '/' + endpoint,
      formData
    );
  }


  
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}


  // GET: Retrieve all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  
  // POST: Add a new trip
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(
      this.url,
      formData
    );
  }

  // PUT: Update an existing trip
  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      this.url + '/' + formData.code,
      formData
    );
  }


  
  getTrip(tripCode: string): Observable<Trip[]> {
    // console.log('Inside TripDataService: getTrips');
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }


}
