import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { gridAnimal } from 'src/app/models/column-defs/animal.column-def';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  selector: 'app-animal-modal',
  templateUrl: './animal-modal.component.html',
  styleUrls: ['./animal-modal.component.scss']
})
export class AnimalModalComponent implements OnInit {
  columnsDef = gridAnimal;

  animalForm: FormGroup = this.fb.group({
    name: [null, Validators.required],
    age: [null],
    breed: [null],
    color: [null],
    weight: [null]
  });

  constructor(
    private animalsService: AnimalsService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AnimalModalComponent>) { }

  ngOnInit(): void {
  }

  postAnimal() {
    if (this.animalForm.valid) {
      this.animalsService.postAnimal(this.animalForm.value).subscribe({
        next: (res) => {
          this.animalsService.responseMessage("Animal cadastrado com sucesso!", false);
          this.dialogRef.close();
        },
        error: (err) => console.log(err)
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      this.animalsService.responseMessage("Não foi possível presseguir com a solicitação!", true);
    }
  }

  btnDisabled(): boolean {
    if (this.animalForm.get('name')?.valid) {
      return false;
    } else {
      return true;
    }
  }
}
