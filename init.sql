CREATE TABLE users (
  id int(10) UNSIGNED NOT NULL,
  email varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  max_score int(10) UNSIGNED NOT NULL DEFAULT '0',
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE users
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY unique_email (`email`);

ALTER TABLE users
  MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

CREATE TABLE user_progress (
    user_id int(10) UNSIGNED PRIMARY KEY,
    completed_sections TEXT NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);