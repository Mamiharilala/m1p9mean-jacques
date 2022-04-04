import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { UtilisateurService } from '../../services/utilisateur.service';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.sass']
})
export class InscriptionComponent implements OnInit {
  typePassword: string;
  inscriptionForm!: FormGroup;
  submitted = false;
  constructor(private utilisateurService: UtilisateurService,private formBuilder: FormBuilder,private router: Router) {
    this.typePassword = "password";
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
    this.utilisateurService.create(this.inscriptionForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
      
  }
  
}
