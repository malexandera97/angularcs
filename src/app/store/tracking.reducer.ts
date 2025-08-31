import { createReducer, on } from '@ngrx/store';
import { updateTrackingCount, resetTrackingCounts } from './tracking.actions';

export interface TrackingState {
  counts: { [tag: string]: number };
  totalClicks: number;
}

export const initialTrackingState: TrackingState = {
  counts: {},
  totalClicks: 0
};

export const trackingReducer = createReducer(
  initialTrackingState,
  on(updateTrackingCount, (state, { tag }) => ({
    ...state,
    counts: {
      ...state.counts,
      [tag]: (state.counts[tag] || 0) + 1
    },
    totalClicks: state.totalClicks + 1
  })),
  on(resetTrackingCounts, (state) => ({
    ...state,
    counts: {},
    totalClicks: 0
  }))
);
