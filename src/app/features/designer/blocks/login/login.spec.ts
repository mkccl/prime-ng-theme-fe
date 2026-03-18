import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { LoginBlock } from './login';

describe('LoginBlock', () => {
  let component: LoginBlock;
  let fixture: ComponentFixture<LoginBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginBlock],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
