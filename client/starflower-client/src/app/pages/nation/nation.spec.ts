import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nation } from './nation';

describe('Nation', () => {
  let component: Nation;
  let fixture: ComponentFixture<Nation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nation],
    }).compileComponents();

    fixture = TestBed.createComponent(Nation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
