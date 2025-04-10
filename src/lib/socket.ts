"use client";

import { io } from "socket.io-client";

export const connectRoom = (jwt?: string) => {
  const socket = io("", {
    auth: {
      token: jwt,
    },
  });

  return socket;
};
