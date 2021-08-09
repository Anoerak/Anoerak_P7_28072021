-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 09, 2021 at 03:52 PM
-- Server version: 8.0.25
-- PHP Version: 7.3.24-(to be removed in future macOS)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groupomania`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int UNSIGNED NOT NULL,
  `postId` int NOT NULL,
  `authorName` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `message` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `authorId` int DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `postId`, `authorName`, `message`, `authorId`, `date`) VALUES
(37, 2, 'seb', 'Bonjour à tous !!', 15, '2021-08-03 08:01:28'),
(39, 2, 'pierre', 'Bonjour à vous deux !', 13, '2021-08-03 08:28:28'),
(40, 3, 'pierre', 'On a déjà bossé ensemble ;)', 13, '2021-08-04 10:33:28'),
(54, 3, 'seb', 'Qui veut me rejoindre aux RH ?', 15, '2021-08-06 15:28:28'),
(85, 3, 'seb', 'Quelle est l\'ambiance dans votre service ?', 15, '2021-08-08 13:05:58'),
(86, 3, 'seb', 'Parce qu\'ici c\'est parfait :) !!!', 15, '2021-08-08 13:07:09'),
(91, 13, 'David', 'Bonjour, Vous partez cette année ?', 16, '2021-08-08 14:37:53'),
(92, 11, 'David', 'Quel est le sujet ?', 16, '2021-08-08 14:38:17'),
(93, 6, 'David', 'Dispo !!! On va a Central Perk ??', 16, '2021-08-08 14:38:49'),
(94, 13, 'pierre', 'On va tenter Budapest :) Et toi ?', 13, '2021-08-08 14:39:33'),
(95, 12, 'pierre', 'Quelqu\'un possède un projecteur ?', 13, '2021-08-08 14:40:03'),
(96, 11, 'pierre', 'Aucune idée mais s\'il y a du sport, alors banco !!!!', 13, '2021-08-08 14:40:39'),
(97, 6, 'pierre', '+1', 13, '2021-08-08 14:40:59'),
(98, 13, 'seb', 'Nous on va visiter Amsterdam :) Pour les tulipes évidemment ;)', 15, '2021-08-08 14:41:51'),
(99, 12, 'seb', 'Moi !!! On peut meme faire ça dehors !!', 15, '2021-08-08 14:42:19'),
(100, 11, 'seb', 'Le passe sanitaire ;)', 15, '2021-08-08 14:42:42'),
(102, 2, 'seb', 'Drink up me Hearties, on va boire un verre à Central Perk en débauchant, qui m\'aime nous suives :) !!!', 15, '2021-08-08 14:45:04'),
(106, 14, 'David', 'Déjà validé mais je revalide ici pour être sûr de ne pas passer à côté ;)', 16, '2021-08-08 15:21:31'),
(128, 14, 'Letti', 'Comme tu l\'as dis, il existe déjà un post pour ce sujet. Je vais supprimer ce dernier.', 1, '2021-08-09 11:37:09'),
(129, 21, 'test', 'Je suis juste derriere toi. Tu ne devrais pas rouler aussi vite ;)', 19, '2021-08-09 12:27:18'),
(130, 21, 'pierrot', 'Doucement les fous du volant !!!', 13, '2021-08-09 12:30:00'),
(131, 22, 'pierrot', 'Il fallait bien un dernier ;)', 13, '2021-08-09 12:30:17'),
(132, 21, 'David', 'On vous attends.', 16, '2021-08-09 12:31:01'),
(133, 22, 'David', 'Ce n\'est pas une course', 16, '2021-08-09 12:31:18'),
(141, 21, 'Letti', 'Cool !\nDes commentaires avec des retours à la lignes :)', 1, '2021-08-09 14:30:42'),
(148, 22, 'Letti', 'box shadow\n', 1, '2021-08-09 15:37:59'),
(153, 23, 'Letti', 'Encore les Maitres de l\'Univers ??', 1, '2021-08-09 17:31:50');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int UNSIGNED NOT NULL,
  `authorId` int NOT NULL,
  `title` varchar(60) DEFAULT NULL,
  `category` varchar(60) DEFAULT NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `message` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `nbComments` int DEFAULT '0',
  `isFlagged` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `authorId`, `title`, `category`, `image`, `message`, `date`, `nbComments`, `isFlagged`) VALUES
(2, 1, 'Capt\'ain Jack', 'Divers', 'http://localhost:3000/posts/captain_sparrow.gif', 'Hoy Hoy Cap\'tain Jack !!!', '2021-08-06 00:00:00', 3, 0),
(6, 15, 'C\'est les vacances !!!', 'Voyage', 'http://localhost:3000/posts/avatar_bg.gif1628287941045.gif', 'Hello, C\'est les vacances ce soir :) Vous partez cette année ? Quelle direction ? Ça vous dit de boire un verre en débauchant ?', '2021-08-07 00:12:21', 2, 1),
(11, 16, 'Débat Parlementaire', 'Politique', 'http://localhost:3000/posts/kaamelott.gif1628288689882.gif', 'Qui va regarder le débat parlementaire de ce soir ?', '2021-08-07 00:24:49', 3, 0),
(12, 13, 'Master of the Universe', 'Film', 'http://localhost:3000/posts/skeletor.gif1628288850648.gif', 'Vous avez vus que Master of the Universe à repris ??? Netflix a relancé la serie fin juillet !!!!', '2021-08-07 00:27:30', 2, 0),
(14, 13, 'Apéro ce soir à Central Perk', 'Divers', 'http://localhost:3000/posts/ross.gif', 'Qui nous rejoins à Central Perk pour un dernier verre avant les vacances ?', '2021-08-08 14:48:51', 3, 0),
(21, 15, 'J\'arrive !!', 'Film', 'http://localhost:3000/posts/f&f.gif1628502391063.gif', 'J\'arrive, donnez-moi 10s ;)', '2021-08-09 11:46:31', 4, 0),
(22, 16, 'J\'arrive en suivant', 'Film', 'http://localhost:3000/posts/behindyou.gif1628504790242.gif', '  ', '2021-08-09 12:26:30', 5, 0),
(23, 20, 'U-K me voilà !!', 'Voyage', 'http://localhost:3000/posts/thepower.gif1628521200297.gif', 'Enfin arrivé au Royaume-Unis. Excalibur, à nous deux :)', '2021-08-09 17:00:00', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `lastname` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `firstname` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `username` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `division` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `profilPicture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'http://localhost:3000/profils/backup/defaultUser.png',
  `privileges` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `lastname`, `firstname`, `username`, `email`, `password`, `division`, `profilPicture`, `privileges`) VALUES
