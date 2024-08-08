import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Film } from '../models/film.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-film-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './film-cart.component.html',
  styleUrl: './film-cart.component.scss'
})
export class FilmCartComponent {

  private _snackBar = inject(MatSnackBar);

  @Output() public emitRemoveCart: EventEmitter<Film[]> = new EventEmitter<Film[]>();
  @Input() public cart: Film[] = [];

  public removeFromCart(film: Film) {
    this.cart = this.cart.filter(cartItem => cartItem.id !== film.id);
    this.emitRemoveCart.emit(this.cart);
    this.openSnackBar(`Le film ${film.title} a bien été supprimé`, 'Fermer');
  }

  public getDiscountPercentage() {
    const bttfUniqueTitles = new Set(this.cart.filter(film => film.saga).map(film => film.title)).size;
    if (bttfUniqueTitles === 2) {
      return 10;
    } else if (bttfUniqueTitles >= 3) {
      return 20;
    }
    return 0;
  }

  public getTotal() {
    const bttfFilms = this.cart.filter(film => film.saga);
    const otherFilms = this.cart.filter(film => !film.saga);

    const discountPercentage = this.getDiscountPercentage();
    const bttfTotal = bttfFilms.reduce((sum, film) => sum + film.price, 0) * (1 - discountPercentage / 100);
    const otherTotal = otherFilms.reduce((sum, film) => sum + film.price, 0);

    return bttfTotal + otherTotal;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
