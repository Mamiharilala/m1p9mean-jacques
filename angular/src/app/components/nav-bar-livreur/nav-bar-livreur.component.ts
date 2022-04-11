import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-livreur',
  templateUrl: './nav-bar-livreur.component.html',
  styleUrls: ['./nav-bar-livreur.component.sass']
})
export class NavBarLivreurComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onPlatsLivrer(){
    this.router.navigateByUrl("/"+localStorage.getItem('role')+"/plat-a-livrer");
  }
}