(1, 'Toretto', 'Letti', 'Letti', '08a497124d13c0589acce0f724c7789e', '$2b$10$mTgL30WtJFTQKPwfn3LmDuv9FUzn1Er.lnO80GrHfU9wv.P4xZCIy', 'Direction', 'http://localhost:3000/profils/avatar_dbz.png1628263229970.png1628501926108.png', 'admin'),
(13, 'Pernot', 'Pierre', 'pierrot', 'a525f0a605348a6663dfeaf0eb0aef44', '$2b$10$Oy/WsKnBtzWtTSPt4c5yBO.rONJqf1OXdptgKwGeiww1pG/DQgfoO', 'Logistique', 'http://localhost:3000/profils/avatar_witcher.jpeg1628263150194.jpg', 'user'),
(15, 'Torreto', 'Dominic', 'dom', '44a5eb9af635993b7d3ec94f1c61392a', '$2b$10$LFvOuSYs9DZzCn57W7deLeEymkKFuImEF8h6pascfFgH.QYNz8lcW', 'RH', 'http://localhost:3000/profils/avatar_johnwick.png1628507584545.png', 'user'),
(16, 'Beckham', 'David', 'David', '7201423f0a91693817c07f8c6d92fbf8', '$2b$10$7KoL8EfoLBbPJm/GE3rj1OHo7ytxdVzGDs.maFWiyrhAAu57IbbvG', 'SAV', 'http://localhost:3000/profils/backup/defaultUser.png', 'user'),
(20, 'Eternia', 'Adam', 'PrinceAdam', '8406f2f0025b856b829d9ea11b5833e9', '$2b$10$LwRXlB4siAT660e6Lvu7mOJBG5ajyV/bZ.lHDPNzGrgJxfduKCOJy', 'Direction', 'http://localhost:3000/profils/adam.png1628519242477.png', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
