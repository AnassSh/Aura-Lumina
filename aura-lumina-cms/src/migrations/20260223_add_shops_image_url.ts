/**
 * Add imageUrl column to shops for static path fallback.
 * Run: npx payload migrate
 */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "shops" ADD COLUMN IF NOT EXISTS "image_url" varchar`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "shops" DROP COLUMN IF EXISTS "image_url"`)
}
