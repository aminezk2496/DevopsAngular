import { ComponentFixture, TestBed } from '@angular/core/testing';

import { foyerComponent } from './foyer.component';

describe('FoyerComponent', () => {
  let component: foyerComponent;
  let fixture: ComponentFixture<foyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ foyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(foyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
