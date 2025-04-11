ALTER TABLE "eetup-dev"."company" RENAME COLUMN "name" TO "organization";--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."company_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "cocId" varchar(255);--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "tel" varchar(255);--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "postcode" varchar(255);--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "city" varchar(255);--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "street" varchar(255);--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "houseNumber" varchar(255);--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "houseNumberAddition" varchar(255);--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "bannedPostcodes" varchar(255)[];--> statement-breakpoint
ALTER TABLE "eetup-dev"."user" ADD COLUMN "tel" varchar(255);--> statement-breakpoint
ALTER TABLE "eetup-dev"."user" ADD COLUMN "postcode" varchar(255);--> statement-breakpoint
ALTER TABLE "eetup-dev"."user" ADD COLUMN "city" varchar(255);--> statement-breakpoint
ALTER TABLE "eetup-dev"."user" ADD COLUMN "street" varchar(255);--> statement-breakpoint
ALTER TABLE "eetup-dev"."user" ADD COLUMN "houseNumber" varchar(255);--> statement-breakpoint
ALTER TABLE "eetup-dev"."user" ADD COLUMN "houseNumberAddition" varchar(255);