-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-teo-beerhunter.alwaysdata.net
-- Generation Time: Jan 21, 2025 at 09:20 AM
-- Server version: 10.11.10-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `teo-beerhunter_bdd`
--

-- --------------------------------------------------------

--
-- Table structure for table `bar`
--

CREATE TABLE `bar` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `rate` float DEFAULT NULL CHECK (`rate` >= 0 and `rate` <= 5),
  `opening_hours` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beer`
--

CREATE TABLE `beer` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `subtitle` varchar(50) DEFAULT NULL,
  `alcool_degree` float NOT NULL,
  `description` text DEFAULT NULL,
  `image_link` varchar(255) NOT NULL,
  `beer_type_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beer_available`
--

CREATE TABLE `beer_available` (
  `id` int(11) NOT NULL,
  `bar_id` int(11) DEFAULT NULL,
  `beer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beer_type`
--

CREATE TABLE `beer_type` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comment_image`
--

CREATE TABLE `comment_image` (
  `id` int(11) NOT NULL,
  `image_link` varchar(2083) NOT NULL,
  `image_alt` varchar(255) DEFAULT NULL,
  `user_comment_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorite_bar`
--

CREATE TABLE `favorite_bar` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `bar_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `theme` enum('dark','light') DEFAULT 'dark',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_comment`
--

CREATE TABLE `user_comment` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `date` date DEFAULT curdate(),
  `rate` float NOT NULL CHECK (`rate` >= 0 and `rate` <= 5),
  `comment_image_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `bar_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bar`
--
ALTER TABLE `bar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `beer`
--
ALTER TABLE `beer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `beer_type_id` (`beer_type_id`);

--
-- Indexes for table `beer_available`
--
ALTER TABLE `beer_available`
  ADD PRIMARY KEY (`id`),
  ADD KEY `beer_id` (`beer_id`),
  ADD KEY `bar_id` (`bar_id`);

--
-- Indexes for table `beer_type`
--
ALTER TABLE `beer_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `comment_image`
--
ALTER TABLE `comment_image`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `image_link` (`image_link`) USING HASH,
  ADD KEY `user_comment_id` (`user_comment_id`);

--
-- Indexes for table `favorite_bar`
--
ALTER TABLE `favorite_bar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `bar_id` (`bar_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_comment`
--
ALTER TABLE `user_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_image_id` (`comment_image_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `bar_id` (`bar_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bar`
--
ALTER TABLE `bar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beer`
--
ALTER TABLE `beer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beer_available`
--
ALTER TABLE `beer_available`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `beer_type`
--
ALTER TABLE `beer_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comment_image`
--
ALTER TABLE `comment_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favorite_bar`
--
ALTER TABLE `favorite_bar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_comment`
--
ALTER TABLE `user_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `beer`
--
ALTER TABLE `beer`
  ADD CONSTRAINT `beer_ibfk_1` FOREIGN KEY (`beer_type_id`) REFERENCES `beer_type` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `beer_ibfk_2` FOREIGN KEY (`beer_type_id`) REFERENCES `beer_type` (`id`),
  ADD CONSTRAINT `beer_ibfk_3` FOREIGN KEY (`beer_type_id`) REFERENCES `beer_type` (`id`);

--
-- Constraints for table `beer_available`
--
ALTER TABLE `beer_available`
  ADD CONSTRAINT `beer_available_ibfk_1` FOREIGN KEY (`bar_id`) REFERENCES `bar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `beer_available_ibfk_2` FOREIGN KEY (`beer_id`) REFERENCES `beer` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `beer_available_ibfk_3` FOREIGN KEY (`bar_id`) REFERENCES `bar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `beer_available_ibfk_4` FOREIGN KEY (`beer_id`) REFERENCES `beer` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `beer_available_ibfk_5` FOREIGN KEY (`bar_id`) REFERENCES `bar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `beer_available_ibfk_6` FOREIGN KEY (`beer_id`) REFERENCES `beer` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comment_image`
--
ALTER TABLE `comment_image`
  ADD CONSTRAINT `comment_image_ibfk_1` FOREIGN KEY (`user_comment_id`) REFERENCES `user_comment` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `favorite_bar`
--
ALTER TABLE `favorite_bar`
  ADD CONSTRAINT `favorite_bar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorite_bar_ibfk_2` FOREIGN KEY (`bar_id`) REFERENCES `bar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorite_bar_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorite_bar_ibfk_4` FOREIGN KEY (`bar_id`) REFERENCES `bar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorite_bar_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorite_bar_ibfk_6` FOREIGN KEY (`bar_id`) REFERENCES `bar` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_comment`
--
ALTER TABLE `user_comment`
  ADD CONSTRAINT `user_comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_comment_ibfk_2` FOREIGN KEY (`bar_id`) REFERENCES `bar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_comment_ibfk_3` FOREIGN KEY (`comment_image_id`) REFERENCES `comment_image` (`id`),
  ADD CONSTRAINT `user_comment_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_comment_ibfk_5` FOREIGN KEY (`bar_id`) REFERENCES `bar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_comment_ibfk_6` FOREIGN KEY (`comment_image_id`) REFERENCES `comment_image` (`id`),
  ADD CONSTRAINT `user_comment_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_comment_ibfk_8` FOREIGN KEY (`bar_id`) REFERENCES `bar` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
