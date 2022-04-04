import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Utilisateur } from '../../models/utilisateur.model';
@Component({
  selector: 'app-restaurant-liste',
  templateUrl: './restaurant-liste.component.html',
  styleUrls: ['./restaurant-liste.component.sass']
})
export class RestaurantListeComponent implements OnInit {
  utilisateurListe: any[] = [
    // vos FaceSnap ici
  ]
  constructor(private restaurantService: RestaurantService) {

  }

  ngOnInit(): void {
    this.restaurantService.getAll().subscribe(res => {
      this.utilisateurListe = res['data'];
      console.log(res['data']);
    });
  }
}

 
