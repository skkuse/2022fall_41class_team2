CREATE TABLE `lectures` (
  `lecture_id` int PRIMARY KEY,
  `name` varchar(255),
  `instructor_id` int
);

CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `nickname` varchar(255),
  `oauth_id` varchar(255),
  `name` varchar(255),
  `eamil` varchar(255),
  `created_at` timestamp DEFAULT (now()),
  `last_login` timestamp DEFAULT (now()),
  `profile_image_url` varchar(255),
  `github_api_url` varchar(255),
  `github_profile_url` varchar(255)
);

CREATE TABLE `enrollments` (
  `enrollment_id` int PRIMARY KEY AUTO_INCREMENT,
  `student_id` int,
  `lecture_id` int,
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `assignments` (
  `assignment_id` int PRIMARY KEY AUTO_INCREMENT,
  `lecture_id` int,
  `name` varchar(255),
  `deadline` timestamp DEFAULT (now()),
  `question` varchar(255),
  `constraints` varchar(255),
  `language, skeleton_content` json,
  `language, answer_content` json
);

CREATE TABLE `testcases` (
  `testcase_id` int PRIMARY KEY AUTO_INCREMENT,
  `assignment_id` int,
  `created_at` timestamp DEFAULT (now()),
  `input` varchar(255),
  `output` varchar(255),
  `hidden` boolean DEFAULT true
);

CREATE TABLE `repo` (
  `repo_id` int PRIMARY KEY AUTO_INCREMENT,
  `author_id` int,
  `assignment_id` int,
  `created_at` timestamp DEFAULT (now()),
  `modified_at` timestamp DEFAULT (now()),
  `language, content` json
);

CREATE TABLE `result` (
  `result_id` int PRIMARY KEY AUTO_INCREMENT,
  `repo_id` int,
  `code_description` varchar(255),
  `references` json
);

CREATE TABLE `functionality_result` (
  `functionality_result_id` int PRIMARY KEY AUTO_INCREMENT,
  `result_id` int,
  `testcase_results` json
);

CREATE TABLE `plagiarism_result` (
  `plagiarism_result_id` int PRIMARY KEY AUTO_INCREMENT,
  `result_id` int,
  `num_files` int,
  `similarity_score` int
);

CREATE TABLE `efficiency_result` (
  `efficiency_result_id` int PRIMARY KEY AUTO_INCREMENT,
  `result_id` int,
  `loc_score` int,
  `dataflow_complexity_score` int,
  `controlflow_complexity_score` int,
  `reservation_words_score` int
);

CREATE TABLE `readability_result` (
  `readability_result_id` int PRIMARY KEY AUTO_INCREMENT,
  `result_id` int,
  `pylint_result` int,
  `mypy_result` int,
  `pycodestyle_result` int
);

ALTER TABLE `lectures` ADD FOREIGN KEY (`instructor_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `enrollments` ADD FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `enrollments` ADD FOREIGN KEY (`lecture_id`) REFERENCES `lectures` (`lecture_id`);

ALTER TABLE `assignments` ADD FOREIGN KEY (`lecture_id`) REFERENCES `lectures` (`lecture_id`);

ALTER TABLE `testcases` ADD FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`);

ALTER TABLE `repo` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `repo` ADD FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`);

ALTER TABLE `result` ADD FOREIGN KEY (`repo_id`) REFERENCES `repo` (`repo_id`);

ALTER TABLE `functionality_result` ADD FOREIGN KEY (`result_id`) REFERENCES `result` (`result_id`);

ALTER TABLE `plagiarism_result` ADD FOREIGN KEY (`result_id`) REFERENCES `result` (`result_id`);

ALTER TABLE `efficiency_result` ADD FOREIGN KEY (`result_id`) REFERENCES `result` (`result_id`);

ALTER TABLE `readability_result` ADD FOREIGN KEY (`result_id`) REFERENCES `result` (`result_id`);
