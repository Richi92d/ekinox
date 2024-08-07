import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Film } from '../models/film.model';
import { FilmListComponent } from './film-list.component';

describe('FilmListComponent', () => {
  let component: FilmListComponent;
  let fixture: ComponentFixture<FilmListComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        FilmListComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatSnackBar }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add duplicate films to cart', () => {
    const filmToAdd = component.featuredFilms[0];

    component.addToCart(filmToAdd);
    component.addToCart(filmToAdd);

    expect(component.cart.length).toBe(1);
  });

  it('should update the cart when onCartUpdated is called', () => {
    const updatedCart: Film[] = [
      { id: 7, title: 'New Film', price: 25, saga: false, posterUrl: 'https://example.com/newfilm.jpg' }
    ];

    component.onCartUpdated(updatedCart);

    expect(component.cart).toEqual(updatedCart);
  });
});
