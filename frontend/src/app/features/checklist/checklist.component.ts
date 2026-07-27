import { Component, Input, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChecklistService, ChecklistItem } from './checklist.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-checklist',
  standalone: true,
  template: `
    <p>Avance: {{ checklistService.percentage() }}%</p>
    <ul>
      @for (item of checklistService.items(); track item.id) {
        <li>
          <label>
            <input
              type="checkbox"
              [checked]="item.done"
              (change)="onToggle(item)"
            />
            {{ item.label }}
          </label>
        </li>
      }
    </ul>
  `,
})
export class ChecklistComponent implements OnInit {
  @Input({ required: true }) campaignId!: string;

  private readonly http = inject(HttpClient);
  readonly checklistService = inject(ChecklistService);

  ngOnInit(): void {
    this.http
      .get<ChecklistItem[]>(`${environment.apiBaseUrl}/campaigns/${this.campaignId}/checklist`)
      .subscribe((items) => this.checklistService.setItems(items));
  }

  onToggle(item: ChecklistItem): void {
    this.checklistService.toggleItem(item.id);

    this.http
      .post(`${environment.apiBaseUrl}/campaigns/${this.campaignId}/checklist/${item.id}/toggle`, {
        done: !item.done,
      })
      .subscribe();
  }
}
