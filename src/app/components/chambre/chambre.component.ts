// src/app/components/chambre/chambre.component.ts
// src/app/components/chambre/chambre.component.ts
import { Component, OnInit } from '@angular/core';
import { ChambreService } from '../../services/chambre.service';
import { Chambre } from '../../models/chambre';
import { TypeChambre } from '../../models/type-chambre';

@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.css']
})
export class ChambreComponent implements OnInit {
  chambres: Chambre[] = [];
  selectedChambre?: Chambre | null;
  typeChambreOptions = Object.values(TypeChambre);
  numeroChambre: number = 0;
  typeChambre: TypeChambre = TypeChambre.SIMPLE;
  idBloc: number = 0;
  loading: boolean = false; // Pour indiquer si le chargement est en cours
  errorMessage: string = ''; // Message d'erreur global

  constructor(private chambreService: ChambreService) {}

  ngOnInit(): void {
    this.retrieveAllChambres();
  }

  addChambre(numeroChambre: number, typeChambre: TypeChambre): void {
    if (!numeroChambre || !typeChambre) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }
    this.loading = true;
    const newChambre = new Chambre(numeroChambre, typeChambre);
    this.chambreService.addChambre(newChambre).subscribe(
      () => {
        this.retrieveAllChambres();
        this.resetForm();
        this.loading = false;
        alert('Chambre ajoutée avec succès!');
      },
      (error: any) => {
        this.loading = false;
        this.errorMessage = 'Erreur lors de l’ajout de la chambre.';
        console.error('Erreur lors de l’ajout de la chambre', error);
      }
    );
  }

  retrieveAllChambres(): void {
    this.loading = true;
    this.chambreService.retrieveAllChambres().subscribe(
      (data: Chambre[]) => {
        this.chambres = data;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        this.errorMessage = 'Erreur lors de la récupération des chambres';
        console.error('Erreur lors de la récupération des chambres', error);
      }
    );
  }

  resetForm(): void {
    this.numeroChambre = 0;
    this.typeChambre = TypeChambre.SIMPLE;
    this.selectedChambre = undefined;
  }

  selectChambreForUpdate(chambre: Chambre): void {
    this.selectedChambre = { ...chambre };
  }

  updateChambre(): void {
    if (this.selectedChambre) {
      this.loading = true;
      console.log('Attempting to update chambre:', this.selectedChambre);
      this.chambreService.updateChambre(this.selectedChambre).subscribe(
        () => {
          console.log('Chambre updated successfully');
          this.retrieveAllChambres();
          this.selectedChambre = undefined;
          this.loading = false;
          alert('Chambre mise à jour avec succès!');
        },
        (error: any) => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la mise à jour de la chambre.';
          console.error('Error updating chambre:', error);
        }
      );
    }
  }

  deleteChambre(idChambre: number | undefined): void {
    if (idChambre !== undefined && confirm('Êtes-vous sûr de vouloir supprimer cette chambre?')) {
      this.loading = true;
      this.chambreService.deleteChambre(idChambre).subscribe(
        () => {
          console.log(`Chambre avec ID ${idChambre} supprimée`);
          this.retrieveAllChambres();
          this.loading = false;
          alert('Chambre supprimée avec succès!');
        },
        (error: any) => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la suppression de la chambre.';
          console.error('Erreur lors de la suppression de la chambre', error);
        }
      );
    }
  }

  getChambresByType(): void {
    console.log('Recherche des chambres par type:', this.typeChambre);
    this.loading = true;
    this.chambreService.findByTypeChambre(this.typeChambre).subscribe(
      (data: Chambre[]) => {
        console.log('Chambres trouvées par type:', data);
        this.chambres = data;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        this.errorMessage = 'Erreur lors de la recherche par type';
        console.error('Erreur lors de la recherche par type', error);
      }
    );
  }

  affecterChambreABloc(idChambre: number, idBloc: number): void {
    this.chambreService.affecterChambreABloc(idChambre, idBloc).subscribe(
      () => {
        console.log(`Chambre avec ID ${idChambre} affectée au bloc ${idBloc}`);
        this.retrieveAllChambres();
      },
      (error: any) => console.error('Erreur lors de l’affectation de la chambre au bloc', error)
    );
  }
  findChambreById(id: number): void {
    // Réinitialiser la chambre sélectionnée (mise à jour) lorsque vous effectuez une recherche
    this.selectedChambre = null;
  
    // Recherche de la chambre par ID
    const chambreTrouvee = this.chambres.find(chambre => chambre.idChambre === id);
    
    if (chambreTrouvee) {
      this.chambres = [chambreTrouvee];  // Affiche uniquement la chambre trouvée
    } else {
      this.chambres = [];  // Si aucune chambre n'est trouvée, efface la liste des chambres affichées
    }
  }
  
  
}
