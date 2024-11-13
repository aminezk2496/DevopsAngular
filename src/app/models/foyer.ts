import { Universite } from "./universite";
export interface Foyer {
  idFoyer: number;
  nomFoyer: string;
  adresse: string;
  capaciteFoyer: number;
  universite: Universite | null;
}
