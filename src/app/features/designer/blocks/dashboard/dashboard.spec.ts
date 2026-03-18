import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { DashboardBlock } from './dashboard';

describe('DashboardBlock', () => {
  let component: DashboardBlock;
  let fixture: ComponentFixture<DashboardBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBlock],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
