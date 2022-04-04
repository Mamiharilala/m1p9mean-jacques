import { Component, OnInit } from '@angular/core';
import { PlatService } from '../../services/plat.service';
 @Component({
  selector: 'app-plat-liste',
  templateUrl: './plat-liste.component.html',
  styleUrls: ['./plat-liste.component.sass']
})
export class PlatListeComponent implements OnInit {
  platListe: any[] = [
    // vos FaceSnap ici
  ]
  constructor(private platService: PlatService) {

  }

  ngOnInit(): void {
    this.platService.getAll().subscribe(res => {
      this.platListe = res['data'];
      console.log(res['data']);
    });
  }
}