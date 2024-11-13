import { Routes } from '@angular/router';

export const routes: Routes = [];
export interface Bloc {
  idBloc?: number;  // Utilisation de ? pour indiquer que l'id est optionnel
  nomBloc: string;
  capaciteBloc: number;
}