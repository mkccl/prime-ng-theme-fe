import { ComponentFixture, TestBed } from '@angular/core/testing';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { SidebarAvatarProfilePreview } from './sidebar-avatar-profile';

describe('SidebarAvatarProfilePreview', () => {
  let component: SidebarAvatarProfilePreview;
  let fixture: ComponentFixture<SidebarAvatarProfilePreview>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarAvatarProfilePreview],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarAvatarProfilePreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render avatar', () => {
    const avatar = el.querySelector('p-avatar');
    expect(avatar).toBeTruthy();
  });

  it('should display user name "Jane Doe"', () => {
    const name = el.querySelector('.text-sm.font-semibold');
    expect(name?.textContent?.trim()).toBe('Jane Doe');
  });

  it('should render Sign Out link', () => {
    const signOut = el.querySelector('.pi-sign-out');
    expect(signOut).toBeTruthy();
    const signOutText = signOut?.closest('a');
    expect(signOutText?.textContent?.trim()).toBe('Sign Out');
  });
});
