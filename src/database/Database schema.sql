
DELETE DATABASE studysnap;
CREATE DATABASE studysnap;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT auto_increment NOT NULL,
  `date_created` datetime default CURRENT_TIMESTAMP not null,
  `date_modified` datetime default NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subject` (
  `id` INT auto_increment NOT NULL,
  `date_created` datetime default CURRENT_TIMESTAMP not null,
  `date_modified` datetime default NULL,
  `name` varchar(255) NOT NULL,
  `details` text NOT NULL,
  `creator` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject_creator_foreign` (`creator`),
  CONSTRAINT `subject_creator_foreign` FOREIGN KEY (`creator`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `note` (
  `id` INT auto_increment NOT NULL,
  `date_created` datetime default CURRENT_TIMESTAMP not null,
  `date_modified` datetime default NULL,
  `title` varchar(255) NOT NULL,
  `details` mediumtext NOT NULL,
  `is_public` tinyint(1) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `subject_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `section_subject_id_foreign` (`subject_id`),
  CONSTRAINT `section_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `document` (
  `id` INT auto_increment NOT NULL,
  `date_created` datetime default CURRENT_TIMESTAMP not null,
  `date_modified` datetime default NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `note_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `note_section_id_foreign` (`note_id`),
  CONSTRAINT `note_section_id_foreign` FOREIGN KEY (`note_id`) REFERENCES `note` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `likes` (
  `date_created` datetime default CURRENT_TIMESTAMP not null,
  `user_id` int NOT NULL,
  `note_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `note_id`),
  KEY `likes_note_id_foreign` (`note_id`),
  KEY `likes_user_id_foreign` (`user_id`),
  CONSTRAINT `likes_note_id_foreign` FOREIGN KEY (`note_id`) REFERENCES `note` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
