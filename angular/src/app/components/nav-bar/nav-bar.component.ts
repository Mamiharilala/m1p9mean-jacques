import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {
  role: string;
  constructor(private route: ActivatedRoute,private router: Router) { 
    this.role = this.route.snapshot.params['role'];
  }

  ngOnInit(): void {
  }
  onLogOut(){
    localStorage.clear();
    this.router.navigateByUrl("/");
  }
}
