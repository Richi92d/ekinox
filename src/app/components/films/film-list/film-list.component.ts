import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Film } from '../models/film.model';
import { FilmCartComponent } from "../film-cart/film-cart.component";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, FilmCartComponent, MatSnackBarModule],
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.scss'
})
export class FilmListComponent {

  private _snackBar = inject(MatSnackBar);

  public featuredFilms: Film[] = [
    { id: 1, title: 'Back to the Future 1', price: 15, saga: true, posterUrl: 'https://fr.web.img6.acsta.net/c_310_420/pictures/22/07/22/15/00/2862661.jpg' },
    { id: 2, title: 'Back to the Future 2', price: 15, saga: true, posterUrl: 'https://fr.web.img6.acsta.net/c_310_420/pictures/22/07/22/15/26/3322260.jpg' },
    { id: 3, title: 'Back to the Future 3', price: 15, saga: true, posterUrl: 'https://fr.web.img6.acsta.net/c_310_420/pictures/22/07/22/15/33/2823541.jpg' },
    { id: 4, title: 'Borderlands', price: 20, saga: false, posterUrl: 'https://fr.web.img4.acsta.net/pictures/24/02/21/09/51/1916092.jpg' },
    { id: 5, title: 'Deadpool & Wolwerine', price: 20, saga: false, posterUrl: 'https://fr.web.img3.acsta.net/c_310_420/img/e4/cd/e4cd101f2e66f4e7818fcf53d05c006a.jpg' },
    { id: 6, title: 'Maxxxine', price: 20, saga: false, posterUrl: 'https://fr.web.img3.acsta.net/c_310_420/img/64/ed/64ed50e05f780e3ca4175be7ae5d130d.jpg' }
  ];

  public cart: Film[] = [];

  public addToCart(film: Film) {
    const filmExists = this.cart.some(cartItem => cartItem.title === film.title);
    if (!filmExists) {
      this.cart.push(film);
      this.openSnackBar(`Le film ${film.title} a bien été ajouté`, 'Fermer');
    }
  }

  public onCartUpdated(updatedCart: Film[]) {
    this.cart = updatedCart;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

}
