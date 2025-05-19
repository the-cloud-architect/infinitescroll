CREATE TABLE "video" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"thumbs_up" integer DEFAULT 0 NOT NULL,
	"thumbs_down" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"video_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_comment" ADD CONSTRAINT "video_comment_video_id_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_comment" ADD CONSTRAINT "video_comment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_video_created" ON "video" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_comment_video" ON "video_comment" USING btree ("video_id");