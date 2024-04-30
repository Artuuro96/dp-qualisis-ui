export interface Client {
  _id: string;
  deleted: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  name: string;
}