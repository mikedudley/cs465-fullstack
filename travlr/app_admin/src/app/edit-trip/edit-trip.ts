
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {

  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripData
  ) {}

  ngOnInit(): void {

    // Retrieve the trip code stored by the Trip Card component
    let tripCode = localStorage.getItem('tripCode');

    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTrip::ngOnInit');
    console.log('tripCode: ' + tripCode);

    // Initialize the edit form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Retrieve the existing trip from the Express API
    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: Trip[]) => {

          if (!value || value.length === 0) {
            this.message = 'No Trip Retrieved!';
            console.log(this.message);
            return;
          }

          // Store the retrieved trip
          this.trip = value[0];

          // Populate the form with existing trip information
          this.editForm.patchValue(value[0]);

          this.message = 'Trip: ' + tripCode + ' retrieved';
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ', error);
          this.message = 'Error retrieving trip';
        }
      });
  }

  // Submit the updated trip to the Express API
  public onSubmit(): void {

    this.submitted = true;

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: (value: Trip) => {
            console.log(value);

            // Return to the trip listing after saving
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ', error);
            this.message = 'Error updating trip';
          }
        });
    }
  }

  // Shortcut for accessing form fields in the HTML template
  get f() {
    return this.editForm.controls;
  }
}
