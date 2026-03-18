import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { SignUpBlock } from './sign-up';

describe('SignUpBlock', () => {
  let component: SignUpBlock;
  let fixture: ComponentFixture<SignUpBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpBlock],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
