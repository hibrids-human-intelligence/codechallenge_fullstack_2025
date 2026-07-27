import { Component } from '@angular/core';
import { ChecklistComponent } from './features/checklist/checklist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChecklistComponent],
  template: `
    <h1>CMS Challenge — Checklist de campaña (challenge)</h1>
    <app-checklist campaignId="demo-campaign-001" />
  `,
})
export class AppComponent {}
