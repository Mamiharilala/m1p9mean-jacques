import { Injectable } from '@angular/core';
import{Utilisateur}from '../models/utilisateur.model';
import { HttpClient ,HttpHeaders,HttpErrorResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class PlatService {
   restaurantListe: Utilisateur[] = [
    // vos FaceSnap ici
  ]
  constructor(private http: HttpClient) { }
   
 
  getAll(header:any) :Observable<any>{
     return this.http.get(environment.url+"plat",{headers: new HttpHeaders(header)});
    //return this.http.get(environment.url+"restaurant/plats",{headers: new HttpHeaders(header)});
  }

  getAllNotAssigned(headers:any) :Observable<any>{
    return this.http.get(environment.url+"plat/commandesnotassigned",headers);
  }
  changerVisilite(data: any, header: any): Observable<any> {
    return this.http.put<any>(environment.url + "plat/update", data, {headers: new HttpHeaders(header)});
  }
 
  
}