CREATE TABLE IF NOT EXISTS "meets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL,
	"absolutelyNot" jsonb DEFAULT '[]'::jsonb,
	"adjustable" jsonb DEFAULT '[]'::jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meetsToUsers" (
	"userId" text NOT NULL,
	"meetId" uuid NOT NULL,
	CONSTRAINT "meetsToUsers_userId_meetId_pk" PRIMARY KEY("userId","meetId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meetsToUsers" ADD CONSTRAINT "meetsToUsers_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meetsToUsers" ADD CONSTRAINT "meetsToUsers_meetId_meets_id_fk" FOREIGN KEY ("meetId") REFERENCES "public"."meets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
