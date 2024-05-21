import { OrderStatus } from "../enum/order-status.enum"
import { Instrument } from "./instrument.interface"
import { Worker } from "./user.interface"

export interface Order {
  _id: string;
  deleted: boolean,
  createdAt: string,
  createdBy: string,
  updatedAt: string,
  workerId: string,
  vendorId: string,
  vendor?: Worker,
  name: string,
  status: OrderStatus,
  description: string,
  endDate: string,
  startDate: string,
  instruments: Instrument[],
  worker?: Worker,
  creator?: Worker
}