import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-ekaly',
  templateUrl: './nav-bar-ekaly.component.html',
  styleUrls: ['./nav-bar-ekaly.component.sass']
})
export class NavBarEkalyComponent implements OnInit {

  constructor(private router: Router) {


   }

  ngOnInit(): void {
  }
  onLivreur(){
    this.router.navigateByUrl("/"+localStorage.getItem('role')+"/livreur-create");
  }
  onCommande(){
    this.router.navigateByUrl("/"+localStorage.getItem('role')+"/commande-livreur");
  }
  onRestaurant(){
    this.router.navigateByUrl("/"+localStorage.getItem('role')+"/restaurant-create");
  }
  onBeneficeJ(){
    this.router.navigateByUrl("/"+localStorage.getItem('role')+"/benefice-parjour");
  }
  onBeneficeR(){
    this.router.navigateByUrl("/"+localStorage.getItem('role')+"/benefice-parrestaurant");
  }
}
