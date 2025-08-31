import { createAction, props } from '@ngrx/store';

export const updateTrackingCount = createAction(
  '[Tracking] Update Count',
  props<{ tag: string }>()
);

export const resetTrackingCounts = createAction(
  '[Tracking] Reset Counts'
);
