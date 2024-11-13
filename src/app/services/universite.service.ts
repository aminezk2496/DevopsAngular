import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Universite } from '../models/universite';  // Importation du modèle

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  private apiUrl = 'http://localhost:8082/tpFoyer17/api/univeristes';  // L'URL de votre API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les universités
  getAllUniversities(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.apiUrl}/retrieveAllUniversities`);
  }

  // Ajouter une nouvelle université
  addUniversity(universite: Universite): Observable<Universite> {
    return this.http.post<Universite>(`${this.apiUrl}/addUniversity`, universite);
  }

  // Mettre à jour une université
  updateUniversity(universite: Universite): Observable<Universite> {
    return this.http.put<Universite>(`${this.apiUrl}/updateUniversity`, universite);
  }

  // Récupérer une université par son ID
  getUniversity(id: number): Observable<Universite> {
    return this.http.get<Universite>(`${this.apiUrl}/retrieveUniversity/${id}`);
  }

  // Affecter un foyer à une université
  affecterFoyerAUniversite(idFoyer: number, nomUniversite: string): Observable<Universite> {
    return this.http.put<Universite>(`${this.apiUrl}/affecterFoyerAUniversite/${idFoyer}/${nomUniversite}`, {});
  }

  // Désaffecter un foyer d'une université
  desaffecterFoyerAUniversite(idUniversite: number): Observable<Universite> {
    return this.http.put<Universite>(`${this.apiUrl}/desaffecterFoyerAUniversite/${idUniversite}`, {});
  }
}
