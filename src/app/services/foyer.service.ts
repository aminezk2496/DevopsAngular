import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Foyer } from '../models/foyer';
import { Universite } from '../models/universite';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {

  private apiUrl = 'http://localhost:8082/tpFoyer17/api/foyers'; // Remplacer par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAllFoyers(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.apiUrl}/retrieveAllFoyers`);
  }

  addFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.post<Foyer>(`${this.apiUrl}/addFoyer`, foyer);
  }

  updateFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.put<Foyer>(`${this.apiUrl}/updateFoyer`, foyer);
  }
  deleteFoyer(idFoyer: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removeFoyer/${idFoyer}`);
  }
  
  
  
/*
  addFoyerAndAffectToUniversite(foyer: Foyer): Observable<Foyer> {
    return this.http.post<Foyer>(`${this.apiUrl}/ajouterFoyerEtAffecterAUniversite`, foyer);
  }
  */
  ajouterFoyerEtAffecterAUniversite(foyer: Foyer, idUniversite: number): Observable<Foyer> {
    return this.http.put<Foyer>(`${this.apiUrl}/ajouterFoyerEtAffecterAUniversite/${idUniversite}`,foyer);
  }
  getAllUniversites(): Observable<Universite[]> {
    return this.http.get<Universite[]>('http://localhost:8082/tpFoyer17/api/universites/retrieveAllUniversities'); // Remplacer par l'URL de ton API pour les universités
  }
}
