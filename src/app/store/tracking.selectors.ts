import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TrackingState } from './tracking.reducer';

export const selectTrackingState = createFeatureSelector<TrackingState>('tracking');

export const selectTrackingCounts = createSelector(
  selectTrackingState,
  (state) => state.counts
);

export const selectTotalClicks = createSelector(
  selectTrackingState,
  (state) => state.totalClicks
);

export const selectTrackingCountByTag = (tag: string) => createSelector(
  selectTrackingCounts,
  (counts) => counts[tag] || 0
);
