import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { UtilisateurService } from '../../services/utilisateur.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-benefice-parrestaurant',
  templateUrl: './benefice-parrestaurant.component.html',
  styleUrls: ['./benefice-parrestaurant.component.sass']
})
export class BeneficeParrestaurantComponent implements OnInit {
  beneficeList: any[] = [
  ];


  constructor(private http: HttpClient, private route: ActivatedRoute, private restaurantService: RestaurantService, private formBuilder: FormBuilder, private utilisateurService: UtilisateurService) {

  }
  ngOnInit(): void {
    this.getBeneficeParRestaurant();
  }
  getBeneficeParRestaurant() {
    const headers = { 'Authorization': '' + localStorage.getItem("token") };
    this.restaurantService.getBeneficeParRestaurant(headers).subscribe(res => {
      this.beneficeList = res['data'];
      console.log(this.beneficeList);
    });
  }

}
