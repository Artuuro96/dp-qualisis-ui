import { format } from "date-fns"
import { es } from "date-fns/locale"

export const formatFullMXDate = (date: string): string => {
  return format(new Date(date), 'EEEE d \'de\' MMMM \'de\' yyyy', { locale: es }) || '';
}

export const formatDate = (date: string): string => {
  return format(new Date(date), "MM/dd/yyyy", { locale: es });  
}