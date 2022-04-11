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
	livreurs: any[] = [];
	index:any;
	message:string;
	constructor(private utilisateurService: UtilisateurService,private platService: PlatService) { 
		this.message = "";
	}

	ngOnInit(): void {
		this.getSearchResults();
		this.onFindAllNotAssigned();
		this.onFindAllLivreurs();
	}

	getSearchResults(): void {
		this.utilisateurService.getResultList().subscribe(sr => { Object.assign(this.searchResults, sr); });
	}

	searchOnKeyUp(event: any) {
		let input = event.target.value;
 		//console.log('event.target.value: ' + input);
		//console.log('this.searchResults: ' + this.searchResults);
		if (input.length > 1) {
			this.results = this.searchFromArray(this.livreurs, input);
		}
	}

	searchFromArray(arr: any, regex: any) {
 		let matches = [], i;
		for (i = 0; i < arr.length; i++) {
			if (arr[i]['prenom'].match(regex)) {
				matches.push(arr[i]);
				this.index = i;
			}
		}
		//console.log('matches: ' + matches);
		return matches;
	};
	onFindAllLivreurs(){
		const headers = { 'Authorization': '' + localStorage.getItem("token") };
	   this.utilisateurService.getLivreurs(headers).subscribe(res => {
		   this.livreurs = res['data'];
		   console.log(this.livreurs.length);
		   });
		  
   	}
	onFindAllNotAssigned(){
     	const headers = { 'Authorization': '' + localStorage.getItem("token") };
		this.platService.getAllNotAssigned(headers).subscribe(res => {
			this.platNotAssigned = res['data'];
  		  });
	}
	onAssign(plat:any){
 		const headers = { 'Authorization': '' + localStorage.getItem("token") };
		this.utilisateurService.assignLivreur({idcommande:plat['_id'],idlivreur:this.results[0]['id']},headers).subscribe(res => {
			this.message = res['message'];
			this.onFindAllNotAssigned();
			setTimeout(() => {
				this.message = "";
			   }, 3000);
			});
			
	}
}
