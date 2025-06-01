CREATE TABLE "eetup-dev"."product_tag" (
	"productId" integer NOT NULL,
	"tagId" integer NOT NULL,
	CONSTRAINT "product_tag_productId_tagId_pk" PRIMARY KEY("productId","tagId")
);
--> statement-breakpoint
CREATE TABLE "eetup-dev"."tag" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."tag_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"company_id" integer,
	CONSTRAINT "tag_company_id_name_unique" UNIQUE("company_id","name")
);
--> statement-breakpoint
ALTER TABLE "eetup-dev"."category" DROP CONSTRAINT "category_company_id_company_id_fk";
--> statement-breakpoint
ALTER TABLE "eetup-dev"."product" DROP CONSTRAINT "product_company_id_company_id_fk";
--> statement-breakpoint
ALTER TABLE "eetup-dev"."product" ADD COLUMN "categoryId" integer;--> statement-breakpoint
ALTER TABLE "eetup-dev"."product_tag" ADD CONSTRAINT "product_tag_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "eetup-dev"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eetup-dev"."product_tag" ADD CONSTRAINT "product_tag_tagId_tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "eetup-dev"."tag"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eetup-dev"."tag" ADD CONSTRAINT "tag_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "eetup-dev"."company"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eetup-dev"."category" ADD CONSTRAINT "category_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "eetup-dev"."company"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eetup-dev"."product" ADD CONSTRAINT "product_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "eetup-dev"."category"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eetup-dev"."product" ADD CONSTRAINT "product_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "eetup-dev"."company"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eetup-dev"."product" DROP COLUMN "categories";--> statement-breakpoint
ALTER TABLE "eetup-dev"."category" ADD CONSTRAINT "category_company_id_name_unique" UNIQUE("company_id","name");--> statement-breakpoint
ALTER TABLE "eetup-dev"."product" ADD CONSTRAINT "product_company_id_name_unique" UNIQUE("company_id","name");