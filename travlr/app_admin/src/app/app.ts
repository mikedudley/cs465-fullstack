import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripListing } from './trip-listing/trip-listing';
import { Navbar } from './navbar/navbar';


@Component({
  imports: [RouterOutlet, CommonModule, TripListing, Navbar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Travlr Getaways Admin!');
}
