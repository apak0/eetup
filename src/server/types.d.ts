import { User } from '@/app/lib/db/schema'
import { Socket } from 'socket.io'

export interface SocketType extends Socket {
  currentRoom: string
  user: User
}
