CREATE TABLE "eetup-dev"."account" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."account_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(32) NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"resetToken" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "account_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "eetup-dev"."user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"accountId" integer NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"tel" varchar(255),
	"postcode" varchar(255),
	"city" varchar(255),
	"street" varchar(255),
	"houseNumber" varchar(255),
	"houseNumberAddition" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eetup-dev"."company" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."company_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"accountId" integer NOT NULL,
	"organization" varchar(255) NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"cocId" varchar(255),
	"tel" varchar(255),
	"postcode" varchar(255),
	"city" varchar(255),
	"street" varchar(255),
	"houseNumber" varchar(255),
	"houseNumberAddition" varchar(255),
	"bannedPostcodes" varchar[],
	"minEstimatedDeliveryTime" integer DEFAULT 0 NOT NULL,
	"maxEstimatedDeliveryTime" integer DEFAULT 0 NOT NULL,
	"deliveryFee" numeric DEFAULT '0' NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"lat" double precision,
	"lon" double precision,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eetup-dev"."product" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."product_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"company_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"price" numeric NOT NULL,
	"discountPrice" numeric,
	"image" varchar NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"categoryId" integer,
	"allergens" integer[],
	"dietary" integer[],
	"addCartPreferencesChecked" boolean DEFAULT false NOT NULL,
	"addCartPreferences" jsonb DEFAULT '[]' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_name_unique" UNIQUE("name"),
	CONSTRAINT "product_company_id_name_unique" UNIQUE("company_id","name")
);
--> statement-breakpoint
CREATE TABLE "eetup-dev"."category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"company_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "name_min_length" CHECK (char_length("eetup-dev"."category"."name") >= 2)
);
--> statement-breakpoint
CREATE TABLE "eetup-dev"."tag" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eetup-dev"."tag_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"company_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "name_min_length" CHECK (char_length("eetup-dev"."tag"."name") >= 2)
);
--> statement-breakpoint
ALTER TABLE "eetup-dev"."user" ADD CONSTRAINT "user_accountId_account_id_fk" FOREIGN KEY ("accountId") REFERENCES "eetup-dev"."account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eetup-dev"."company" ADD CONSTRAINT "company_accountId_account_id_fk" FOREIGN KEY ("accountId") REFERENCES "eetup-dev"."account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eetup-dev"."product" ADD CONSTRAINT "product_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "eetup-dev"."company"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eetup-dev"."product" ADD CONSTRAINT "product_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "eetup-dev"."category"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eetup-dev"."category" ADD CONSTRAINT "category_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "eetup-dev"."company"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eetup-dev"."tag" ADD CONSTRAINT "tag_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "eetup-dev"."company"("id") ON DELETE cascade ON UPDATE no action;