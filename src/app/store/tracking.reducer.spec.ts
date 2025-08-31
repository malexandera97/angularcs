import { trackingReducer, initialTrackingState } from './tracking.reducer';
import { updateTrackingCount, resetTrackingCounts } from './tracking.actions';

describe('Tracking Reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'Unknown' };
    const state = trackingReducer(initialTrackingState, action);

    expect(state).toBe(initialTrackingState);
  });

  describe('updateTrackingCount action', () => {
    it('should increment count for a new tag', () => {
      const action = updateTrackingCount({ tag: 'button-click' });
      const state = trackingReducer(initialTrackingState, action);

      expect(state.counts['button-click']).toBe(1);
      expect(state.totalClicks).toBe(1);
    });

    it('should increment count for an existing tag', () => {
      const firstAction = updateTrackingCount({ tag: 'button-click' });
      const intermediateState = trackingReducer(initialTrackingState, firstAction);

      const secondAction = updateTrackingCount({ tag: 'button-click' });
      const finalState = trackingReducer(intermediateState, secondAction);

      expect(finalState.counts['button-click']).toBe(2);
      expect(finalState.totalClicks).toBe(2);
    });

    it('should handle multiple different tags', () => {
      let state = trackingReducer(initialTrackingState, updateTrackingCount({ tag: 'button-1' }));
      state = trackingReducer(state, updateTrackingCount({ tag: 'button-2' }));
      state = trackingReducer(state, updateTrackingCount({ tag: 'button-1' }));

      expect(state.counts['button-1']).toBe(2);
      expect(state.counts['button-2']).toBe(1);
      expect(state.totalClicks).toBe(3);
    });

    it('should not mutate the original state', () => {
      const action = updateTrackingCount({ tag: 'test' });
      const newState = trackingReducer(initialTrackingState, action);

      expect(newState).not.toBe(initialTrackingState);
      expect(newState.counts).not.toBe(initialTrackingState.counts);
      expect(initialTrackingState.counts['test']).toBeUndefined();
    });
  });

  describe('resetTrackingCounts action', () => {
    it('should reset all counts to zero', () => {
      let state = trackingReducer(initialTrackingState, updateTrackingCount({ tag: 'button-1' }));
      state = trackingReducer(state, updateTrackingCount({ tag: 'button-2' }));

      const resetAction = resetTrackingCounts();
      const resetState = trackingReducer(state, resetAction);

      expect(resetState.counts).toEqual({});
      expect(resetState.totalClicks).toBe(0);
    });

    it('should not mutate the original state when resetting', () => {
      const action = resetTrackingCounts();
      const newState = trackingReducer(initialTrackingState, action);

      expect(newState).not.toBe(initialTrackingState);
      expect(initialTrackingState.totalClicks).toBe(0);
    });
  });

  describe('reducer purity', () => {
    it('should return the same state for the same input', () => {
      const action1 = updateTrackingCount({ tag: 'test' });
      const action2 = updateTrackingCount({ tag: 'test' });

      const state1 = trackingReducer(initialTrackingState, action1);
      const state2 = trackingReducer(initialTrackingState, action2);

      expect(state1).toEqual(state2);
      expect(state1).not.toBe(state2); // Different object references
    });

    it('should not have side effects', () => {
      const originalState = { ...initialTrackingState };
      const action = updateTrackingCount({ tag: 'test' });

      trackingReducer(initialTrackingState, action);

      expect(initialTrackingState).toEqual(originalState);
    });
  });
});
