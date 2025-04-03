import { User } from '@/app/lib/database/schema'
import { Socket } from 'socket.io'

export interface SocketType extends Socket {
  currentRoom: string
  user: User
}
