import { Timestamp } from '@angular/fire/firestore';

export interface ItemModel {
  id?: string;
  name: string;
  timestamp: Timestamp;
  type: string;
  attachmentUrl?: string;
}
