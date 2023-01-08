import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  private url: string = 'http://localhost:3000/';

  /* json-server --watch db.json
  http://localhost:3000/list-animal*/

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private http: HttpClient) { }

  responseMessage(message: string, isError: boolean = false): void {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  getAnimals(): Observable<Animal[]>{
    return this.http.get<Animal[]>(`${this.url}list-animal`).pipe(
      res => res,
      err => err
    );
  }

  postAnimal(animal: Animal): Observable<Animal[]> {
    return this.http.post<Animal[]>(`${this.url}list-animal`, animal).pipe(
      res => res,
      err => err
    );
  }
}
