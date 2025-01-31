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

INSERT INTO bar (id, name, address, latitude, longitude, rate, opening_hours, city_id) VALUES
(1, 'O Collins Irish Pub', '34 Cr Jean Jaurès, 84000 Avignon', 43.9445, 4.80535, 4.4, '\"Monday: 8:00 AM – 1:00 AM\",\r\n\"Tuesday: 8:00 AM – 1:00 AM\",\r\n\"Wednesday: 8:00 AM – 1:00 AM\",\r\n\"Thursday: 8:00 AM – 1:00 AM\",\r\n\"Friday: 8:00 AM – 1:00 AM\",\r\n\"Saturday: 8:00 AM – 1:00 AM\",\r\n\"Sunday: 3:00 PM – 1:00 AM\"', 1433),
(2, 'The Pipeline', '34 Cr Jean Jaurès, 84000 Avignon', 43.9451, 4.8054, 4.4, '\"Monday: 9:00 AM – 0:00 AM\",\r\n\"Tuesday: 9:00 AM – 0:00 AM\",\r\n\"Wednesday: 9:00 AM – 0:00 AM\",\r\n\"Thursday: 9:00 AM – 0:00 AM\",\r\n\"Friday: 9:00 AM – 0:00 AM\",\r\n\"Saturday: 9:00 AM – 0:00 AM\",\r\n\"Sunday: 6:30 PM – 11:30 PM\"', 1433);

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

INSERT INTO bar_city (bar_id, city_id) VALUES
(1, 1433),
(2, 1433);

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

INSERT INTO bar_image (bar_id, image_link) VALUES
(1, '\assets\images\bar-images\ocollins-pub-avignon.png');

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

METTRE IMAGE

INSERT INTO beer (name, subtitle, alcool_degree, description, image_link, beer_type_id) VALUES
('Heineken', 'Bière rafraichissante', 5, 'Bière blonde néerlandaise, légère et rafraîchissante, avec une saveur légèrement fruitée et une amertume modérée.', '/assets/images/beer/heineken-carre.webp', 1),
('Chimay', 'Chimay blanche', 4.5, 'Bière abbaye belge blanche', '/assets/images/beer/chimay-carre.webp', 3),
('Pelforth', 'Pelfforth brune', 5, 'Bière brune française', '/assets/images/beer/pelforth-carre.webp', 2),
('Pelforth', 'Pelfforth française', 5.8, 'Bière Blonde française', '/assets/images/beer/pelforth-carre.webp', 1),
('Eku Kulminator', 'Eku Kulminator', 28, 'Bière allamande brune ', '/assets/images/beer/eku-carre.webp', 2),
('1664', 'Bière Blonde désaltérante', 5.5, 'Bière française emblématique, la 1664 est appréciée pour sa fraîcheur et son caractère désaltérant.', '/assets/images/beer/1664-carre.webp', 1),
('Leffe', 'Bière belge', 6.6, 'Bière d''abbaye belge, la Leffe Blonde est une bière de dégustation, avec des arômes fruités et épicés, et une légère amertume.', '/assets/images/beer/leffe-carre.webp', 1),
('Kronenbourg', 'Bière française', 5.5, 'Bière blonde française, brassée avec du houblon Strisselspalt, offrant des notes fruitées et une amertume délicate.', '/assets/images/beer/kronenbourg-carre.webp', 1),
('Desperados', 'Bière aromatisée', 5.9, 'Bière aromatisée à la tequila, avec des notes d''agrumes et une douceur sucrée, offrant une expérience unique.', '/assets/images/beer/desperados-carre.webp', 10),
('Grimbergen', 'Bière d''abbaye', 6.7, 'Bière d''abbaye belge, la Grimbergen Blonde est légèrement fruitée, offrant un bel équilibre entre douceur et amertume.', '/assets/images/beer/grimbergen-carre.webp', 1),
('Stella Artois', 'Bière belge', 5, 'Bière blonde belge, avec un goût équilibré, une légère amertume et une finale sèche.', '/assets/images/beer/stella-carre.webp', 1),
('Affligem', 'Bière d''abbaye belge', 6.7, 'Bière d''abbaye belge, avec des arômes fruités, une saveur douce et maltée, et une légère amertume en finale.', '/assets/images/beer/affligem-carre.webp', 1),
('Guiness', 'Bière riche, avec des notes de café, de chocolat et de malt grillé', 4.2, 'La Guinness est l''une des stouts les plus reconnues au monde, souvent servie en pression dans les pubs et appréciée pour sa texture et son goût unique. Elle est également la bière la plus consommée en Irlande et est devenue un symbole international de la culture irlandaise. La Guinness est riche, avec des notes de café, de chocolat et de malt grillé, créant une saveur légèrement amère mais bien équilibrée. Elle a un goût rond et doux, avec une finale légèrement sucrée. La bière est également connue pour son crémeux et sa texture veloutée, en grande partie grâce à son procédé de fabrication particulier.', '/assets/images/beer/guiness-carre.webp', 7),
('Chouffe', 'Bière très appréciée pour sa complexité, son équilibre et son côté aromatique.', 8, 'La Chouffe est une bière fruitée, épicée et légèrement sucrée, avec des arômes de banane, de mangue et de coriandre. Elle possède également des notes maltées qui lui donnent un aspect sucré et un arrière-goût légèrement amer, mais équilibré par sa douceur. Sa carbonatation est généreuse, apportant une texture pétillante et agréable.', '/assets/images/beer/chouffe-carre.webp', 11);

-- --------------------------------------------------------

--
-- Table structure for table beer_available
--

CREATE TABLE beer_available (
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

INSERT INTO beer_type (id, name, description) VALUES (11, 'Belgian Strong Ale', 'Le Belgian Strong Ale est un style de bière originaire de Belgique, réputé pour sa forte teneur en alcool et ses saveurs riches et complexes. Ces bières sont souvent muries pendant un certain temps, ce qui permet aux saveurs de se développer et de s’équilibrer. Elles peuvent être un peu sucrées et assez chaudes en raison de la forte teneur en alcool.');
(10, 'Lager', 'Les lagers ont généralement un goût léger, net et équilibré, avec des saveurs maltées qui peuvent être légèrement sucrées ou biscuitées. Elles sont souvent moins amères que les bières comme les IPA (India Pale Ale).');
(6, 'Pilsner', 'Une lager légère et croquante, souvent un peu amère, d''origine tchèque.'),
(7, 'Stout', 'Une bière noire, riche et crémeuse, souvent avec des arômes de café ou de chocolat.'),
(8, 'Porter', 'Une bière sombre, similaire à la stout mais avec des arômes plus doux, souvent de caramel.'),
(9, 'Pale Ale', 'Bière originaire d''Angleterre, qui se caractérise par un goût équilibré entre le malt et le houblon, avec une couleur qui peut varier du doré pâle à l''ambré clair.')



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
