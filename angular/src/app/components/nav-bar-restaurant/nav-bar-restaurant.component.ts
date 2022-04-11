import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-restaurant',
  templateUrl: './nav-bar-restaurant.component.html',
  styleUrls: ['./nav-bar-restaurant.component.sass']
})
export class NavBarRestaurantComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  onCommandeEnCours(){
    this.router.navigateByUrl("/"+localStorage.getItem('role')+"/commande-en-cours");
  }
  onPlat(){
    this.router.navigateByUrl("/"+localStorage.getItem('role')+"/plat-create");
  }
  onVisibility(){
    this.router.navigateByUrl("/"+localStorage.getItem('role')+"/restaurant-plat");
  }
  onBenefice(){
    this.router.navigateByUrl("/"+localStorage.getItem('role')+"/benefice-restaurant");
  }
 
 
}
