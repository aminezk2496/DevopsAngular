import { Component, OnInit } from '@angular/core';
import { FoyerService } from '../../services/foyer.service';
import { Foyer } from '../../models/foyer';
import { Universite } from '../../models/universite';  // Assurez-vous que vous avez un modèle Université

@Component({
  selector: 'app-foyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.css']
})
export class foyerComponent implements OnInit {

  foyers: Foyer[] = [];
  universites: Universite[] = [];  // Liste des universités
  newFoyer: Foyer = {
    idFoyer: 0,
    nomFoyer: '',
    adresse: '',
    capaciteFoyer: 0,
    universite: null
  };
  selectedFoyer: Foyer = { idFoyer: 0, nomFoyer: '', adresse: '', capaciteFoyer: 0, universite: null };
  isUpdateMode: boolean = false;

  constructor(private foyerService: FoyerService) { }

  ngOnInit(): void {
    this.getFoyers();
    this.getUniversites();  // Appel pour récupérer les universités
  }

  getFoyers(): void {
    this.foyerService.getAllFoyers().subscribe(
      (data: Foyer[]) => {
        this.foyers = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des foyers', error);
      }
    );
  }

  getUniversites(): void {
    this.foyerService.getAllUniversites().subscribe(  // Récupérer les universités
      (data: Universite[]) => {
        this.universites = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des universités', error);
      }
    );
  }

  selectFoyer(foyer: Foyer): void {
    this.selectedFoyer = { ...foyer };
    this.isUpdateMode = true;
  }

  addFoyer(): void {
    this.foyerService.addFoyer(this.newFoyer).subscribe(
      (foyer: Foyer) => {
        this.foyers.push(foyer);
        this.newFoyer = { idFoyer: 0, nomFoyer: '', adresse: '', capaciteFoyer: 0, universite: null };
      },
      (error) => {
        console.error('Erreur lors de l’ajout du foyer', error);
      }
    );
  }

  updateFoyer(): void {
    this.foyerService.updateFoyer(this.selectedFoyer).subscribe(
      (foyer: Foyer) => {
        const index = this.foyers.findIndex(f => f.idFoyer === foyer.idFoyer);
        if (index !== -1) {
          this.foyers[index] = foyer;
        }
        this.isUpdateMode = false;
        this.selectedFoyer = { idFoyer: 0, nomFoyer: '', adresse: '', capaciteFoyer: 0, universite: null };
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du foyer', error);
      }
    );
  }

  deleteFoyer(idFoyer: number, event: Event): void {
    // Empêcher la propagation de l'événement pour éviter un comportement indésirable
    event.stopPropagation();
  
    // Appeler le service pour supprimer le foyer
    this.foyerService.deleteFoyer(idFoyer).subscribe(
      () => {
        // Retirer le foyer de la liste en frontend après la suppression réussie
        this.foyers = this.foyers.filter(f => f.idFoyer !== idFoyer);
      },
      (error) => {
        console.error('Erreur lors de la suppression du foyer', error);
      }
    );
  }

  associateFoyerToUniversity(idFoyer: number): void {
    const universityId = this.selectedFoyer.universite?.idUniversite;
    if (universityId) {
      this.foyerService.ajouterFoyerEtAffecterAUniversite(this.selectedFoyer, universityId).subscribe(
        (foyer: Foyer) => {
          this.getFoyers(); // Rafraîchir la liste des foyers après l'association
          console.log(`Foyer ${foyer.nomFoyer} associé à l'université avec succès`);
        },
        (error) => {
          console.error('Erreur lors de l\'association du foyer à l\'université', error);
        }
      );
    } else {
      console.error('Aucune université sélectionnée');
    }
  }
}
