ALTER TABLE `user` ADD `isOwner` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `character`;