import * as migration_20250801_144447 from './20250801_144447';

export const migrations = [
  {
    up: migration_20250801_144447.up,
    down: migration_20250801_144447.down,
    name: '20250801_144447'
  },
];
