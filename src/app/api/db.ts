// TODO: Move to secrets

// TODO: In-memory user storage, switch to database
export const users: any = {
  'apakmahmud@gmail.com': {
    email: 'apakmahmud@gmail.com',
    username: 'Apak',
    password: '$2b$10$JzZHaPdukEhqXD4kmEk2CumvdZyGGEisgfuYROvKGS.rN7Q6s6OJ.',
    character: 'vikingHammerMan',
  },
  'jin@gmail.com': {
    email: 'jin@gmail.com',
    username: 'Jin',
    password: '$2b$10$JzZHaPdukEhqXD4kmEk2CumvdZyGGEisgfuYROvKGS.rN7Q6s6OJ.',
    character: 'demonKnight',
  },
}

export const rooms: {
  [k: string]: {
    [k: string]: any
  }
} = {}
