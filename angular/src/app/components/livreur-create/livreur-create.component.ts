import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { UtilisateurService } from '../../services/utilisateur.service';
@Component({
  selector: 'app-livreur-create',
  templateUrl: './livreur-create.component.html',
  styleUrls: ['./livreur-create.component.sass']
})
export class LivreurCreateComponent implements OnInit {
  typePassword: string;
  inscriptionForm!: FormGroup;
  submitted = false;
  message :string;
  constructor(private utilisateurService: UtilisateurService,private formBuilder: FormBuilder,private router: Router) {
    this.typePassword = "password";
    this.message = '';
  }

  ngOnInit(): void {
    this.inscriptionForm = this.formBuilder.group({
      nom: [null, [Validators.required]],
      prenom: [undefined],
      date_naissance:[undefined],
      contact: [null, [Validators.required]],
      mot_passe: [null, [Validators.required]],
      email: [null, [Validators.required]],
      adresse: [null, [Validators.required]],
      location: [undefined]
    });
  }

  onClickShowPassword(): void {
    if (this.typePassword == "text") {
      this.typePassword = "password";
    } else {
      this.typePassword = "text";
    }
  } 
  onSubmitForm() {
    const headers = { 'Authorization': '' + localStorage.getItem("token") };
    this.utilisateurService.createLivreur(this.inscriptionForm.value,headers)
      .subscribe({
        next: (res) => {
           this.submitted = true;
           this.message = res['message']; 
        },
        error: (e) => console.error(e)
      });
      setTimeout(() => {
        this.message = "";
      }, 3000);
  }
  
}
