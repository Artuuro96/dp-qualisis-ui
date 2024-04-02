import { OrderStatus } from "../enum/order-status.enum"

export interface Order {
  deleted: boolean,
  createdAt: string,
  createdBy: string,
  updatedAt: string,
  workerId: string,
  vendorId: string,
  name: string,
  status: OrderStatus,
  description: string,
  endDate: string,
  startDate: string,
}