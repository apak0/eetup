import { Socket } from 'socket.io'

import { User } from '@/lib/database/schema'

export interface SocketType extends Socket {
  currentRoom: string
  user: User
}
