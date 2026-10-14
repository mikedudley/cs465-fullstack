import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from './trip-data';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
    private tokenKey = 'travlr-token';
    private authResp!: AuthResponse;

    constructor(
        @Inject(BROWSER_STORAGE) private storage: Storage,
        private tripDataService: TripData
    ) {}

  
    public saveToken(token: string): void {
        this.storage.setItem(this.tokenKey, token);
    }

    public getToken(): string | null {
        return this.storage.getItem(this.tokenKey);
    }

    public logout(): void {
        this.storage.removeItem(this.tokenKey);
    }

    
    public isLoggedIn(): boolean {
        const token = this.getToken();

        if (!token) {
            return false;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } catch (error) {
            return false;
        }
    }

    
    public getCurrentUser(): User | null {
        const token = this.getToken();

        if (!token || !this.isLoggedIn()) {
            return null;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));

            const user = new User();
            user.email = payload.email;
            user.name = payload.name;

            return user;
        } catch (error) {
            return null;
        }
    }

    
    public login(user: User, passwd: string): void {
        this.tripDataService.login(user, passwd)
            .subscribe({
            next: (value: AuthResponse) => {
                if (value) {
                this.authResp = value;
                this.saveToken(this.authResp.token);
                }
            },
            error: (error: any) => {
                console.log('Error: ' + error);
            }
            });
    }

    
    public register(user: User, passwd: string): void {
        this.tripDataService.register(user, passwd)
            .subscribe({
            next: (value: AuthResponse) => {
                if (value) {
                this.authResp = value;
                this.saveToken(this.authResp.token);
                }
            },
            error: (error: any) => {
                console.log('Error: ' + error);
            }
            });
    }



}
