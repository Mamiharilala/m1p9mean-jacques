import { Component, OnInit, Input } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { UtilisateurService } from '../../services/utilisateur.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-benefice-parjour',
  templateUrl: './benefice-parjour.component.html',
  styleUrls: ['./benefice-parjour.component.sass']
})
export class BeneficeParjourComponent implements OnInit {
  beneficeList: any[] = [
  ];


  constructor(private http: HttpClient, private route: ActivatedRoute, private restaurantService: RestaurantService, private formBuilder: FormBuilder, private utilisateurService: UtilisateurService) {

  }
  ngOnInit(): void {
    this.getBeneficeParJour();
  }
  getBeneficeParJour() {
    const headers = { 'Authorization': '' + localStorage.getItem("token") };
    this.restaurantService.getBeneficeParJour(headers).subscribe(res => {
      this.beneficeList = res['data'];
     });
  }

}
