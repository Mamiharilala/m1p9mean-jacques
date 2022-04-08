import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { PlatService } from '../../services/plat.service';

@Component({
	selector: 'app-commande-livreur',
	templateUrl: './commande-livreur.component.html',
	styleUrls: ['./commande-livreur.component.sass']
})
export class CommandeLivreurComponent implements OnInit {

	results: any[] = [];
	searchResults: any[] = [];
	platNotAssigned: any[] = []; 
	constructor(private utilisateurService: UtilisateurService,private platService: PlatService) { }

	ngOnInit(): void {
		this.getSearchResults();
		this.onFindAllNotAssigned();
	}
	getSearchResults(): void {
		this.utilisateurService.getResultList().subscribe(sr => { Object.assign(this.searchResults, sr); });
	}

	searchOnKeyUp(event: any) {
		let input = event.target.value;
		//console.log('event.target.value: ' + input);
		//console.log('this.searchResults: ' + this.searchResults);
		if (input.length > 1) {
			this.results = this.searchFromArray(this.searchResults, input);
		}
	}

	searchFromArray(arr: any, regex: any) {
		let matches = [], i;
		for (i = 0; i < arr.length; i++) {
			if (arr[i].match(regex)) {
				matches.push(arr[i]);
			}
		}
		//console.log('matches: ' + matches);
		return matches;
	};
	onFindAllNotAssigned(){
		this.platService.getAllNotAssigned().subscribe(res => {
			this.platNotAssigned = res['data'];
  		  });
	}
}
