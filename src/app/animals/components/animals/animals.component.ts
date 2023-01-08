import { Component, OnInit } from '@angular/core';
import { Animal } from '../../../models/animal';
import { gridAnimal } from '../../../models/column-defs/animal.column-def';
import { AnimalsService } from '../../../services/animals.service';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { AnimalModalComponent } from '../animal-modal/animal-modal.component';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {
  list: Animal[] = [];
  columnsDef = gridAnimal;

  defaultColDef = {
    resizable: true,
    sortable: true,
  }

  constructor(
    private animalsService: AnimalsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadGeral();
  }

  loadGeral() {
    this.animalsService.getAnimals().subscribe({
      next: (res) => this.list = res,
      error: (err) => console.log(err)
    })
  }

  registerAnimal(): void {
    this.dialog.open(AnimalModalComponent)
  }
}
