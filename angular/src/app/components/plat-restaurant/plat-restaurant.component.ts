import { Component, OnInit, Input } from '@angular/core';
import { PlatService } from '../../services/plat.service';
import { UtilisateurService } from '../../services/utilisateur.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-plat-restaurant',
  templateUrl: './plat-restaurant.component.html',
  styleUrls: ['./plat-restaurant.component.sass']
})
export class PlatRestaurantComponent implements OnInit {
  platListe: any[] = [
    // vos FaceSnap ici
  ];
   
  message: string;
  platForm!: FormGroup;
  constructor(private http: HttpClient,  private route: ActivatedRoute,private platService: PlatService, private formBuilder: FormBuilder, private utilisateurService: UtilisateurService) {
    this.platForm = this.formBuilder.group({
      quantite: [null]
    });
    this.message = "";
  }
  ngOnInit(): void {
    const headers = { 'Authorization': '' + localStorage.getItem("token") };
    this.platService.getAll(headers).subscribe(res => {
      this.platListe = res['data'];
      console.log(res['data']);
    });
  }
  onBuyPlat(i: any) {
    var body = { "quantite": this.platForm.value.quantite, "id_plat": this.platListe[i].id };
    const headers = { 'Authorization': '' + localStorage.getItem("token") };
    this.utilisateurService.buyPlat(body, { headers }).subscribe(data => {
      this.message = data['message'];
    });
    setTimeout(() => {
      this.message = "";
    }, 3000);
  }
}