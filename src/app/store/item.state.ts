export interface Item {
  id: number;
  name: string;
  upvotes: number;
  downvotes: number;
}

export interface ItemState {
  items: Item[];
  nextId: number;
}
