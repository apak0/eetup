import { User } from "@/app/lib/schema";
import { Socket } from "socket.io";

export interface SocketType extends Socket {
  currentRoom: string;
  user: User;
}
