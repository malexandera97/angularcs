import { itemReducer, initialState } from './item.reducer';
import * as ItemActions from './item.actions';

describe('Item Reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'Unknown' };
    const state = itemReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  describe('addItem action', () => {
    it('should add a new item with correct id and name', () => {
      const action = ItemActions.addItem({ name: 'Nuevo Elemento' });
      const state = itemReducer(initialState, action);

      expect(state.items.length).toBe(3);
      expect(state.items[2]).toEqual({
        id: 3,
        name: 'Nuevo Elemento',
        upvotes: 0,
        downvotes: 0
      });
      expect(state.nextId).toBe(4);
    });

    it('should increment nextId correctly', () => {
      let state = itemReducer(initialState, ItemActions.addItem({ name: 'Item 1' }));
      state = itemReducer(state, ItemActions.addItem({ name: 'Item 2' }));

      expect(state.items.length).toBe(4);
      expect(state.items[3]).toEqual({
        id: 4,
        name: 'Item 2',
        upvotes: 0,
        downvotes: 0
      });
      expect(state.nextId).toBe(5);
    });

    it('should not mutate the original state', () => {
      const action = ItemActions.addItem({ name: 'Test Item' });
      const newState = itemReducer(initialState, action);

      expect(newState).not.toBe(initialState);
      expect(newState.items).not.toBe(initialState.items);
      expect(initialState.items.length).toBe(2);
    });
  });

  describe('removeItem action', () => {
    it('should remove an item by id', () => {
      const action = ItemActions.removeItem({ id: 1 });
      const state = itemReducer(initialState, action);

      expect(state.items.length).toBe(1);
      expect(state.items.find(item => item.id === 1)).toBeUndefined();
      expect(state.items[0].id).toBe(2);
    });

    it('should not change state if item id does not exist', () => {
      const action = ItemActions.removeItem({ id: 999 });
      const state = itemReducer(initialState, action);

      expect(state.items.length).toBe(2);
      expect(state).toEqual(initialState);
    });

    it('should not mutate the original state', () => {
      const action = ItemActions.removeItem({ id: 1 });
      const newState = itemReducer(initialState, action);

      expect(newState).not.toBe(initialState);
      expect(newState.items).not.toBe(initialState.items);
    });
  });

  describe('upvoteItem action', () => {
    it('should increment upvotes for the correct item', () => {
      const action = ItemActions.upvoteItem({ id: 1 });
      const state = itemReducer(initialState, action);

      expect(state.items[0].upvotes).toBe(1);
      expect(state.items[1].upvotes).toBe(0);
    });

    it('should handle multiple upvotes on the same item', () => {
      let state = itemReducer(initialState, ItemActions.upvoteItem({ id: 1 }));
      state = itemReducer(state, ItemActions.upvoteItem({ id: 1 }));

      expect(state.items[0].upvotes).toBe(2);
    });

    it('should not change other items', () => {
      const action = ItemActions.upvoteItem({ id: 1 });
      const state = itemReducer(initialState, action);

      expect(state.items[1]).toEqual(initialState.items[1]);
    });

    it('should not mutate the original state', () => {
      const action = ItemActions.upvoteItem({ id: 1 });
      const newState = itemReducer(initialState, action);

      expect(newState).not.toBe(initialState);
      expect(newState.items).not.toBe(initialState.items);
      expect(newState.items[0]).not.toBe(initialState.items[0]);
    });
  });

  describe('downvoteItem action', () => {
    it('should increment downvotes for the correct item', () => {
      const action = ItemActions.downvoteItem({ id: 1 });
      const state = itemReducer(initialState, action);

      expect(state.items[0].downvotes).toBe(1);
      expect(state.items[1].downvotes).toBe(0);
    });

    it('should handle multiple downvotes on the same item', () => {
      let state = itemReducer(initialState, ItemActions.downvoteItem({ id: 2 }));
      state = itemReducer(state, ItemActions.downvoteItem({ id: 2 }));

      expect(state.items[1].downvotes).toBe(2);
    });

    it('should not change other items', () => {
      const action = ItemActions.downvoteItem({ id: 2 });
      const state = itemReducer(initialState, action);

      expect(state.items[0]).toEqual(initialState.items[0]);
    });

    it('should not mutate the original state', () => {
      const action = ItemActions.downvoteItem({ id: 2 });
      const newState = itemReducer(initialState, action);

      expect(newState).not.toBe(initialState);
      expect(newState.items).not.toBe(initialState.items);
      expect(newState.items[1]).not.toBe(initialState.items[1]);
    });
  });

  describe('reducer purity', () => {
    it('should return the same result for the same input', () => {
      const action1 = ItemActions.addItem({ name: 'Test' });
      const action2 = ItemActions.addItem({ name: 'Test' });

      const state1 = itemReducer(initialState, action1);
      const state2 = itemReducer(initialState, action2);

      expect(state1).toEqual(state2);
      expect(state1).not.toBe(state2);
    });

    it('should not have side effects', () => {
      const originalState = { ...initialState };
      const action = ItemActions.addItem({ name: 'Test' });

      itemReducer(initialState, action);

      expect(initialState).toEqual(originalState);
    });
  });
});
