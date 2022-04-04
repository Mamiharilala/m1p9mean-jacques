import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import{environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }
  
  create(data: any): Observable<any> {
     return this.http.post(environment.url+"utilisateur/client", data);
  }

  login(data: any): Observable<any> {
     return this.http.post(environment.url+"utilisateur/login", data);
  }

}
