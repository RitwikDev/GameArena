-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 26, 2021 at 11:51 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gamesdatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `Username` varchar(20) NOT NULL,
  `FirstName` varchar(20) NOT NULL,
  `LastName` varchar(20) NOT NULL,
  `Password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `featuredgames`
--

CREATE TABLE `featuredgames` (
  `GameId` varchar(20) NOT NULL,
  `Featured` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `featuredgames`
--

INSERT INTO `featuredgames` (`GameId`, `Featured`) VALUES
('G0', 1);

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `GameId` varchar(20) NOT NULL,
  `GameName` varchar(50) NOT NULL,
  `GameDescription` varchar(500) NOT NULL,
  `Price` double NOT NULL,
  `Rating` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`GameId`, `GameName`, `GameDescription`, `Price`, `Rating`) VALUES
('G0', 'Test Game', 'Test description. This is the first game in the world!', 303, 5),
('G1', 'Test Game 2', 'This is the second game in the world! This game is not on the featured list.', 9272, 5);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `ImageId` varchar(20) NOT NULL,
  `ImageSrc` varchar(100) NOT NULL,
  `ImageAlt` varchar(50) NOT NULL,
  `GameId` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`ImageId`, `ImageSrc`, `ImageAlt`, `GameId`) VALUES
('I1', '../static/1.jpg', 'Game 0 Image 1', 'G0'),
('I2', '../static/2.jpg', 'Game 0 Image 2', 'G0'),
('I3', '../static/3.jpg', 'Game 0 Image 3', 'G0'),
('I4', '../static/4.jpg', 'Game 0 Image 4', 'G0'),
('I5', '../static/5.jpg', 'Game 1 Image 1', 'G1'),
('I6', '../static/6.jpg', 'Game 1 Image 2', 'G1'),
('I7', '../static/7.jpg', 'Game 1 Image 3', 'G1'),
('I8', '../static/8.jpg', 'Game 1 Image 4', 'G1'),
('I9', '../static/9.jpg', 'Game 1 Image 5', 'G1');

-- --------------------------------------------------------

--
-- Table structure for table `publisher`
--

CREATE TABLE `publisher` (
  `PublisherId` varchar(20) NOT NULL,
  `PublisherName` int(11) NOT NULL,
  `GameId` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sale`
--

CREATE TABLE `sale` (
  `GameId` varchar(20) NOT NULL,
  `DiscountPercent` double NOT NULL,
  `SaleDateStart` date NOT NULL,
  `SaleDateEnd` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Username` varchar(20) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `PasswordHash` varchar(500) NOT NULL,
  `Age` int(11) NOT NULL,
  `EmailId` varchar(30) NOT NULL,
  `Gender` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`Username`);

--
-- Indexes for table `featuredgames`
--
ALTER TABLE `featuredgames`
  ADD PRIMARY KEY (`GameId`);

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`GameId`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`ImageId`,`GameId`);

--
-- Indexes for table `publisher`
--
ALTER TABLE `publisher`
  ADD PRIMARY KEY (`PublisherId`);

--
-- Indexes for table `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`GameId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
