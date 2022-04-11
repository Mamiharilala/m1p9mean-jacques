import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('authorization', 'Barear 488550e55c8579029aabc2d583144622315bcb22');
  restaurantListe: Utilisateur[] = [
    // vos FaceSnap ici
  ]
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(environment.url + "restaurant", { headers: this.httpHeaders });
  }
  getBenefice(header: any): Observable<any> {
    return this.http.get(environment.url + "restaurant/benefice", { headers: new HttpHeaders(header) });
  }
  getBeneficeParRestaurant(header: any): Observable<any> {
    return this.http.get(environment.url + "utilisateur/beneficeparrestaurant", { headers: new HttpHeaders(header) });
  }
  getBeneficeParJour(header: any): Observable<any> {
    return this.http.get(environment.url + "utilisateur/beneficeparjour", { headers: new HttpHeaders(header) });
  }
  

}
