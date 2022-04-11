import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EKalyComponent } from './components/e-kaly/e-kaly.component';
import { AppRoutingModule } from './app-routing.module';
 import { LoginComponent } from './components/login/login.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { CommandeListeComponent } from './components/commande-liste/commande-liste.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RestaurantListeComponent } from './components/restaurant-liste/restaurant-liste.component';
import { PlatListeComponent } from './components/plat-liste/plat-liste.component';
import { CommandeLivreurComponent } from './components/commande-livreur/commande-livreur.component';
import { CommandeDeliveredComponent } from './components/commande-delivered/commande-delivered.component';
import { NavBarClientComponent } from './components/nav-bar-client/nav-bar-client.component';
import { NavBarEkalyComponent } from './components/nav-bar-ekaly/nav-bar-ekaly.component';
import { NavBarRestaurantComponent } from './components/nav-bar-restaurant/nav-bar-restaurant.component';
import { NavBarLivreurComponent } from './components/nav-bar-livreur/nav-bar-livreur.component';
import { PlatALivrerComponent } from './components/plat-a-livrer/plat-a-livrer.component';
import { LivreurCreateComponent } from './components/livreur-create/livreur-create.component';
import { CommandeEnCoursComponent } from './components/commande-en-cours/commande-en-cours.component';
import { PlatRestaurantComponent } from './components/plat-restaurant/plat-restaurant.component';
import { PlatCreateComponent } from './components/plat-create/plat-create.component';
import { RestaurantCreateComponent } from './components/restaurant-create/restaurant-create.component';
import { BeneficeRestaurantComponent } from './components/benefice-restaurant/benefice-restaurant.component';
import { BeneficeParjourComponent } from './components/benefice-parjour/benefice-parjour.component';
import { BeneficeParrestaurantComponent } from './components/benefice-parrestaurant/benefice-parrestaurant.component';
 @NgModule({
  declarations: [
    AppComponent,
    EKalyComponent,
    LoginComponent,
    InscriptionComponent,
    CommandeListeComponent,
    NavBarComponent,
    FooterComponent,
    HeaderComponent,
    RestaurantListeComponent,
    PlatListeComponent,
    CommandeLivreurComponent,
    CommandeDeliveredComponent,
    NavBarClientComponent,
    NavBarEkalyComponent,
    NavBarRestaurantComponent,
    NavBarLivreurComponent,
    PlatALivrerComponent,
    LivreurCreateComponent,
    CommandeEnCoursComponent,
    PlatRestaurantComponent,
    PlatCreateComponent,
    RestaurantCreateComponent,
    BeneficeRestaurantComponent,
    BeneficeParjourComponent,
    BeneficeParrestaurantComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
