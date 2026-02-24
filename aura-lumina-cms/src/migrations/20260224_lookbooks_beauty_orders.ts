/**
 * Incremental migration: Add Lookbooks, Lookbook Products, Beauty Products;
 * add selected_color to orders. Safe to run on DB that already has existing tables.
 */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Orders: add selected_color column
  await db.execute(sql`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "selected_color" varchar`)

  // 2. Enum for lookbook_products badge (skip if already exists)
  await db.execute(sql`DO $$ BEGIN
    CREATE TYPE "public"."enum_lookbook_products_badge" AS ENUM('none', 'new', 'bestseller', 'sale');
  EXCEPTION WHEN duplicate_object THEN null; END $$`)

  // 3. Lookbooks table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "lookbooks" (
      "id" serial PRIMARY KEY NOT NULL,
      "title_key" varchar NOT NULL,
      "desc_key" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "image_id" integer,
      "image_url" varchar,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    )
  `)

  // 4. Lookbook products array tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "lookbook_products_sizes" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "size" varchar
    )
  `)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "lookbook_products_colors" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "color" varchar
    )
  `)

  // 5. Lookbook products table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "lookbook_products" (
      "id" serial PRIMARY KEY NOT NULL,
      "lookbook_id" integer NOT NULL,
      "name" varchar NOT NULL,
      "price" varchar NOT NULL,
      "image_id" integer,
      "image_url" varchar,
      "badge" "enum_lookbook_products_badge",
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    )
  `)
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "lookbook_products" ADD CONSTRAINT "lookbook_products_lookbook_id_lookbooks_id_fk" FOREIGN KEY ("lookbook_id") REFERENCES "public"."lookbooks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`)

  // 6. Beauty products table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "beauty_products" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "brand" varchar NOT NULL,
      "price" varchar NOT NULL,
      "image_id" integer,
      "image_url" varchar,
      "featured" boolean DEFAULT true,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    )
  `)

  // 7. Payload locked documents rels: columns for new collections
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "lookbooks_id" integer`)
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "lookbook_products_id" integer`)
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "beauty_products_id" integer`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "beauty_products_id"`)
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "lookbook_products_id"`)
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "lookbooks_id"`)
  await db.execute(sql`DROP TABLE IF EXISTS "beauty_products"`)
  await db.execute(sql`DROP TABLE IF EXISTS "lookbook_products"`)
  await db.execute(sql`DROP TABLE IF EXISTS "lookbook_products_colors"`)
  await db.execute(sql`DROP TABLE IF EXISTS "lookbook_products_sizes"`)
  await db.execute(sql`DROP TABLE IF EXISTS "lookbooks"`)
  await db.execute(sql`ALTER TABLE "orders" DROP COLUMN IF EXISTS "selected_color"`)
  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum_lookbook_products_badge"`)
}
