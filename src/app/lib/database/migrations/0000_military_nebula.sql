--> statement-breakpoint
CREATE TABLE "chain-store-1"."company" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	CONSTRAINT "company_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "chain-store-1"."user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "chain-store-1"."user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"password" varchar(255) NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"isOwner" integer DEFAULT 0 NOT NULL,
	"companyId" integer NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "chain-store-1"."user" ADD CONSTRAINT "user_companyId_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "chain-store-1"."company"("id") ON DELETE cascade ON UPDATE no action;