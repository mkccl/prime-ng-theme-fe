import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { BlockCard } from './block-card';
import { BlockDefinition } from '../models/block-definition';

@Component({
  selector: 'app-test-preview',
  standalone: true,
  template: `<div class="test-preview">Preview</div>`,
})
class TestPreview {}

describe('BlockCard', () => {
  let fixture: ComponentFixture<BlockCard>;
  let component: BlockCard;
  let el: HTMLElement;

  const mockBlock: BlockDefinition = {
    id: 'test-block',
    name: 'Test Block',
    description: 'A test block description',
    category: 'sidebar',
    previewComponent: TestPreview,
    htmlCode: '<div>Test HTML</div>',
    tsCode: 'const test = true;',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockCard],
      providers: [providePrimeNG({ theme: { preset: Aura } })],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('block', mockBlock);
    fixture.detectChanges();
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display block name', () => {
    const name = el.querySelector('h3');
    expect(name?.textContent?.trim()).toBe('Test Block');
  });

  it('should display block description', () => {
    const desc = el.querySelector('.block-card-header p');
    expect(desc?.textContent?.trim()).toBe('A test block description');
  });

  it('should render an iframe with correct src', () => {
    const iframe = el.querySelector('iframe');
    expect(iframe).toBeTruthy();
    expect(iframe?.getAttribute('src')).toBe('/blocks/preview/test-block');
  });

  it('should set iframe title from block name', () => {
    const iframe = el.querySelector('iframe');
    expect(iframe?.getAttribute('title')).toBe('Test Block preview');
  });

  it('should set iframe loading to lazy', () => {
    const iframe = el.querySelector('iframe');
    expect(iframe?.getAttribute('loading')).toBe('lazy');
  });

  it('should render the resize handle', () => {
    const handle = el.querySelector('.resize-handle');
    expect(handle).toBeTruthy();
  });

  it('should render the "Get the code" button', () => {
    const btn = el.querySelector('.get-code-btn');
    expect(btn).toBeTruthy();
    expect(btn?.textContent).toContain('Get the code');
  });
});
