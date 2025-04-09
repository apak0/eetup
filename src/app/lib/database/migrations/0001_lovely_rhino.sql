ALTER TABLE "chain-store-1"."user" ALTER COLUMN "isOwner" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "chain-store-1"."user" ALTER COLUMN "companyId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "chain-store-1"."company" ADD COLUMN "active" boolean DEFAULT false NOT NULL;