import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bloc } from '../models/bloc';
import { Chambre } from '../models/chambre';

@Injectable({
  providedIn: 'root'
})
export class BlocService {
  private apiUrl = 'http://localhost:8082/tpFoyer17/api/blocs';

  constructor(private http: HttpClient) {}

  getBlocs(): Observable<Bloc[]> {
    return this.http.get<Bloc[]>(`${this.apiUrl}/retrieveBlocs`);
  }

  deleteBloc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removeBloc/${id}`);
  }

  addBloc(bloc: Bloc): Observable<Bloc> {
    return this.http.post<Bloc>(`${this.apiUrl}/addBloc`, bloc);
  }

  updateBloc(bloc: Bloc): Observable<Bloc> {
    return this.http.put<Bloc>(`${this.apiUrl}/updateBloc`, bloc);
  }

  findBlocById(id: number): Observable<Bloc> {
    return this.http.get<Bloc>(`${this.apiUrl}/retrieveBloc/${id}`);
  }
 
  
  findByFoyerIdFoyer(idFoyer: number): Observable<Bloc[]> {
    return this.http.get<Bloc[]>(`${this.apiUrl}/findByFoyerIdFoyer/${idFoyer}`);
  }

  findByChambresIdChambre(idChambre: number): Observable<Bloc> {
    return this.http.get<Bloc>(`${this.apiUrl}/findByChambresIdChambre/${idChambre}`);
  }
 
}
