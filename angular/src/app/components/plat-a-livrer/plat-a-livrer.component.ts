import { Component, OnInit } from '@angular/core';
import { PlatService } from '../../services/plat.service';
import { UtilisateurService } from '../../services/utilisateur.service';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-plat-a-livrer',
  templateUrl: './plat-a-livrer.component.html',
  styleUrls: ['./plat-a-livrer.component.sass']
})
export class PlatALivrerComponent implements OnInit {
  platListe: any[] = [
    // vos FaceSnap ici
  ];
  message: string;
   
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private utilisateurService: UtilisateurService) {
     
    this.message = "";
  }

  ngOnInit(): void {
    const headers = { 'Authorization': '' + localStorage.getItem("token") };
    this.utilisateurService.getPlatALivrer(headers).subscribe(res => {
      this.platListe = res['data'];
      console.log(this.platListe);
    });
  }
  onLivrer(i: any) {
    var body = {   "idcommande": i };
    const headers = { 'Authorization': '' + localStorage.getItem("token") };
    this.utilisateurService.livrerPlat(body,  headers ).subscribe(data => {
      this.message = data['message'];
      console.log(data);
    });
    setTimeout(() => {
      this.message = "";
    }, 3000);
  }

}
