import { Client } from '../types/client.interface';

export interface Entry {
  createdAt: string,
  createdBy: CreatedBy
  updatedAt: string,
  clientId: string,
  description: string,
  entryNumber: string,
  client: Client,
  _id: string;
}


interface CreatedBy {
  name: string, 
  id: string, 
  username:string 
}