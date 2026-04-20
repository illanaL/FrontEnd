import type { StatusRequest } from "../../data/data"

export type ClientRequest = {
  id: string
  userId: string
  firstName: string
  lastName: string
  phone: string
  email: string
  addressRequest: {
    number: string
    street: string
    zipCode: string
    city: string
  }
  description: string
  photos?: string[]
  preferredDate?: string  
  isUrgent: boolean
  status: StatusRequest
  createdAt?: string      
}