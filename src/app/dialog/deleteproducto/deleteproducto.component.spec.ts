import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteproductoComponent } from './deleteproducto.component';

describe('DeleteproductoComponent', () => {
  let component: DeleteproductoComponent;
  let fixture: ComponentFixture<DeleteproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
