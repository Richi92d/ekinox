import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCartComponent } from './film-cart.component';

describe('FilmCartComponent', () => {
  let component: FilmCartComponent;
  let fixture: ComponentFixture<FilmCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmCartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilmCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove a film from the cart and emit the updated cart', () => {
    const filmToRemove = { id: 1, title: 'Film 1', price: 10, saga: false, posterUrl: '' };
    component.cart = [
      filmToRemove,
      { id: 2, title: 'Film 2', price: 15, saga: true, posterUrl: '' }
    ];

    spyOn(component.emitRemoveCart, 'emit');

    component.removeFromCart(filmToRemove);

    expect(component.cart).not.toContain(filmToRemove);
    expect(component.emitRemoveCart.emit).toHaveBeenCalledWith([
      { id: 2, title: 'Film 2', price: 15, saga: true, posterUrl: '' }
    ]);
  });

  it('should return correct discount percentage', () => {
    component.cart = [
      { id: 1, title: 'Back to the Future 1', price: 10, saga: true, posterUrl: '' },
      { id: 2, title: 'Back to the Future 2', price: 10, saga: true, posterUrl: '' },
      { id: 3, title: 'Other Film', price: 10, saga: false, posterUrl: '' }
    ];

    expect(component.getDiscountPercentage()).toBe(10);

    component.cart.push(
      { id: 4, title: 'Back to the Future 3', price: 10, saga: true, posterUrl: '' }
    );

    expect(component.getDiscountPercentage()).toBe(20);

    component.cart = [
      { id: 5, title: 'Other Film 1', price: 10, saga: false, posterUrl: '' },
      { id: 6, title: 'Other Film 2', price: 10, saga: false, posterUrl: '' }
    ];

    expect(component.getDiscountPercentage()).toBe(0);
  });

});
