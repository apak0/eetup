ALTER TABLE "eetup-dev"."company" ALTER COLUMN "bannedPostcodes" SET DATA TYPE varchar[];--> statement-breakpoint
ALTER TABLE "eetup-dev"."product" ALTER COLUMN "description" SET DATA TYPE varchar(1000);--> statement-breakpoint
ALTER TABLE "eetup-dev"."product" ALTER COLUMN "image" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "categories" varchar[];