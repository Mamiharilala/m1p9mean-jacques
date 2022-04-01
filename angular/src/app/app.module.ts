import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EKalyComponent } from './e-kaly/e-kaly.component';
import { AppRoutingModule } from './app-routing.module';
 import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CommandeListeComponent } from './commande-liste/commande-liste.component';
@NgModule({
  declarations: [
    AppComponent,
    EKalyComponent,
    LoginComponent,
    InscriptionComponent,
    CommandeListeComponent
  ],
  imports: [
    BrowserModule,RouterModule,AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
