import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  typePassword: string;
  loginForm!: FormGroup;
  message: string;
  constructor(private utilisateurService: UtilisateurService, private formBuilder: FormBuilder, private router: Router) {
    this.typePassword = "password";
    this.message = "";
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      contact: [null, [Validators.required]],
      mot_passe: [null, [Validators.required]]
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
    console.log(this.loginForm.value);
    this.utilisateurService.login(this.loginForm.value)
      .subscribe({
        next: (res) => {
          if (res['data']['utilisateur'] && res['data']['profil']) {
            localStorage.setItem('token', res['data']['utilisateur']['token']);
            var role = res['data']['profil'][0]['designation'];
            localStorage.setItem('role', role);
            if(role=="Restaurant"){
              this.router.navigateByUrl("/"+localStorage.getItem('role')+"/benefice-restaurant");
            }else if(role=="Livreur"){
              this.router.navigateByUrl("/"+localStorage.getItem('role')+"/plat-a-livrer");
            }else if(role=="Client"){
              this.router.navigateByUrl("/"+localStorage.getItem('role')+"/plat-liste");
            }else{
              this.router.navigateByUrl("/"+localStorage.getItem('role')+"/commande-livreur");
            }
           }else{
            this.onErrorAuth();
          }
        },
        error: (e) =>  {
          this.onErrorAuth();
         }
      });

  }
  onErrorAuth(){
    this.message = "Donnée d'authentification incorrecte";
    setTimeout(() => {
      this.message = "";
     }, 3000);
  }
}
