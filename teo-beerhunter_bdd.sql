-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-teo-beerhunter.alwaysdata.net
-- Generation Time: Jan 23, 2025 at 10:54 AM
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
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `city_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `bar`
--

INSERT INTO `bar` (`id`, `name`, `address`, `latitude`, `longitude`, `rate`, `opening_hours`, `created_at`, `updated_at`, `city_id`) VALUES
(1, 'O\'Collin\'s Irish Pub', '34 Cr Jean Jaurès, 84000 Avignon', 43.9445, 4.80535, 4.4, '\"Monday: 8:00 AM – 1:00 AM\",\r\n\"Tuesday: 8:00 AM – 1:00 AM\",\r\n\"Wednesday: 8:00 AM – 1:00 AM\",\r\n\"Thursday: 8:00 AM – 1:00 AM\",\r\n\"Friday: 8:00 AM – 1:00 AM\",\r\n\"Saturday: 8:00 AM – 1:00 AM\",\r\n\"Sunday: 3:00 PM – 1:00 AM\"', '2025-01-21 08:38:10', '2025-01-21 13:36:57', 1),
(2, 'The Pipeline', '34 Cr Jean Jaurès, 84000 Avignon', 43.9451, 4.8054, 4.4, '\"Monday: 9:00 AM – 0:00 AM\",\r\n\"Tuesday: 9:00 AM – 0:00 AM\",\r\n\"Wednesday: 9:00 AM – 0:00 AM\",\r\n\"Thursday: 9:00 AM – 0:00 AM\",\r\n\"Friday: 9:00 AM – 0:00 AM\",\r\n\"Saturday: 9:00 AM – 0:00 AM\",\r\n\"Sunday: 6:30 PM – 11:30 PM\"', '2025-01-21 08:38:10', '2025-01-21 13:37:03', 1);

-- --------------------------------------------------------

--
-- Table structure for table `bar_city`
--

CREATE TABLE `bar_city` (
  `id` int(11) NOT NULL,
  `bar_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bar_city`
--

INSERT INTO `bar_city` (`id`, `bar_id`, `city_id`) VALUES
(2, 1, 1),
(3, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bar_image`
--

