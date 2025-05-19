CREATE TABLE "direct_message" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender_id" text NOT NULL,
	"receiver_id" text NOT NULL,
	"message" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "username" text;--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "direct_message" ADD CONSTRAINT "direct_message_sender_id_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "direct_message" ADD CONSTRAINT "direct_message_receiver_id_user_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_dm_sender" ON "direct_message" USING btree ("sender_id");--> statement-breakpoint
CREATE INDEX "idx_dm_receiver" ON "direct_message" USING btree ("receiver_id");--> statement-breakpoint
CREATE INDEX "idx_dm_created" ON "direct_message" USING btree ("created_at");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");