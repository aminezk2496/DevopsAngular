import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';  // Importation du module de routage
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlocComponent } from './components/bloc/bloc.component';
import { ChambreComponent } from './components/chambre/chambre.component';
import { foyerComponent } from './components/foyer/foyer.component';
import { UniversiteComponent } from './components/universite/universite.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importer FormsModule ici


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlocComponent,
    ChambreComponent,
    foyerComponent,
    UniversiteComponent,
    EtudiantComponent,
    // Autres composants...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, // Inclusion du module de routage ici
    FormsModule // Ajoutez FormsModule ici

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
