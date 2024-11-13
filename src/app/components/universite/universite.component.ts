import { Component, OnInit } from '@angular/core';
import { UniversiteService } from '../../services/universite.service';
import { Universite } from '../../models/universite';

@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.css']
})
export class UniversiteComponent implements OnInit {

  universites: Universite[] = [];
  newUniversite: Universite = {
    idUniversite: 0,
    nomUniversite: '',
    adresse: ''
  };

  selectedUniversite: Universite | null = null;

  constructor(private universiteService: UniversiteService) { }

  ngOnInit(): void {
    this.getUniversites();
  }

  // Récupérer toutes les universités
  getUniversites(): void {
    this.universiteService.getAllUniversities().subscribe((data: Universite[]) => {
      this.universites = data;
    });
  }

  // Ajouter une nouvelle université
  addUniversite(): void {
    this.universiteService.addUniversity(this.newUniversite).subscribe((universite: Universite) => {
      this.universites.push(universite);
      this.newUniversite = { idUniversite: 0, nomUniversite: '', adresse: '' };
    });
  }

  // Sélectionner une université pour la mise à jour
  selectUniversite(universite: Universite): void {
    this.selectedUniversite = { ...universite };
  }

  // Mettre à jour l'université sélectionnée
  updateUniversite(): void {
    if (this.selectedUniversite) {
      this.universiteService.updateUniversity(this.selectedUniversite).subscribe((universite: Universite) => {
        const index = this.universites.findIndex(u => u.idUniversite === universite.idUniversite);
        if (index !== -1) {
          this.universites[index] = universite;
        }
        this.selectedUniversite = null;
      });
    }
  }
}
