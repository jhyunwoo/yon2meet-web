ALTER TABLE "meets" ADD COLUMN "createdAt" time DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "absolutelyNot" jsonb DEFAULT '[]'::jsonb NOT NULL;