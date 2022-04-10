import { Component, OnInit } from '@angular/core';
import { PlatService } from '../../services/plat.service';
import { UtilisateurService } from '../../services/utilisateur.service';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-commande-en-cours',
  templateUrl: './commande-en-cours.component.html',
  styleUrls: ['./commande-en-cours.component.sass']
})
export class CommandeEnCoursComponent implements OnInit {
  commandeListe: any[] = [
    // vos FaceSnap ici
  ];
  message: string;
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private utilisateurService: UtilisateurService) { 
    this.message = "";
  }

  ngOnInit(): void {
    const headers = { 'Authorization': '' + localStorage.getItem("token") };
    this.utilisateurService.getCommandeEnCours(headers).subscribe(res => {
      this.commandeListe = res['data'];
       console.log(res['data']);
    });
  }

}
