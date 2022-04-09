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
    CommandeDeliveredComponent
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
