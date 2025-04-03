ALTER TABLE `user` ADD `firstName` text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `lastName` text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `name`;