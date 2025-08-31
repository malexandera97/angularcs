import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { selectTrackingCounts, selectTotalClicks } from '../store/tracking.selectors';
import { resetTrackingCounts } from '../store/tracking.actions';

@Component({
  selector: 'app-tracking-dashboard',
  imports: [CommonModule],
  templateUrl: './tracking-dashboard.html',
  styleUrl: './tracking-dashboard.css'
})
export class TrackingDashboard implements OnInit {
  trackingCounts$: Observable<{ [tag: string]: number }>;
  totalClicks$: Observable<number>;

  constructor(private store: Store) {
    this.trackingCounts$ = this.store.select(selectTrackingCounts);
    this.totalClicks$ = this.store.select(selectTotalClicks);
  }

  ngOnInit() {}

  resetCounts() {
    this.store.dispatch(resetTrackingCounts());
  }

  getTagKeys(counts: { [tag: string]: number }): string[] {
    return Object.keys(counts);
  }
}
