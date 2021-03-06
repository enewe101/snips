-- phpMyAdmin SQL Dump
-- version 4.1.8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 12, 2014 at 12:19 PM
-- Server version: 5.1.73-cll
-- PHP Version: 5.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `uedwardn_clips`
--

-- --------------------------------------------------------

--
-- Table structure for table `clips`
--

CREATE TABLE IF NOT EXISTS `clips` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `desc` varchar(2048) NOT NULL,
  `source_id` bigint(20) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `source_id` (`source_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=277 ;

--
-- Dumping data for table `clips`
--

INSERT INTO `clips` (`id`, `desc`, `source_id`, `create_time`, `update_time`) VALUES
(1, 'qhr', 17, '2014-03-01 05:42:54', '2014-03-01 05:42:54'),
(5, 'a', 17, '2014-03-01 05:44:44', '2014-03-01 05:44:44'),
(269, 'The transformation induced on the payout matrix by a given Active Linking model:\n$$\n\\sum_j M_{ij}\\phi_{ij}(N_j - \\delta_{ij})\n$$', 61, '2014-03-09 19:45:48', '2014-03-09 19:45:48'),
(205, 'abc', 19, '2014-03-02 15:07:00', '2014-03-02 15:07:00'),
(9, '.e', 17, '2014-03-01 05:45:36', '2014-03-01 05:45:36'),
(206, 'abcde', 18, '2014-03-03 00:23:58', '2014-03-03 00:23:58'),
(12, 'abc', 17, '2014-03-01 05:46:50', '2014-03-01 05:46:50'),
(257, 'Constant population size: $$ N=N_A + N_B $$', 61, '2014-03-09 00:05:48', '2014-03-09 00:05:48'),
(197, 'eouth', 62, '2014-03-01 20:40:21', '2014-03-01 20:40:21'),
(198, 'eou', 62, '2014-03-01 20:40:24', '2014-03-01 20:40:24'),
(199, '$a = \\left( \\frac{1}{2}\\right)^n$', 62, '2014-03-01 20:41:53', '2014-03-01 20:41:53'),
(255, 'Their model produces single-scale, or gaussian degree distribution.  This is, of course, not realistic', 61, '2014-03-08 23:57:50', '2014-03-08 23:57:50'),
(204, 'This paper approaches EGT from the perspective of network growth models', 61, '2014-03-02 02:49:35', '2014-03-08 23:55:58'),
(30, 'aae', 17, '2014-03-01 06:22:57', '2014-03-01 06:23:10'),
(207, 'aoeu', 18, '2014-03-03 00:23:59', '2014-03-03 00:23:59'),
(32, 'aae', 17, '2014-03-01 06:28:53', '2014-03-01 06:28:56'),
(33, 'aeue', 17, '2014-03-01 06:29:04', '2014-03-01 06:29:08'),
(256, 'They seem to proceed adding agent capabilities one at a time?', 61, '2014-03-08 23:59:42', '2014-03-08 23:59:45'),
(36, 'abc', 17, '2014-03-01 06:36:33', '2014-03-01 06:36:33'),
(216, 'Has references for replicator dynamics', 76, '2014-03-05 13:48:05', '2014-03-05 13:48:05'),
(215, 'This is the general result showing that population structure in non-repeated games can be handled by a single parameter $\\sigma$.', 76, '2014-03-05 13:44:57', '2014-03-05 13:44:57'),
(48, 'abc', 17, '2014-03-01 07:04:44', '2014-03-01 07:04:44'),
(49, 'def', 17, '2014-03-01 07:04:57', '2014-03-01 07:04:57'),
(271, 'For deciding who reproduces, the pairwise comparison rule is used:\n$$\n\\text{Pr}\\{\\text{A reproduces}\\} = \\frac{1}{1+ e^{-\\beta(f_A - f_B)}}\n$$', 61, '2014-03-09 20:03:14', '2014-03-09 20:04:14'),
(179, 'def', 62, '2014-03-01 16:54:50', '2014-03-01 16:54:50'),
(200, 'Infinitely repeated games with discounting, also a so-called optimal penal code.', 3, '2014-03-01 22:28:46', '2014-03-01 22:32:01'),
(62, 'aa', 17, '2014-03-01 07:11:34', '2014-03-01 07:11:34'),
(63, 'aa\\', 17, '2014-03-01 07:11:59', '2014-03-01 07:11:59'),
(174, 'aeuhc.', 25, '2014-03-01 11:39:51', '2014-03-01 11:39:51'),
(173, 'aeu', 25, '2014-03-01 11:39:49', '2014-03-01 11:39:49'),
(67, 'aa', 17, '2014-03-01 07:13:56', '2014-03-01 07:13:56'),
(68, 'aa', 17, '2014-03-01 07:14:31', '2014-03-01 07:14:31'),
(77, 'bace', 17, '2014-03-01 07:19:08', '2014-03-01 07:19:08'),
(76, 'haepaoeuaeou', 17, '2014-03-01 07:19:02', '2014-03-01 07:19:29'),
(88, 'hae', 17, '2014-03-01 07:51:41', '2014-03-01 07:51:41'),
(80, 'aeu', 17, '2014-03-01 07:19:41', '2014-03-01 07:19:41'),
(87, 'aaaeu', 17, '2014-03-01 07:51:35', '2014-03-01 07:51:35'),
(89, 'aceh', 17, '2014-03-01 07:51:43', '2014-03-01 07:51:43'),
(90, 'aeu', 17, '2014-03-01 07:51:51', '2014-03-01 07:51:51'),
(91, 'aaaoeu', 17, '2014-03-01 07:53:08', '2014-03-01 07:53:08'),
(92, 'he', 17, '2014-03-01 07:53:10', '2014-03-01 07:53:10'),
(93, 'aa', 17, '2014-03-01 07:54:49', '2014-03-01 07:54:49'),
(94, 'aa', 17, '2014-03-01 07:56:20', '2014-03-01 07:56:20'),
(95, 'aeuh', 17, '2014-03-01 07:56:25', '2014-03-01 07:56:25'),
(96, 'aa', 17, '2014-03-01 07:57:08', '2014-03-01 07:57:08'),
(97, 'aeu', 17, '2014-03-01 07:57:13', '2014-03-01 07:57:13'),
(98, 'aaaeue', 17, '2014-03-01 07:58:56', '2014-03-01 07:58:59'),
(99, 'aaaeu', 17, '2014-03-01 08:00:16', '2014-03-01 08:00:16'),
(100, 'aaaeu', 17, '2014-03-01 08:00:59', '2014-03-01 08:00:59'),
(117, 'aep', 17, '2014-03-01 08:06:41', '2014-03-01 08:06:41'),
(102, 'eh', 17, '2014-03-01 08:01:48', '2014-03-01 08:01:48'),
(118, 'aue', 17, '2014-03-01 08:06:44', '2014-03-01 08:06:44'),
(105, 'aeu', 17, '2014-03-01 08:02:50', '2014-03-01 08:02:50'),
(108, 'a', 17, '2014-03-01 08:03:35', '2014-03-01 08:03:35'),
(119, 'aaaeou', 17, '2014-03-01 08:41:24', '2014-03-01 08:41:24'),
(116, 'egc', 17, '2014-03-01 08:06:40', '2014-03-01 08:06:40'),
(214, '$V$ games can''t be modeled using a payout matrix so this result doesn''t apply', 76, '2014-03-05 13:42:31', '2014-03-05 13:42:57'),
(213, '["[\\"Studies non-repeated games\\"","\\" or the situation where repetition can be fully captured in a $2\\\\\\\\times 2$ matrix\\"]"]', 76, '2014-03-05 13:40:38', '2014-03-05 15:41:43'),
(212, '$f^u$', 28, '2014-03-05 06:00:11', '2014-03-05 06:00:11'),
(266, 'They use the pairwise comparison rule', 61, '2014-03-09 02:54:22', '2014-03-09 02:54:22'),
(130, 'ou', 17, '2014-03-01 08:47:44', '2014-03-01 08:47:44'),
(133, 'ueug', 17, '2014-03-01 08:48:25', '2014-03-01 08:48:25'),
(134, 'aoe', 17, '2014-03-01 08:48:26', '2014-03-01 08:48:26'),
(135, 'uha', 17, '2014-03-01 08:48:27', '2014-03-01 08:48:27'),
(136, 'This is a note', 17, '2014-03-01 08:52:08', '2014-03-01 08:52:08'),
(137, 'Here is another note', 17, '2014-03-01 08:52:13', '2014-03-01 08:52:13'),
(140, 'aeu', 17, '2014-03-01 08:56:47', '2014-03-01 08:56:47'),
(139, 'haeou\nteht.', 17, '2014-03-01 08:52:21', '2014-03-01 08:52:21'),
(141, 'there\nis no real way', 17, '2014-03-01 08:58:45', '2014-03-01 08:58:45'),
(142, 'To find a good size of dive oeu aoetu haeu', 17, '2014-03-01 08:58:57', '2014-03-01 08:58:57'),
(143, 'This is a note', 17, '2014-03-01 09:00:52', '2014-03-01 09:00:52'),
(144, 'Here is another note', 17, '2014-03-01 09:00:56', '2014-03-01 09:00:56'),
(145, 'note one', 17, '2014-03-01 09:02:22', '2014-03-01 09:02:22'),
(146, 'aeou', 17, '2014-03-01 10:41:11', '2014-03-01 10:41:11'),
(147, 'aoeu', 17, '2014-03-01 10:41:12', '2014-03-01 10:41:12'),
(148, 'aeu', 17, '2014-03-01 10:41:39', '2014-03-01 10:41:39'),
(149, 'eu', 17, '2014-03-01 10:42:38', '2014-03-01 10:42:38'),
(150, 'aeu', 17, '2014-03-01 10:42:40', '2014-03-01 10:42:40'),
(151, 'aeu', 17, '2014-03-01 10:42:51', '2014-03-01 10:42:51'),
(152, 'aeou', 17, '2014-03-01 10:43:06', '2014-03-01 10:43:06'),
(153, 'eu', 17, '2014-03-01 10:43:16', '2014-03-01 10:43:16'),
(154, 'oeu', 17, '2014-03-01 10:46:30', '2014-03-01 10:46:30'),
(155, 'aeou', 17, '2014-03-01 10:47:02', '2014-03-01 10:47:02'),
(156, 'aoeu', 17, '2014-03-01 10:47:22', '2014-03-01 10:47:22'),
(157, 'aeu', 17, '2014-03-01 10:47:23', '2014-03-01 10:47:23'),
(158, 'abcea', 17, '2014-03-01 10:52:11', '2014-03-01 10:52:11'),
(159, 'aeou', 17, '2014-03-01 10:53:10', '2014-03-01 10:53:10'),
(160, 'aeu', 17, '2014-03-01 10:53:11', '2014-03-01 10:53:11'),
(161, 'add note', 17, '2014-03-01 10:55:52', '2014-03-01 10:55:52'),
(162, 'anether note', 17, '2014-03-01 10:55:57', '2014-03-01 10:55:57'),
(163, 'aeu', 17, '2014-03-01 10:56:54', '2014-03-01 10:56:54'),
(164, 'aeu', 17, '2014-03-01 10:56:55', '2014-03-01 10:56:55'),
(165, 'aeu', 17, '2014-03-01 11:08:13', '2014-03-01 11:08:13'),
(166, 'aeu', 17, '2014-03-01 11:08:13', '2014-03-01 11:08:13'),
(217, 'Has references justifying the need for stochastic approach', 76, '2014-03-05 13:50:04', '2014-03-05 13:51:01'),
(168, 'not \\in five', 17, '2014-03-01 11:14:04', '2014-03-01 11:14:04'),
(169, 'there is a really big secret in this paper.  Definitely re-read', 17, '2014-03-01 11:14:25', '2014-03-01 11:14:25'),
(172, 'what can you say about this paper that you read?', 17, '2014-03-01 11:15:40', '2014-03-01 11:15:40'),
(218, 'I should focus more on establishing the notion of fixation probability and rate of evolution', 76, '2014-03-05 13:51:30', '2014-03-05 13:51:30'),
(219, 'many links to spatial settings.  The references in this paper will really help fill out the picture of existing work on structure', 76, '2014-03-05 13:52:46', '2014-03-05 13:52:46'),
(220, 'baoeu', 12, '2014-03-05 21:43:16', '2014-03-05 21:43:16'),
(225, 'x$^2$', 0, '2014-03-07 07:12:19', '2014-03-07 07:12:19'),
(234, '$\\frac{\\pi}{3}$', 0, '2014-03-07 07:50:16', '2014-03-07 07:50:16'),
(226, 'x$^2$ + 3x + 5', 0, '2014-03-07 07:12:37', '2014-03-07 07:12:37'),
(227, '$x^2 + 3x +5$', 0, '2014-03-07 07:13:09', '2014-03-07 07:13:09'),
(228, '$x^2 -5x + 6$', 0, '2014-03-07 07:13:50', '2014-03-07 07:13:50'),
(233, '$(x+3)/5$', 0, '2014-03-07 07:49:42', '2014-03-07 07:49:42'),
(230, '$\\infty$', 0, '2014-03-07 07:14:28', '2014-03-07 07:14:28'),
(231, '$f^{p^{q^\\text{GOD}}}$', 0, '2014-03-07 07:15:21', '2014-03-07 07:15:38'),
(235, '$x$$^2$', 0, '2014-03-07 08:00:54', '2014-03-07 08:00:54'),
(236, '3x x 6', 0, '2014-03-07 08:01:11', '2014-03-07 08:01:11'),
(237, '3$x$ x 6', 0, '2014-03-07 08:01:24', '2014-03-07 08:01:24'),
(238, '3x $\\times$ 6', 0, '2014-03-07 08:01:33', '2014-03-07 08:01:33'),
(239, '$\\div$', 0, '2014-03-07 08:01:49', '2014-03-07 08:01:49'),
(240, '$\\frac{x^2-9}{x+3}$', 0, '2014-03-07 08:04:12', '2014-03-07 08:08:05'),
(241, '$x$$^2$$^1$', 0, '2014-03-07 18:31:39', '2014-03-07 18:31:39'),
(242, 'Reference for study of spacially structured games (Nowak, May, 1992, Nature, 359)', 68, '2014-03-07 18:46:04', '2014-03-08 19:20:45'),
(243, 'References for the interest in evolutionary game theory for outside fields.', 68, '2014-03-07 18:47:15', '2014-03-07 18:47:15'),
(244, '$\\sqrt{something}$', 0, '2014-03-07 18:50:14', '2014-03-07 18:50:14'),
(245, 'They identify three degree distributions: single scale (gaussian), large-scale (power law that tapers off for high degree, and scale-free (power law)', 68, '2014-03-07 18:50:43', '2014-03-08 19:12:07'),
(246, 'NOC = Networks of Connections', 68, '2014-03-07 18:53:08', '2014-03-07 18:53:08'),
(247, '($x$$^2$+3$x$+15)', 0, '2014-03-07 18:57:12', '2014-03-07 18:57:12'),
(248, '$x$-1', 0, '2014-03-07 18:57:26', '2014-03-07 18:57:26'),
(249, 'They use unexpected definition for stag hunt SG.  Includes inequality $S+T \\leq 2$.  See fig 2', 68, '2014-03-07 18:57:31', '2014-03-07 18:57:45'),
(250, 'Reference for standard treatment of infinite populations (?) Weibull, 1997, EGT, MIT Press.  Check if this touches on very-well-mixed stuff !!', 68, '2014-03-07 19:37:59', '2014-03-08 19:11:48'),
(251, 'The well-mixed population provides a basis against which other structures are assessed.  Should the very-well-mixed population be the (or a) base-case / baseline', 68, '2014-03-07 19:41:49', '2014-03-07 19:42:03'),
(252, 'Increasing heterogeneity has two direct effects: 1) It provides a route for invasion (they claim this tends to be advantageous for defectors), and 2) the diversity in number of interactions (for some reason), helps cooperators).', 68, '2014-03-07 19:56:19', '2014-03-08 19:24:36'),
(253, 'The BA model reflects what is sometimes called in the biological context as "limited dispersal"', 68, '2014-03-07 20:03:03', '2014-03-07 20:03:03'),
(254, 'Population size studied: $10^4$ as well as $10^5$ and $10^2$  Results were consistent across population sizes.', 68, '2014-03-07 20:07:45', '2014-03-08 02:14:40'),
(258, 'The number of links of the type $N_{ij}$ is:\n$$\nN_{ij} = N_i\\frac{N_j - \\delta_{ij}}{1+\\delta_{i,j}}\n$$', 61, '2014-03-09 00:11:10', '2014-03-09 00:13:10'),
(259, '$\\alpha_i \\alpha_j \\equiv$ rate of link creation between agents of types $i$ and $j$', 61, '2014-03-09 00:15:27', '2014-03-09 00:16:16'),
(260, '$\\gamma_{ij} \\equiv$ rate of link death between agents of types $i$ and $j$', 61, '2014-03-09 00:17:07', '2014-03-09 00:17:11'),
(261, 'Rate of change of $X_{ij}$, the actual number of links between agents of type $i$ and $j$:\n$$\n\\dot{X}_{ij} = \\alpha_i \\alpha_j (N_{ij} - X_{ij}) - \\gamma_{ij}X_{ij}\n$$', 61, '2014-03-09 00:18:20', '2014-03-09 00:19:01'),
(262, 'In other words, links are made in proportion to the rate of creation of unrealized possible links, and the rate of death of existing links', 61, '2014-03-09 00:19:38', '2014-03-09 00:19:38'),
(263, 'Under these dynamics, $X^*_{ij} = N_{ij}\\phi_{ij}$', 61, '2014-03-09 00:21:10', '2014-03-09 00:21:23'),
(264, 'And \n$$\n\\phi_{ij} \\equiv \\frac{\\alpha_i \\alpha_j}{\\alpha_i \\alpha_j + \\gamma_{ij}}\n$$', 61, '2014-03-09 00:22:25', '2014-03-09 03:12:17'),
(265, 'Fig 1: they claim that "The fast decaying tails correlate well with the observed tails of real social networks."  Not sure about this.', 61, '2014-03-09 00:31:54', '2014-03-09 00:31:54'),
(270, '$$\nf_i = \\sum_j M_{ij}\\phi_{ij}(N_j - \\delta_{ij})\n$$\nThis is equivalent to writing:\n$$\nM''_{AA} = M_{AA}\\cdot\\frac{2X_{AA}}{N_A} \\\\ \nM''_{AB} = M_{AB}\\frac{X_{AB}}{N_A}\n$$', 61, '2014-03-09 19:48:24', '2014-03-09 19:56:17'),
(272, '$T_a$ : time-scale of network dynamics\n', 61, '2014-03-09 20:22:09', '2014-03-09 20:22:44'),
(273, '$T_s$ : time-scale of strategy dynamics', 61, '2014-03-09 20:22:48', '2014-03-09 20:22:48'),
(274, 'I think this establishes the basic dynamics of the pairwise comparison approach to EGT', 247, '2014-03-09 20:46:03', '2014-03-09 20:46:03'),
(275, 'Meaning of $r$:\n$$\nr = \\frac{\\phi_{CC} - \\phi_{CD}}{\\phi_{CC}}\n$$\nThe proportionate excess of assortative link realization to dissasortative link realization', 61, '2014-03-10 00:04:20', '2014-03-10 00:06:06');

-- --------------------------------------------------------

--
-- Table structure for table `sources`
--

CREATE TABLE IF NOT EXISTS `sources` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bib_code` varchar(255) NOT NULL,
  `title` varchar(512) NOT NULL,
  `authors` varchar(512) DEFAULT NULL,
  `pub_name` varchar(256) DEFAULT NULL,
  `vol` smallint(4) DEFAULT NULL,
  `issue` smallint(6) DEFAULT NULL,
  `start_page` smallint(6) DEFAULT NULL,
  `end_page` smallint(6) DEFAULT NULL,
  `pub_date` date DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modify_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `path` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bib_code` (`bib_code`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=248 ;

--
-- Dumping data for table `sources`
--

INSERT INTO `sources` (`id`, `bib_code`, `title`, `authors`, `pub_name`, `vol`, `issue`, `start_page`, `end_page`, `pub_date`, `create_date`, `modify_date`, `path`) VALUES
(3, 'abreu1988theory', 'Abreu 1988', 'Abreu', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'Abreu 1988.pdf'),
(4, 'friedman1971non', 'Friedman 1971', 'Friedman', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'Friedman 1971.pdf'),
(5, '5', 'Friedman 1998', 'Friedman', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'Friedman 1998.pdf'),
(6, 'nowak1992tit', 'Nowak 1992a', 'Nowak', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'Nowak 1992a.pdf'),
(7, 'truffet2000reduction', 'Truffet 2000', 'Truffet', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'Truffet 2000.pdf'),
(8, 'allen2013adaptive', 'allen 2013', 'allen', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'allen 2013.pdf'),
(9, 'apicella2012social', 'apicella 2012', 'apicella', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'apicella 2012.pdf'),
(10, '10', 'archak 2009', 'archak', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'archak 2009.pdf'),
(11, 'arutyunov2013f', 'arutyunov 2013', 'arutyunov', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'arutyunov 2013.pdf'),
(12, 'axelrod1980effective', 'axelrod 1980a', 'axelrod', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'axelrod 1980a.pdf'),
(13, 'axelrod1980more', 'axelrod 1980b', 'axelrod', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'axelrod 1980b.pdf'),
(14, 'axelrod1981evolution', 'axelrod 1981', 'axelrod', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'axelrod 1981.pdf'),
(15, 'axelrod1988further', 'axelrod 1988', 'axelrod', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'axelrod 1988.pdf'),
(16, 'bendor1995types', 'bendor 1995', 'bendor', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'bendor 1995.pdf'),
(17, '17', 'berland 2009', 'berland', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'berland 2009.pdf'),
(18, 'boyd1987no', 'boyd 1987', 'boyd', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'boyd 1987.pdf'),
(19, 'Clutton-Brock:2009qv', 'clutton-brock 2009', 'clutton-brock', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'clutton-brock 2009.pdf'),
(20, 'crowley1996evolving', 'crowly 1996', 'crowly', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'crowly 1996.pdf'),
(21, 'dawkins2010asymmetries', 'dawkins 2010', 'dawkins', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'dawkins 2010.pdf'),
(22, 'dieckmann1994coevolutionary', 'dieckmann 1996', 'dieckmann', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'dieckmann 1996.pdf'),
(23, '23', 'dipalantino 2009', 'dipalantino', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'dipalantino 2009.pdf'),
(24, 'dreber2008winners', 'dreber 2008', 'dreber', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'dreber 2008.pdf'),
(25, 'feldman1987behavior', 'feldman 1987', 'feldman', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'feldman 1987.pdf'),
(26, 'flesch2012evolutionary', 'flesch 2012', 'flesch', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'flesch 2012.pdf'),
(27, 'Frean07072013', 'frean 2013', 'frean', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'frean 2013.pdf'),
(28, 'fu2009evolutionary', 'fu 2009', 'fu', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'fu 2009.pdf'),
(29, 'fundenberg1990evolution', 'fundenberg 1990', 'fundenberg', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'fundenberg 1990.pdf'),
(30, 'gilbert1986origin', 'gilbert 1986', 'gilbert', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'gilbert 1986.pdf'),
(31, 'gray2012mitochondrial', 'gray 2012', 'gray', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'gray 2012.pdf'),
(32, 'guttman2012evolution', 'guttman 2013', 'guttman', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'guttman 2013.pdf'),
(33, '33', 'halfaker 2013', 'halfaker', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'halfaker 2013.pdf'),
(34, 'hamilton1964genetical', 'hamilton 1964', 'hamilton', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'hamilton 1964.pdf'),
(35, 'harley1981learning', 'harley 1981', 'harley', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'harley 1981.pdf'),
(36, 'hofbauer1979note', 'hofbauer 1979', 'hofbauer', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'hofbauer 1979.pdf'),
(37, 'hofbauer1998evolutionary', 'hofbauer 1998', 'hofbauer', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'hofbauer 1998.pdf'),
(38, '38', 'horton 2010', 'horton', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'horton 2010.pdf'),
(39, '39', 'huang 2011', 'huang', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'huang 2011.pdf'),
(40, '40', 'imhof 2005', 'imhof', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'imhof 2005.pdf'),
(41, 'imhof2010stochastic', 'imhof 2010', 'imhof', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'imhof 2010.pdf'),
(42, '42', 'jain 2009', 'jain', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'jain 2009.pdf'),
(43, '43', 'kazai 2013', 'kazai', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'kazai 2013.pdf'),
(44, 'khare2009cheater', 'khare 2009', 'khare', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'khare 2009.pdf'),
(45, 'lazcano2012biochemical', 'lazcano 2012', 'lazcano', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'lazcano 2012.pdf'),
(46, 'libby2013conceptual', 'libby 2013', 'libby', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'libby 2013.pdf'),
(47, 'lieberman2005evolutionary', 'lieberman 2005', 'lieberman', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'lieberman 2005.pdf'),
(48, 'martinez2012generosity', 'martinez 2012', 'martinez', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'martinez 2012.pdf'),
(49, '49', 'merali 2013', 'merali', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'merali 2013.pdf'),
(50, 'miyaji2013direct', 'miyaji 2013', 'miyaji', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'miyaji 2013.pdf'),
(51, 'moya2008learning', 'moya 2008', 'moya', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'moya 2008.pdf'),
(52, 'nowak1989oscillations', 'nowak 1989', 'nowak', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'nowak 1989.pdf'),
(53, 'nowak1992evolutionary', 'nowak 1992b', 'nowak', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'nowak 1992b.pdf'),
(54, 'nowak1998dynamics', 'nowak 1998', 'nowak', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'nowak 1998.pdf'),
(55, 'nowak2004emergence', 'nowak 2004', 'nowak', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 02:30:41', 'nowak 2004.pdf'),
(56, 'nowak2006five', 'nowak 2006', 'nowak', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'nowak 2006.pdf'),
(57, 'nowak2010evolution', 'nowak 2010', 'nowak', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'nowak 2010.pdf'),
(58, 'nowak2012evolving', 'nowak 2012', 'nowak', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'nowak 2012.pdf'),
(59, 'ohtsuki2006simple', 'ohtsuki 2006', 'ohtsuki', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'ohtsuki 2006.pdf'),
(60, 'ohtsuki2007direct', 'ohtsuki 2007', 'ohtsuki', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'ohtsuki 2007.pdf'),
(61, 'pacheco2006coevolution', 'pacheco 2006', 'pacheco', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'pacheco 2006.pdf'),
(62, '62', 'panchal 2008', 'panchal', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'panchal 2008.pdf'),
(63, '63', 'ranade 2012', 'ranade', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'ranade 2012.pdf'),
(64, 'rand2012evolutionary', 'rand 2012', 'rand', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'rand 2012.pdf'),
(65, 'riolo2001evolution', 'riolo 2001', 'riolo', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'riolo 2001.pdf'),
(66, 'santos2005scale', 'santos 2005', 'santos', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'santos 2005.pdf'),
(67, 'santos2006cooperation', 'santos 2006c', 'santos', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'santos 2006c.pdf'),
(68, 'santos2006evolutionary', 'santos 2006a', 'santos', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'santos 2006a.pdf'),
(69, 'santos2006new', 'santos 2006b', 'santos', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'santos 2006b.pdf'),
(70, 'santos2008social', 'santos 2008', 'santos', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'santos 2008.pdf'),
(71, 'selten1984gaps', 'selton 1984', 'selton', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'selton 1984.pdf'),
(72, 'shultz2011stepwise', 'shultz 2011', 'shultz', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'shultz 2011.pdf'),
(73, 'smith1973lhe', 'smith 1973', 'smith', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'smith 1973.pdf'),
(74, 'st2009long', 'st-pierre 2009', 'st-pierre', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'st-pierre 2009.pdf'),
(75, 'szolnoki2013information', 'szolnoki 2013', 'szolnoki', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'szolnoki 2013.pdf'),
(76, 'tarnita2009strategy', 'tarnita 2009', 'tarnita', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'tarnita 2009.pdf'),
(77, 'taylor2007transforming', 'taylor 2007', 'taylor', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'taylor 2007.pdf'),
(78, 'traulsen2006stochastic', 'traulsen 2006', 'traulsen', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'traulsen 2006.pdf'),
(79, 'trivers1971evolution', 'trivers 1971', 'trivers', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'trivers 1971.pdf'),
(80, 'van2012direct', 'vanVeelin 2012', 'vanVeelin', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'vanVeelin 2012.pdf'),
(81, 'voorhees2013fixation', 'voorhees 2013', 'voorhees', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'voorhees 2013.pdf'),
(82, '82', 'walker 2012', 'walker', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'walker 2012.pdf'),
(83, 'wild2004fitness', 'wild 2004', 'wild', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'wild 2004.pdf'),
(84, 'williams2005manifestations', 'williams 2005', 'williams', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'williams 2005.pdf'),
(85, 'wimsatt1952reproduction', 'wimsatt 1952', 'wimsatt', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'wimsatt 1952.pdf'),
(86, '86', 'wu 2013', 'wu', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'wu 2013.pdf'),
(87, 'yoan2013evolution', 'yoan 2013', 'yoan', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-02 01:09:23', 'yoan 2013.pdf'),
(88, '88', 'yuen 2011', 'yuen', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'yuen 2011.pdf'),
(89, '89', 'zhang 2012', 'zhang', NULL, NULL, NULL, NULL, NULL, NULL, '2014-01-20 23:37:27', '2014-03-04 06:30:08', 'zhang 2012.pdf'),
(247, '2006Traulsen71', 'Stochastic dynamics of invasion and fixation', '[["Traulsen","A."],["Nowak","M.A."],["Pacheco","J.M."]]', 'Physical Review E - Statistical, Nonlinear, and Soft Matter Physics', 74, 1, 1539, 3755, '0000-00-00', '2014-03-09 20:44:31', '2014-03-09 20:44:31', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
