import { pgTable, serial, text, timestamp, integer, pgEnum, jsonb } from 'drizzle-orm/pg-core';

export const matchStatusEnum = pgEnum('match_status', ['scheduled', 'live', 'finished']) ;

export const matches = pgTable('matches', {
  id: serial('id').primaryKey(),
  sport: text('sport').notNull(),
  homeTeam: text('home_team').notNull(),
  awayTeam: text('away_team').notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  status: matchStatusEnum().notNull().default('scheduled'),
  createdAt: timestamp('created_at').defaultNow(),
  homeScore: integer('home_score').default(0).notNull(),
  awayScore: integer('away_score').default(0).notNull(),

});

export const commentry = pgTable('commentry', {
  id: serial('id').primaryKey(),
  matchId: integer('match_id').notNull()
  .references(() => matches.id),
  comment: text('comment').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  minute: integer('minute'),
  sequence: integer('sequence').notNull(),
  period: text('period'),
  eventType: text('event_type'),
  actor: text('actor'),
  team: text('team'),
  message: text('message'),
  metadata: jsonb('metadata'),
  tags: text('tags').array(),

})

// 1. schema design
// 2. then generate migration using drizzle-kit
// 3. then run the migration to create the tables in the database
