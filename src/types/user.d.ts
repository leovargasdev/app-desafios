import { Types } from 'mongoose'

export type UserRole = 'admin' | 'participant'

export interface User {
  _id: Types.ObjectId
  name: string
  email: string
  bio: string
  image?: string
  role: UserRole
  challenges: string[]
  solutions_like: Types.ObjectId[]
}
