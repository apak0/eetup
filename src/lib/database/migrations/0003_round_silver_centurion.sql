CREATE TABLE "eetup-dev"."product" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."product_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"company_id" integer,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"price" numeric NOT NULL,
	"discount_price" numeric NOT NULL,
	"image" varchar(2000) NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"categories" varchar(255)[],
	"allergens" varchar(255)[],
	"dietary" varchar(255)[]
);
--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "minEstimatedDeliveryTime" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "maxEstimatedDeliveryTime" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "deliveryFee" numeric DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD COLUMN "score" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "eetup-dev"."product" ADD CONSTRAINT "product_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "eetup-dev"."company"("id") ON DELETE no action ON UPDATE no action;