import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-client',
  templateUrl: './nav-bar-client.component.html',
  styleUrls: ['./nav-bar-client.component.sass']
})
export class NavBarClientComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  onPlats(){
    this.router.navigateByUrl("/"+localStorage.getItem('role')+"/plat-liste");
  }
}
