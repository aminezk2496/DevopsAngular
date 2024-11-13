import { Component, OnInit } from '@angular/core';
import { BlocService } from '../../services/bloc.service';
import { Bloc } from '../../models/bloc';

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.css']
})
export class BlocComponent implements OnInit {
  blocs: Bloc[] = [];
  selectedBloc?: Bloc;
  isUpdateMode: boolean = false; // Variable to control update form visibility
  idFoyer: number = 0;
  idChambre: number = 0;
  blocId: number = 0; // Variable pour l'ID du bloc saisi pour la recherche

  constructor(private blocService: BlocService) {}

  ngOnInit(): void {
    this.retrieveAllBlocs(); // Charger tous les blocs au départ
  }

  retrieveAllBlocs(): void {
    this.blocService.getBlocs().subscribe(
      (data: Bloc[]) => {
        this.blocs = data;
      },
      (error: any) => console.error('Erreur lors de la récupération des blocs', error)
    );
  }

  deleteBloc(idBloc: number): void {
    this.blocService.deleteBloc(idBloc).subscribe(
      () => this.blocs = this.blocs.filter(bloc => bloc.idBloc !== idBloc),
      (error: any) => console.error('Erreur lors de la suppression du bloc', error)
    );
  }

  addBloc(nomBloc: string, capaciteBloc: number): void {
    const newBloc: Bloc = { nomBloc, capaciteBloc };
    this.blocService.addBloc(newBloc).subscribe(
      (bloc: Bloc) => {
        this.blocs.push(bloc);
      },
      (error: any) => console.error('Erreur lors de l’ajout du bloc', error)
    );
  }

  selectBlocForUpdate(bloc: Bloc): void {
    this.selectedBloc = { ...bloc }; // Clone bloc to avoid direct modifications
    this.isUpdateMode = true; // Enable update mode
  }

  updateSelectedBloc(): void {
    if (this.selectedBloc) {
      this.blocService.updateBloc(this.selectedBloc).subscribe(
        (updatedBloc: Bloc) => {
          const index = this.blocs.findIndex(b => b.idBloc === updatedBloc.idBloc);
          if (index !== -1) this.blocs[index] = updatedBloc;
          this.isUpdateMode = false; // Disable update mode after saving
          this.selectedBloc = undefined; // Clear selected bloc after update
        },
        (error: any) => console.error('Erreur lors de la mise à jour du bloc', error)
      );
    }
  }

  // Recherche de bloc par ID
  findBlocById(id: number): void {
    if (id) {
      this.blocService.findBlocById(id).subscribe(
        (bloc: Bloc) => {
          this.blocs = [bloc]; // Mettre à jour la liste pour ne montrer que ce bloc
          this.selectedBloc = bloc; // Sélectionner le bloc trouvé
        },
        (error: any) => {
          console.error('Erreur lors de la récupération du bloc', error);
          this.blocs = []; // Si erreur, vider la liste
          alert('Bloc non trouvé');
        }
      );
    } else {
      this.retrieveAllBlocs(); // Si ID est vide, récupérer tous les blocs
    }
  }

  // Recherche de blocs par ID de foyer
  findByFoyerIdFoyer(): void {
    this.blocService.findByFoyerIdFoyer(this.idFoyer).subscribe(
      (data: Bloc[]) => (this.blocs = data),
      (error: any) => console.error('Erreur lors de la recherche par foyer', error)
    );
  }

  // Recherche de blocs par ID de chambre
  findByChambresIdChambre(): void {
    if (this.idChambre) {
      this.blocService.findByChambresIdChambre(this.idChambre).subscribe(
        (bloc: Bloc) => {
          this.blocs = [bloc]; // Mettre à jour la liste pour ne montrer que ce bloc trouvé
          this.selectedBloc = bloc; // Sélectionner le bloc trouvé
        },
        (error: any) => {
          console.error('Erreur lors de la recherche par chambre', error);
          this.blocs = []; // Si erreur, vider la liste
          alert('Bloc non trouvé pour cette chambre');
        }
      );
    } else {
      this.retrieveAllBlocs(); // Si ID de chambre est vide, récupérer tous les blocs
    }
  }

  onBlocSelected(event: Event): void {
    const selectedId = +(event.target as HTMLSelectElement).value;
    this.findBlocById(selectedId);
  }
}
