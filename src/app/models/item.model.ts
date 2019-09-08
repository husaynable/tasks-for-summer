export interface ItemModel {
  id?: string;
  name: string;
  timestamp: any;
  type: 'drinks' | 'movies';
  attachmentUrl?: string;
}
