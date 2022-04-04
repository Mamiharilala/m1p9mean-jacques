import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { EKalyComponent } from './components/e-kaly/e-kaly.component';
import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { CommandeListeComponent } from './components/commande-liste/commande-liste.component';
import { RestaurantListeComponent  } from './components/restaurant-liste/restaurant-liste.component';
import { PlatListeComponent } from './components/plat-liste/plat-liste.component';
const routes: Routes = [
    { path: 'e-kaly', component: EKalyComponent },
    { path: 'commande-liste', component: CommandeListeComponent },
    { path: 'inscription', component: InscriptionComponent },
    { path: 'login', component: LoginComponent },
    { path: 'restaurant-liste', component: RestaurantListeComponent},
    { path: 'plat-liste', component: PlatListeComponent}
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