CREATE TABLE `bar_image` (
  `id` int(11) NOT NULL,
  `bar_id` int(11) DEFAULT NULL,
  `image_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bar_image`
--

INSERT INTO `bar_image` (`id`, `bar_id`, `image_link`, `created_at`, `updated_at`) VALUES
(1, 1, '\\public\\assets\\images\\bar-images\\ocollins-pub-avignon.png', '2025-01-21 09:06:08', '2025-01-21 09:06:08');

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

--
-- Dumping data for table `beer`
--

INSERT INTO `beer` (`id`, `name`, `subtitle`, `alcool_degree`, `description`, `image_link`, `beer_type_id`, `created_at`, `updated_at`) VALUES
(2, 'Heineken', NULL, 4.5, 'Bière Hollandaise', '', 1, '2025-01-21 08:32:31', '2025-01-21 08:32:31'),
(3, 'Chimay', 'Chimay blanche', 4.5, 'Bière d\'abbaye belge blanche', '', 5, '2025-01-21 08:33:55', '2025-01-21 08:33:55'),
(4, 'Pelforth', 'Pelfforth brune', 5, 'Bière brune française', '', 6, '2025-01-21 08:34:55', '2025-01-21 08:34:55'),
(5, 'Eku Kulminator', 'Eku Kulminator', 28, 'Bière allamande brune ', '', 6, '2025-01-21 08:36:21', '2025-01-21 08:36:21');

-- --------------------------------------------------------

--
-- Table structure for table `beer_available`
--

CREATE TABLE `beer_available` (
  `id` int(11) NOT NULL,
  `bar_id` int(11) DEFAULT NULL,
  `beer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `beer_available`
--

INSERT INTO `beer_available` (`id`, `bar_id`, `beer_id`) VALUES
(1, 1, 2),
(2, 1, 4),
(5, 1, 5),
(6, 2, 2);

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

--
-- Dumping data for table `beer_type`
--

INSERT INTO `beer_type` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Blonde', '2025-01-21 08:28:41', '2025-01-21 08:28:41'),
(5, 'Blanche', '2025-01-21 08:30:49', '2025-01-21 08:30:49'),
(6, 'Brune', '2025-01-21 08:31:09', '2025-01-21 08:31:09');

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `region` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `name`, `region`) VALUES
(1, 'AVIGNON', 84),
(2, 'VALENCE', 26),
(3, 'MARSEILLE', 13),
(4, 'AIX EN PROVENCE', 13);

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

--
-- Dumping data for table `comment_image`
--

INSERT INTO `comment_image` (`id`, `image_link`, `image_alt`, `user_comment_id`, `created_at`, `updated_at`) VALUES
(1, 'assets\\images\\bar-images\\ocollins-pub-avignon.png', 'photo bar irlandais', 2, '2025-01-21 14:09:59', '2025-01-21 14:40:25');

-- --------------------------------------------------------

--
-- Table structure for table `favorite_bar`
--

CREATE TABLE `favorite_bar` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `bar_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `favorite_bar`
--

INSERT INTO `favorite_bar` (`id`, `user_id`, `bar_id`) VALUES
(1, 4, 1),
(2, 4, 2),
(3, 1, 1),
(4, 17, 2);

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
  `profil_picture` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `birth_date`, `password`, `address`, `city`, `name`, `theme`, `profil_picture`, `created_at`, `updated_at`) VALUES
(1, 'test@test.com', '1994-07-13', 'test', '6 allée des peupliers', 'aix-en-provence', 'test name', 'dark', '', '2025-01-21 08:32:07', '2025-01-21 08:32:07'),
(3, 'test@gmail.com', '1995-01-12', 'test', 'test rue test', 'marseille', 'test2', 'dark', '', '2025-01-21 08:34:40', '2025-01-21 08:34:40'),
(4, 'emailtest@gmail.com', '2025-01-01', 'test', '3 rue des radis', 'paris', 'oulou3', 'light', '', '2025-01-21 08:34:40', '2025-01-21 08:34:40'),
(17, 'tessssst@test.fr', '0000-00-00', 'eE1!popopopoP', NULL, 'AIX EN PROVENCE', 'test name', 'light', '', '2025-01-22 14:36:30', '2025-01-22 14:36:30'),
(18, 'tessssst@toest.fr', '1994-06-23', 'eE1!popopopoP', NULL, 'AIX EN PROVENCE', 'test name', 'light', '', '2025-01-22 14:45:19', '2025-01-22 14:45:19');

-- --------------------------------------------------------

--
-- Table structure for table `user_comment`
--

CREATE TABLE `user_comment` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `rate` float NOT NULL CHECK (`rate` >= 0 and `rate` <= 5),
  `comment_image_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `bar_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `user_comment`
--

INSERT INTO `user_comment` (`id`, `text`, `rate`, `comment_image_id`, `user_id`, `bar_id`, `created_at`, `updated_at`) VALUES
(2, 'Pub Irlandais modifié', 4, NULL, 4, 1, '2025-01-21 08:44:18', '2025-01-23 08:29:35'),
(4, 'Ambiance très moyenne , bagarres fréquentes', 1, NULL, 3, 2, '2025-01-21 08:47:46', '2025-01-21 08:47:46'),
(5, 'bloubloublou', 1, NULL, 1, 1, '2025-01-22 14:19:57', '2025-01-22 14:19:57'),
(7, 'tessssst', 5, NULL, 1, 2, '2025-01-22 14:25:12', '2025-01-22 14:25:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bar`
--
ALTER TABLE `bar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_city_id` (`city_id`);

--
-- Indexes for table `bar_city`
--
ALTER TABLE `bar_city`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bar_id` (`bar_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indexes for table `bar_image`
--
ALTER TABLE `bar_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bar_id` (`bar_id`);

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
  ADD KEY `bar_id` (`bar_id`),
  ADD KEY `bar_id_2` (`bar_id`);

--
-- Indexes for table `beer_type`
--
ALTER TABLE `beer_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bar_city`
--
ALTER TABLE `bar_city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bar_image`
--
ALTER TABLE `bar_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `beer`
--
ALTER TABLE `beer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `beer_available`
--
ALTER TABLE `beer_available`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `beer_type`
--
ALTER TABLE `beer_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `comment_image`
--
ALTER TABLE `comment_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `favorite_bar`
--
ALTER TABLE `favorite_bar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user_comment`
--
ALTER TABLE `user_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bar`
--
ALTER TABLE `bar`
  ADD CONSTRAINT `fk_city_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bar_city`
--
ALTER TABLE `bar_city`
  ADD CONSTRAINT `bar_city_ibfk_1` FOREIGN KEY (`bar_id`) REFERENCES `bar` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bar_city_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bar_image`
--
ALTER TABLE `bar_image`
  ADD CONSTRAINT `bar_image_ibfk_1` FOREIGN KEY (`bar_id`) REFERENCES `bar` (`id`) ON DELETE CASCADE;

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
