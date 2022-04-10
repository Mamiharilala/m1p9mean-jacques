import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {
  role: string;
  constructor(private route: ActivatedRoute) { 
    this.role = this.route.snapshot.params['role'];
  }

  ngOnInit(): void {
  }

}
