-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 22 mars 2022 à 17:56
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `innov_ecl`
--

-- --------------------------------------------------------

--
-- Structure de la table `allideas`
--

DROP TABLE IF EXISTS `allideas`;
CREATE TABLE IF NOT EXISTS `allideas` (
  `id_idee` int(11) NOT NULL,
  `idee` varchar(100) COLLATE utf8_bin NOT NULL,
  `score` int(20) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `criteres`
--

DROP TABLE IF EXISTS `criteres`;
CREATE TABLE IF NOT EXISTS `criteres` (
  `id_criteres` int(11) NOT NULL AUTO_INCREMENT,
  `enonce_critere` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_criteres`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `criteres`
--

INSERT INTO `criteres` (`id_criteres`, `enonce_critere`) VALUES
(1, 'scalabilité'),
(4, 'Faisabilité technique'),
(3, 'Impact environnemental '),
(5, 'Avantage concurrentiel'),
(6, 'Ergonomie'),
(7, 'Sécurité');

-- --------------------------------------------------------

--
-- Structure de la table `idée`
--

DROP TABLE IF EXISTS `idée`;
CREATE TABLE IF NOT EXISTS `idée` (
  `id_idée` int(11) NOT NULL AUTO_INCREMENT,
  `id_question` int(11) DEFAULT NULL,
  `tags` varchar(45) DEFAULT NULL,
  `enonce_idee` varchar(45) DEFAULT NULL,
  `id_seance` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_idée`),
  KEY `id_question_in_idee_idx` (`id_question`),
  KEY `id_seance_in_idee_idx` (`id_seance`)
) ENGINE=MyISAM AUTO_INCREMENT=205 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `note`
--

DROP TABLE IF EXISTS `note`;
CREATE TABLE IF NOT EXISTS `note` (
  `id_note` int(11) NOT NULL AUTO_INCREMENT,
  `note` int(11) DEFAULT NULL,
  `id_critere` int(11) DEFAULT NULL,
  `id_idee` int(11) DEFAULT NULL,
  `id_seance` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_note`),
  KEY `id_critere_in_note_idx` (`id_critere`),
  KEY `id_idee_in_note_idx` (`id_idee`),
  KEY `id_seance_in_note_idx` (`id_seance`)
) ENGINE=MyISAM AUTO_INCREMENT=538 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `id_question` int(11) NOT NULL AUTO_INCREMENT,
  `enonce_question` varchar(150) DEFAULT NULL,
  `categorie` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_question`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `question`
--

INSERT INTO `question` (`id_question`, `enonce_question`, `categorie`) VALUES
(1, 'Quel est l\'impact environnemental de la solution ?', 'Environnement'),
(2, 'Pourquoi l\'implémentation de cette fonctionnalité?', 'Technique'),
(3, 'Quel est le budget maximal à allouer ?', 'Economique');

-- --------------------------------------------------------

--
-- Structure de la table `seance`
--

DROP TABLE IF EXISTS `seance`;
CREATE TABLE IF NOT EXISTS `seance` (
  `id_seance` int(11) NOT NULL AUTO_INCREMENT,
  `sujet_seance` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_seance`)
) ENGINE=MyISAM AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
