/**
 * Incremental migration: Add Shops and Products collections.
 * Use this when the DB already has pages, posts, orders, partners, etc.
 * Run: npx payload migrate
 */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add shops_id and products_id to payload_locked_documents_rels
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "shops_id" integer`);
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "products_id" integer`);

  // Create enums for products
  await db.execute(sql`DO $$ BEGIN
    CREATE TYPE "public"."enum_products_badge" AS ENUM('new', 'bestseller', 'sale');
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
  await db.execute(sql`DO $$ BEGIN
    CREATE TYPE "public"."enum_products_filter_category" AS ENUM('all', 'new', 'bestseller', 'sale', 'everyday', 'formal');
  EXCEPTION WHEN duplicate_object THEN null; END $$`);

  // Create shops tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "shops_gallery" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "shops_specialties" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "shops" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "generate_slug" boolean DEFAULT true,
      "slug" varchar NOT NULL,
      "tagline" varchar,
      "location_city" varchar,
      "location_neighborhood" varchar,
      "location_address" varchar,
      "location_map_url" varchar,
      "contact_phone" varchar,
      "contact_whatsapp" varchar,
      "contact_instagram" varchar,
      "contact_facebook" varchar,
      "story" varchar,
      "established" varchar,
      "image_id" integer,
      "hours_weekdays" varchar,
      "hours_saturday" varchar,
      "hours_sunday" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "shops_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "products_id" integer
    )
  `);

  // Create products tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "products_colors" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "color" varchar
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "products_sizes" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "size" varchar
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "products" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "generate_slug" boolean DEFAULT true,
      "slug" varchar NOT NULL,
      "price" varchar NOT NULL,
      "original_price" varchar,
      "image_id" integer,
      "image_url" varchar,
      "badge" "enum_products_badge",
      "featured" boolean DEFAULT false,
      "lookbook_featured" boolean DEFAULT false,
      "filter_category" "enum_products_filter_category",
      "shop_id" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    )
  `);

  // Add FKs if tables/cols exist (idempotent)
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "shops_gallery" ADD CONSTRAINT "shops_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "shops_gallery" ADD CONSTRAINT "shops_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "shops_specialties" ADD CONSTRAINT "shops_specialties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "shops" ADD CONSTRAINT "shops_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "shops_rels" ADD CONSTRAINT "shops_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "shops_rels" ADD CONSTRAINT "shops_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "products_colors" ADD CONSTRAINT "products_colors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "products_sizes" ADD CONSTRAINT "products_sizes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "products" ADD CONSTRAINT "products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "products" ADD CONSTRAINT "products_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."shops"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shops_fk" FOREIGN KEY ("shops_id") REFERENCES "public"."shops"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
  await db.execute(sql`DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null; END $$`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove FKs first
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_products_fk`);
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_shops_fk`);
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "products_id"`);
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "shops_id"`);
  await db.execute(sql`DROP TABLE IF EXISTS "products_colors" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "products_sizes" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "products" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "shops_rels" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "shops_gallery" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "shops_specialties" CASCADE`);
  await db.execute(sql`DROP TABLE IF EXISTS "shops" CASCADE`);
  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum_products_filter_category"`);
  await db.execute(sql`DROP TYPE IF EXISTS "public"."enum_products_badge"`);
}
