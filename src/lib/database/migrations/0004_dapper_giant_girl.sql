CREATE TABLE "eetup-dev"."category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"company_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "eetup-dev"."category" ADD CONSTRAINT "category_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "eetup-dev"."company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" DROP COLUMN "categories";