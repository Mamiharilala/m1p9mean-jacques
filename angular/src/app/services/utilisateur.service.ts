import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) {

  }

  create(data: any): Observable<any> {
    return this.http.post(environment.url + "utilisateur/client", data);
  }
  createLivreur(data: any, header: any): Observable<any> {
    return this.http.post<any>(environment.url + "utilisateur/livreur", data,{headers: new HttpHeaders(header)});
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.url + "utilisateur/login", data);
  }
  buyPlat(data: any, header: any): Observable<any> {
    return this.http.post<any>(environment.url + "utilisateur/commande", data, header);
  }
  assignLivreur(data: any, header: any): Observable<any> {
    return this.http.put<any>(environment.url + "utilisateur/commande/assign", data, {headers: new HttpHeaders(header)});
  }
  getResultList() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.get('./assets/result.json', { headers });
  }
  getLivreurs(header:any) :Observable<any>{
      return this.http.get(environment.url+"livreurs",{headers: new HttpHeaders(header)});
  }
  getPlatALivrer(header:any) :Observable<any>{
    return this.http.get(environment.url+"livreurs/platalivrer",{headers: new HttpHeaders(header)});
  }
  livrerPlat(data:any,header:any) :Observable<any>{
     return this.http.put<any>(environment.url + "plat/livrer", data, {headers: new HttpHeaders(header)});
  }
  getCommandeEnCours(header:any) :Observable<any>{
    return this.http.get(environment.url+"plat/commandesencours",{headers: new HttpHeaders(header)});
  }
}
