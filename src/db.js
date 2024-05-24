import Dexie from 'dexie';

const db = new Dexie('GameDatabase');
db.version(1).stores({
  games: '++id, title, playerNames, scores, currentRound, gameMode',
});

export default db;
