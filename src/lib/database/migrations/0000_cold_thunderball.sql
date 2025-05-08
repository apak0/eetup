--> statement-breakpoint
CREATE TABLE "eetup-dev"."company" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."company_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"organization" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"password" varchar(255),
	"cocId" varchar(255),
	"tel" varchar(255),
	"postcode" varchar(255),
	"city" varchar(255),
	"street" varchar(255),
	"houseNumber" varchar(255),
	"houseNumberAddition" varchar(255),
	"bannedPostcodes" varchar(255)[],
	"emailVerified" boolean DEFAULT false NOT NULL,
	"minEstimatedDeliveryTime" integer DEFAULT 0 NOT NULL,
	"maxEstimatedDeliveryTime" integer DEFAULT 0 NOT NULL,
	"deliveryFee" numeric DEFAULT '0' NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"lat" double precision,
	"lon" double precision,
	CONSTRAINT "company_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "eetup-dev"."product" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."product_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"company_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"price" numeric NOT NULL,
	"discount_price" numeric,
	"image" varchar(2000) NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"categories" integer[],
	"allergens" integer[],
	"dietary" integer[],
	CONSTRAINT "product_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "eetup-dev"."user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"password" varchar(255) NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"tel" varchar(255),
	"postcode" varchar(255),
	"city" varchar(255),
	"street" varchar(255),
	"houseNumber" varchar(255),
	"houseNumberAddition" varchar(255),
	"emailVerified" boolean DEFAULT false NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "eetup-dev"."product" ADD CONSTRAINT "product_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "eetup-dev"."company"("id") ON DELETE no action ON UPDATE no action;