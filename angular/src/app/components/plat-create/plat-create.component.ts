import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { UtilisateurService } from '../../services/utilisateur.service';
@Component({
  selector: 'app-plat-create',
  templateUrl: './plat-create.component.html',
  styleUrls: ['./plat-create.component.sass']
})
export class PlatCreateComponent implements OnInit {

  platForm!: FormGroup;
  submitted = false;
  message :string;
  constructor(private utilisateurService: UtilisateurService,private formBuilder: FormBuilder,private router: Router) {
     this.message = '';
  }

  ngOnInit(): void {
    this.platForm = this.formBuilder.group({
      designation: [null, [Validators.required]],
      prixAchat: [null, [Validators.required]],
      prixVente:[null, [Validators.required]]
    });
  }

   
  onSubmitForm() {
    const headers = { 'Authorization': '' + localStorage.getItem("token") };
    this.utilisateurService.createPlat(this.platForm.value,headers)
      .subscribe({
        next: (res) => {
            this.message = res['message']; 
        },
        error: (e) => console.error(e)
      });
      setTimeout(() => {
        this.message = "";
      }, 3000);
  }
  
}
