import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { EKalyComponent } from './components/e-kaly/e-kaly.component';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { CommandeListeComponent } from './components/commande-liste/commande-liste.component';
import { RestaurantListeComponent  } from './components/restaurant-liste/restaurant-liste.component';
import { PlatListeComponent } from './components/plat-liste/plat-liste.component';
import {  CommandeLivreurComponent } from './components/commande-livreur/commande-livreur.component';
import { CommandeDeliveredComponent } from './components/commande-delivered/commande-delivered.component';
import { PlatALivrerComponent } from './components/plat-a-livrer/plat-a-livrer.component';
import { LivreurCreateComponent } from './components/livreur-create/livreur-create.component';
import { CommandeEnCoursComponent } from './components/commande-en-cours/commande-en-cours.component';
import { PlatRestaurantComponent } from './components/plat-restaurant/plat-restaurant.component';
import { PlatCreateComponent } from './components/plat-create/plat-create.component';
import { RestaurantCreateComponent } from './components/restaurant-create/restaurant-create.component';
import { BeneficeRestaurantComponent } from './components/benefice-restaurant/benefice-restaurant.component';
import { BeneficeParjourComponent } from './components/benefice-parjour/benefice-parjour.component';
import { BeneficeParrestaurantComponent } from './components/benefice-parrestaurant/benefice-parrestaurant.component';
 
const routes: Routes = [
    { path: 'e-kaly', component: EKalyComponent },
    { path: ':role/commande-liste', component: CommandeListeComponent },
    { path: 'inscription', component: InscriptionComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent },
    { path: ':role/restaurant-liste', component: RestaurantListeComponent},
    { path: ':role/commande-livreur', component: CommandeLivreurComponent},
    { path: ':role/plat-liste', component: PlatListeComponent},
    { path: ':role/commande-livraison', component: CommandeDeliveredComponent},
    { path: ':role/commande-delivered', component: CommandeDeliveredComponent},
    { path: ':role/plat-a-livrer', component: PlatALivrerComponent},
    { path: ':role/livreur-create', component: LivreurCreateComponent},
    { path: ':role/commande-en-cours', component: CommandeEnCoursComponent},
    { path: ':role/restaurant-plat', component: PlatRestaurantComponent},
    { path: ':role/plat-create', component: PlatCreateComponent},
    { path: ':role/restaurant-create', component: RestaurantCreateComponent},
    { path: ':role/benefice-restaurant', component: BeneficeRestaurantComponent},
    { path: ':role/benefice-parjour', component: BeneficeParjourComponent},
    { path: ':role/benefice-parrestaurant', component: BeneficeParrestaurantComponent}
 
];
@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
 
export class AppRoutingModule {}