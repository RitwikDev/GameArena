-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 08, 2021 at 11:54 PM
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

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`Username`, `FirstName`, `LastName`, `Password`) VALUES
('admin1', 'aaa', 'bbb', 'aaaaaaaa'),
('admin2', 'aaa', 'bbb', 'aaaaaaaa');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `UserId` varchar(20) NOT NULL,
  `GameId` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`UserId`, `GameId`) VALUES
('a1', 'G0'),
('a1', 'G1');

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
('G003', 1),
('G007', 1),
('G010', 1),
('G014', 1),
('G018', 1),
('G020', 1),
('G023', 1),
('G025', 1),
('G029', 1),
('G030', 1);

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `GameId` varchar(20) NOT NULL,
  `GameName` varchar(50) NOT NULL,
  `GameDescription` varchar(500) NOT NULL,
  `Price` double NOT NULL,
  `Rating` double NOT NULL,
  `CoverImage` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`GameId`, `GameName`, `GameDescription`, `Price`, `Rating`, `CoverImage`) VALUES
('G0', 'Test Game', 'Test description. This is the first game in the world!', 303, 5, 'I1'),
('G003', 'Asphalt 9', 'Here is a game that breaks rules.\r\nA game for all of us who dare to defy reality. A game for all the dreamers, the outsiders and the rebels who cannot follow the guidelines and who cannot accept the status quo.\r\n\r\nHere is a fantasy for all of us who break expectations.\r\nHere is a place to become LEGENDS.', 10, 4.7, 'Asphalt9Image1'),
('G004', 'Assassin\'s Creed Black Flag', 'Assassin\'s Creed IV Black Flag begins in 1715, when pirates established a lawless republic in the Caribbean and ruled the land and seas. These outlaws paralyzed navies, halted international trade, and plundered vast fortunes. They threatened the power structures that ruled Europe, inspired the imaginations of millions, and left a legacy that still endures.', 20, 4.5, 'ACBFImage1'),
('G005', 'Assassin\'s Creed Brotherhood', 'The story once again features Ezio Auditore da Firenze, now a legendary Master Assassin, as he strives to rebuild the Assassin Brotherhood in Rome, by bringing down the tyrannical Templar family, the Borgia, and bringing the city into the true wealth and wonder of the Renaissance.', 20, 4.8, 'ACBImage1'),
('G006', 'Assassin\'s Creed Origins', 'Set in mysterious Ancient Egypt, Assassin’s Creed Origins is a new beginning. Experience a new way to fight while exploring the Great Pyramids and hidden tombs across the country of Ancient Egypt, and encounter many memorable storylines along your journey. And discover the origin story of the Assassin’s Brotherhood.', 60, 4.6, 'ACOImage1'),
('G007', 'Assassin\'s Creed Syndicate', 'London, 1868. The Industrial Revolution unleashes an incredible age of invention, transforming the lives of millions with technologies once thought impossible. Opportunities created during this period have people rushing to London to engage in this new world, a world no longer controlled by kings, emperors, politicians, or religion, but by a new common denominator: money.', 30, 4.3, 'ACSImage1'),
('G008', 'Assassin\'s Creed Unity', 'Paris, 1789 – The French Revolution turns a once-magnificent city into a place of terror and chaos. Its cobblestone streets run red with the blood of commoners who dared to rise up against the oppressive aristocracy. Play as Arno, an entirely new breed of assassin, and take down your prey with a range of new weapons such as the phantom blade, a hidden blade with crossbow capabilities.', 30, 4.1, 'ACUImage1'),
('G009', 'Biomutant', 'A plague is ruining the land and the Tree-of-Life is bleeding death from its roots. The Tribes stand divided, in need of someone strong enough to unite them or bring them all down…', 60, 4.8, 'BiomutantImage1'),
('G010', 'Call of Duty: Modern Warfare', 'The best-selling, first-person action series of all time makes its return, setting out to reinvigorate the beloved Modern Warfare franchise. This time around, developer Infinity Ward will take players on the most dramatic single-player story campaign to date. Players will be placed in the boots of Tier One operators who tread the line between black and white. Will you break the rules of modern war?', 60, 4.3, 'CallOfDutyMWImage1'),
('G011', 'Contra', 'Contra is set in the distant future of the year 2633 A.D., when the evil Red Falcon Organization have set a base on the fictional Galuga archipelago near New Zealand in a plot to wipe out humanity. Two commandos, Bill Rizer and Lance Bean of the Earth Marine Corp\'s Contra unit, are sent to the island to destroy the enemy forces and uncover the true nature of the alien entity controlling them.', 60, 4.6, 'ContraImage1'),
('G012', 'Cyberpunk 2077', 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You can customize your character\'s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.', 60, 4.5, 'Cyberpunk2077Image1'),
('G013', 'Delta Force 2', 'The player assumes the role of a Delta Force operative who takes part in missions across the globe. The action takes place in vast outdoor environments and combat distances reach up to several hundred meters. The game has an emphasis on realism, with human enemies and the player alike being very vulnerable to damage from weapons, and projectiles being subject to wind conditions.', 5, 4.5, 'DeltaForce2Image1'),
('G014', 'Dirt 5', 'Dirt 5 is a racing game focused on off-road racing. Disciplines within the game include rallycross, ice racing, Stadium Super Trucks and off-road buggies. Players can compete in events in a wide range of locations, namely Arizona, Brazil, China, Greece, Italy, Morocco, Nepal, New York City, Norway and South Africa. The game includes a dynamic weather system and seasons, which affect the racing; for example, the player can only compete in ice racing events in New York during winter months.', 60, 4, 'Dirt5Image1'),
('G015', 'Duck Hunt', 'Duck Hunt is a shooter game in which the objective is to shoot moving targets on the television screen in mid-flight. The game is played from a first-person perspective and requires the NES Zapper light gun, which the player aims and fires at the screen. The player is required to successfully shoot a minimum number of targets in order to advance to the next round. Therefore, failure will result directly in a game over.', 9, 4, 'DuckHuntImage1'),
('G016', 'Elder Scrolls 6', 'The Elder Scrolls VI is an action role-playing game, playable from either a first or third-person perspective. The player may freely roam over the land of Skyrim which is an open world environment consisting of wilderness expanses, dungeons, caves, cities, towns, fortresses, and villages. Players may navigate the game world more quickly by riding horses, paying for a ride from a city\'s stable or by utilizing a fast-travel system which allows them to warp to previously discovered locations.', 50, 4.2, 'ElderScrolls6Image1'),
('G017', 'F1: 2018', 'F1 2018 features substantial revisions to its \"Career Mode\" compared to previous systems, a detailed progression system that allows the player to focus on developing the engine, chassis and aerodynamics of their car. Players develop their cars by spending \"development points\", which are earned by meeting research and development targets during free practice sessions. As with previous titles, F1 2018 includes \"Classic Cars\", these being Formula One cars from previous seasons.', 25, 4.6, 'F12018Image1'),
('G018', 'Forza Horizon 4', 'Live the Horizon Life when you play Forza Horizon 4. Experience a shared world with dynamic seasons. Explore beautiful scenery, collect over 450 cars and become a Horizon Superstar in historic Britain.', 60, 3.5, 'ForzaHorizon4Image1'),
('G019', 'Gran Turismo', 'More than 120 cars have been added to the lineup, putting the number of available cars to 1200-plus. The large selection of cars include those from the popular FIA GT3 category, which have become the mainstay of GT racing today. In addition to new tracks such as Mt. Panorama, Silverstone, Brands Hatch, Willow Springs Raceway and Red Bull Ring, original tracks including Apricot Hill and Mid-Field Raceway have made a comeback in this version of the game.', 25, 4, 'GranTurismoImage1'),
('G020', 'Legend of Zelda: Breath of the Wild', 'Breath of the Wild takes place at the end of the Zelda timeline in the kingdom of Hyrule. When the evil Calamity Ganon appeared and threatened Hyrule, four great warriors were given the title of Champion, and each piloted one of the Divine Beasts to weaken Ganon while the princess with the blood of the goddess and her appointed knight fought and defeated him by sealing him away.', 48, 4.8, 'LoZBotWImage1'),
('G021', 'Mass Effect 3', 'Mass Effect 3 begins in 2186, six months after the events of Mass Effect 2. The galactic community lives in fear of an invasion by Reapers, a highly advanced machine race of synthetic-organic starships that are believed to eradicate all organic civilization every 50,000 years. Meanwhile, the krogan face extinction because of the genophage, a genetic mutation developed by the salarians and deployed by the turians as a bioweapon to contain the krogan.', 30, 3.8, 'MassEffect3Image1'),
('G022', 'Need For Speed: Hot Pursuit', 'Hot Pursuit\'s gameplay is set in the fictional Seacrest County, which is based on the American states of California, Oregon and Washington, in which players can compete in several types of races. Players can compete online, which includes additional game modes such as Hot Pursuit, Interceptor and Race. The game features a new social interaction system called \"Autolog\", which is a network that connects friends for head-to-head races and compares player stats for competition', 20, 4.5, 'NFSHPImage1'),
('G023', 'Need For Speed: Most Wanted', 'To be Most Wanted, you’ll need to outrun the cops, outdrive your friends, and outsmart your rivals. With a relentless police force gunning to take you down, you’ll need to make split-second decisions. Use the open world to your advantage to find hiding spots, hit jumps and earn new vehicles to keep you one step ahead. In an open world with no menus or lobbies, you’ll be able to instantly challenge your friends and prove your driving skill in a variety of seamless multiplayer events.', 20, 3.7, 'NFSMWImage1'),
('G024', 'Need For Speed: Payback', 'Need for Speed Payback is a racing game set in an open world environment of Fortune Valley; a fictional version of Las Vegas, Nevada. It is focused on \"action driving\" and has three playable characters (each with different sets of skills) working together to pull off action movie like sequences. In contrast with the previous game, it also features a 24-hour day-night cycle.', 30, 4.4, 'NFSPaybackImage1'),
('G025', 'Need For Speed: Porsche', 'Need for Speed: Porsche Unleashed gives the player the opportunity to race Porsche cars (including 3 race cars) throughout a range of tracks located in Europe. There are two career modes, an evolution mode, where the player starts with Porsche cars made in 1950 with the first 356 and ends with Porsche cars made in 2000 with the 996 and factory driver mode, where the player goes through a series of events like slalom, stunts, and races, using Porsche cars preselected for each event.', 50, 5, 'NFSPorscheImage1'),
('G026', 'Project Cars', 'Journey from weekend warrior to racing legend & experience the thrill & emotion of authentic racing. Own, upgrade and personalise hundreds of cars, customise your driver, tailor every setting & play the way you want in your Ultimate Driver Journey. Project CARS is the most authentic, beautiful, intense, and technically-advanced racing game on the planet. Created by gamers, tested by real racing drivers, and the preferred choice of Esports pros.', 20, 3.5, 'ProjectCarsImage1'),
('G027', 'Re-Volt', 'The premise of the game involves racing radio-controlled cars around environments like museums, steamships, construction sites and supermarkets. During a race the cars can collect random weapons to use to damage or displace competitors. Cars and tracks were both unlocked through success in the game\'s tournament modes.', 10, 4.1, 'RevoltImage1'),
('G028', 'Super Mario Brothers', 'Super Mario Bros. was released for the Nintendo Entertainment System (NES) and is the first side-scrolling 2D platform game to feature Mario. It established many core Mario gameplay concepts. The brothers Mario and Luigi live in the Mushroom Kingdom, where they must rescue Princess Toadstool (later called Princess Peach) from Bowser/King Koopa. The game consists of eight worlds of four levels each, totaling 32 levels altogether.', 60, 5, 'SuperMarioBrosImage1'),
('G029', 'The Sims 2', 'From the neighborhood view, the player selects one lot to play, as in The Sims. There are both residential and community lots, but Sims can only live in residential lots. Sims can travel to Community lots in order to purchase things like clothing and magazines, and to interact with townies. This feature was only included in this game. The player can choose between playing a pre-made inhabited lot, moving a household into an unoccupied pre-built lot, or constructing a building on an empty lot.', 15, 4.9, 'TheSims2Image1'),
('G030', 'The Sims 4', 'The Sims 4 is the life simulation game that gives you the power to create and control people. Experience the creativity, humor, escape, and the freedom to play with life in The Sims 4. Get even more creativity, humor, and freedom in The Sims 4 when you add new packs to your game! Travel between neighbourhoods and discover captivating venues. The sims can visit communities and even throw parties there!', 10, 4.2, 'TheSims4Image1'),
('G1', 'Test Game 2', 'This is the second game in the world! This game is not on the featured list.', 9272, 3, 'I5');

-- --------------------------------------------------------

--
-- Table structure for table `gamegenre`
--

CREATE TABLE `gamegenre` (
  `GameId` varchar(20) NOT NULL,
  `Genre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gamegenre`
--

INSERT INTO `gamegenre` (`GameId`, `Genre`) VALUES
('G003', 'Racing'),
('G004', 'Action'),
('G004', 'Adventure'),
('G004', 'RPG'),
('G005', 'Action'),
('G005', 'Adventure'),
('G005', 'RPG'),
('G006', 'Action'),
('G006', 'Adventure'),
('G006', 'RPG'),
('G007', 'Action'),
('G007', 'Adventure'),
('G007', 'RPG'),
('G008', 'Action'),
('G008', 'Adventure'),
('G008', 'RPG'),
('G009', 'Action'),
('G009', 'Shooting'),
('G010', 'Action'),
('G010', 'RPG'),
('G010', 'Shooting'),
('G011', 'Action'),
('G011', 'Shooting'),
('G012', 'Action'),
('G012', 'Adventure'),
('G012', 'RPG'),
('G012', 'Shooting'),
('G013', 'Action'),
('G013', 'Shooting'),
('G014', 'Racing'),
('G015', 'Shooting'),
('G016', 'Action'),
('G016', 'RPG'),
('G017', 'Racing'),
('G018', 'Racing'),
('G019', 'Racing'),
('G020', 'Action'),
('G020', 'Adventure'),
('G020', 'RPG'),
('G021', 'Action'),
('G021', 'RPG'),
('G021', 'Shooting'),
('G022', 'Racing'),
('G023', 'Racing'),
('G024', 'Racing'),
('G025', 'Racing'),
('G026', 'Racing'),
('G027', 'Racing'),
('G028', 'Adventure'),
('G028', 'RPG'),
('G029', 'RPG'),
('G030', 'RPG');

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
('ACBFImage1', '../static/images/AssassinsCreedBlackFlagImage1.jpg', 'Assassin\'s Creed Black Flag Image 1', 'G004'),
('ACBFImage2', '../static/images/AssassinsCreedBlackFlagImage2.jpg', 'Assassin\'s Creed Black Flag Image 2', 'G004'),
('ACBFImage3', '../static/images/AssassinsCreedBlackFlagImage3.jpg', 'Assassin\'s Creed Black Flag Image 3', 'G004'),
('ACBImage1', '../static/images/AssassinsCreedBrotherhoodImage1.jpg', 'Assassin\'s Creed Brotherhood Image 1', 'G005'),
('ACBImage2', '../static/images/AssassinsCreedBrotherhoodImage2.jpg', 'Assassin\'s Creed Brotherhood Image 2', 'G005'),
('ACBImage3', '../static/images/AssassinsCreedBrotherhoodImage3.jpg', 'Assassin\'s Creed Brotherhood Image 3', 'G005'),
('ACOImage1', '../static/images/AssassinsCreedOriginsImage1.jpg', 'Assassin\'s Creed Origins Image 1', 'G006'),
('ACOImage2', '../static/images/AssassinsCreedOriginsImage2.jpg', 'Assassin\'s Creed Origins Image 2', 'G006'),
('ACOImage3', '../static/images/AssassinsCreedOriginsImage3.jpg', 'Assassin\'s Creed Origins Image 3', 'G006'),
('ACSImage1', '../static/images/AssassinsCreedSyndicateImage1.jpg', 'Assassin\'s Creed Syndicate Image 1', 'G007'),
('ACSImage2', '../static/images/AssassinsCreedSyndicateImage2.jpg', 'Assassin\'s Creed Syndicate Image 2', 'G007'),
('ACSImage3', '../static/images/AssassinsCreedSyndicateImage3.jpg', 'Assassin\'s Creed Syndicate Image 3', 'G007'),
('ACUImage1', '../static/images/AssassinsCreedUnityImage1.jpg', 'Assassin\'s Creed Unity Image 1', 'G008'),
('ACUImage2', '../static/images/AssassinsCreedUnityImage2.jpg', 'Assassin\'s Creed Unity Image 2', 'G008'),
('ACUImage3', '../static/images/AssassinsCreedUnityImage3.jpg', 'Assassin\'s Creed Unity Image 3', 'G008'),
('Asphalt9Image1', '../static/images/Asphalt9Image1.jpg', 'Asphalt 9 Image 1', 'G003'),
('Asphalt9Image2', '../static/images/Asphalt9Image2.jpg', 'Asphalt 9 Image 2', 'G003'),
('Asphalt9Image3', '../static/images/Asphalt9Image3.jpg', 'Asphalt 9 Image 3', 'G003'),
('BiomutantImage1', '../static/images/BiomutantImage1.jpg', 'Biomutant Image 1', 'G009'),
('BiomutantImage2', '../static/images/BiomutantImage2.jpg', 'Biomutant Image 2', 'G009'),
('BiomutantImage3', '../static/images/BiomutantImage3.jpg', 'Biomutant Image 3', 'G009'),
('CallOfDutyMWImage1', '../static/images/CallOfDutyMWImage1.jpg', 'Call of Duty MW Image 1', 'G010'),
('CallOfDutyMWImage2', '../static/images/CallOfDutyMWImage2.jpg', 'Call of Duty MW Image 2', 'G010'),
('CallOfDutyMWImage3', '../static/images/CallOfDutyMWImage3.jpg', 'Call of Duty MW Image 3', 'G010'),
('ContraImage1', '../static/images/ContraImage1.jpg', 'Contra Image 1', 'G011'),
('ContraImage2', '../static/images/ContraImage2.jpg', 'Contra Image 2', 'G011'),
('ContraImage3', '../static/images/ContraImage3.jpg', 'Contra Image 3', 'G011'),
('Cyberpunk2077Image1', '../static/images/Cyberpunk2077Image1.jpg', 'Cyberpunk 2077 Image 1', 'G012'),
('Cyberpunk2077Image2', '../static/images/Cyberpunk2077Image2.jpg', 'Cyberpunk 2077 Image 2', 'G012'),
('Cyberpunk2077Image3', '../static/images/Cyberpunk2077Image3.jpg', 'Cyberpunk 2077 Image 3', 'G012'),
('DeltaForce2Image1', '../static/images/DeltaForce2Image1.jpg', 'Delta Force 2 Image 1', 'G013'),
('DeltaForce2Image2', '../static/images/DeltaForce2Image2.jpg', 'Delta Force 2 Image 2', 'G013'),
('DeltaForce2Image3', '../static/images/DeltaForce2Image3.jpg', 'Delta Force 2 Image 3', 'G013'),
('Dirt5Image1', '../static/images/Dirt5Image1.jpg', 'Dirt 5 Image 1', 'G014'),
('Dirt5Image2', '../static/images/Dirt5Image2.jpg', 'Dirt 5 Image 2', 'G014'),
('Dirt5Image3', '../static/images/Dirt5Image3.jpg', 'Dirt 5 Image 3', 'G014'),
('DuckHuntImage1', '../static/images/DuckHuntImage1.jpg', 'Duck Hunt Image 1', 'G015'),
('DuckHuntImage2', '../static/images/DuckHuntImage2.jpg', 'Duck Hunt Image 2', 'G015'),
('DuckHuntImage3', '../static/images/DuckHuntImage3.jpg', 'Duck Hunt Image 3', 'G015'),
('ElderScrolls6Image1', '../static/images/ElderScrolls6Image1.jpg', 'Elder Scrolls 6 Image 1', 'G016'),
('ElderScrolls6Image2', '../static/images/ElderScrolls6Image2.jpg', 'Elder Scrolls 6 Image 2', 'G016'),
('ElderScrolls6Image3', '../static/images/ElderScrolls6Image3.jpg', 'Elder Scrolls 6 Image 3', 'G016'),
('F12018Image1', '../static/images/F12018Image1.jpg', 'F1 2018 Image 1', 'G017'),
('F12018Image2', '../static/images/F12018Image2.jpg', 'F1 2018 Image 2', 'G017'),
('F12018Image3', '../static/images/F12018Image3.jpg', 'F1 2018 Image 3', 'G017'),
('ForzaHorizon4Image1', '../static/images/ForzaHorizon4Image1.jpg', 'Forza Horizon 4 Image 1', 'G018'),
('ForzaHorizon4Image2', '../static/images/ForzaHorizon4Image2.jpg', 'Forza Horizon 4 Image 2', 'G018'),
('ForzaHorizon4Image3', '../static/images/ForzaHorizon4Image3.jpg', 'Forza Horizon 4 Image 3', 'G018'),
('GranTurismoImage1', '../static/images/GranTurismoImage1.jpg', 'Gran Turismo Image 1', 'G019'),
('GranTurismoImage2', '../static/images/GranTurismoImage2.jpg', 'Gran Turismo Image 2', 'G019'),
('GranTurismoImage3', '../static/images/GranTurismoImage3.jpg', 'Gran Turismo Image 3', 'G019'),
('LoZBotWImage1', '../static/images/LegendOfZeldaBotWImage1.jpg', 'Legend of Zelda Breath of the Wild Image 1', 'G020'),
('LoZBotWImage2', '../static/images/LegendOfZeldaBotWImage2.jpg', 'Legend of Zelda Breath of the Wild Image 2', 'G020'),
('LoZBotWImage3', '../static/images/LegendOfZeldaBotWImage3.jpg', 'Legend of Zelda Breath of the Wild Image 3', 'G020'),
('MassEffect3Image1', '../static/images/MassEffect3Image1.jpg', 'Mass Effect 3 Image 1', 'G021'),
('MassEffect3Image2', '../static/images/MassEffect3Image2.jpg', 'Mass Effect 3 Image 2', 'G021'),
('MassEffect3Image3', '../static/images/MassEffect3Image3.jpg', 'Mass Effect 3 Image 3', 'G021'),
('NFSHPImage1', '../static/images/NFSHotPursuitImage1.jpg', 'NFS Hot Pursuit Image 1', 'G022'),
('NFSHPImage2', '../static/images/NFSHotPursuitImage2.jpg', 'NFS Hot Pursuit Image 2', 'G022'),
('NFSHPImage3', '../static/images/NFSHotPursuitImage3.jpg', 'NFS Hot Pursuit Image 3', 'G022'),
('NFSMWImage1', '../static/images/NFSMostWantedImage1.jpg', 'NFS Most Wanted Image 1', 'G023'),
('NFSMWImage2', '../static/images/NFSMostWantedImage2.jpg', 'NFS Most Wanted Image 2', 'G023'),
('NFSMWImage3', '../static/images/NFSMostWantedImage3.jpg', 'NFS Most Wanted Image 3', 'G023'),
('NFSPaybackImage1', '../static/images/NFSPaybackImage1.jpg', 'NFS Payback Image 1', 'G024'),
('NFSPaybackImage2', '../static/images/NFSPaybackImage2.jpg', 'NFS Payback Image 2', 'G024'),
('NFSPaybackImage3', '../static/images/NFSPaybackImage3.jpg', 'NFS Payback Image 3', 'G024'),
('NFSPorscheImage1', '../static/images/NFSPorscheImage1.jpg', 'NFS Porsche Image 1', 'G025'),
('NFSPorscheImage2', '../static/images/NFSPorscheImage2.jpg', 'NFS Porsche Image 2', 'G025'),
('NFSPorscheImage3', '../static/images/NFSPorscheImage3.jpg', 'NFS Porsche Image 3', 'G025'),
('ProjectCarsImage1', '../static/images/ProjectCarsImage1.jpg', 'Project Cars Image 1', 'G026'),
('ProjectCarsImage2', '../static/images/ProjectCarsImage2.jpg', 'Project Cars Image 2', 'G026'),
('ProjectCarsImage3', '../static/images/ProjectCarsImage3.jpg', 'Project Cars Image 3', 'G026'),
('RevoltImage1', '../static/images/RevoltImage1.jpg', 'Re-Volt Image 1', 'G027'),
('RevoltImage2', '../static/images/RevoltImage2.jpg', 'Re-Volt Image 2', 'G027'),
('RevoltImage3', '../static/images/RevoltImage3.jpg', 'Re-Volt Image 3', 'G027'),
('SuperMarioBrosImage1', '../static/images/SuperMarioBrosImage1.jpg', 'Super Mario Bros Image 1', 'G028'),
('SuperMarioBrosImage2', '../static/images/SuperMarioBrosImage2.jpg', 'Super Mario Bros Image 2', 'G028'),
('SuperMarioBrosImage3', '../static/images/SuperMarioBrosImage3.jpg', 'Super Mario Bros Image 3', 'G028'),
('TheSims2Image1', '../static/images/TheSims2Image1.jpg', 'The Sims 2 Image 1', 'G029'),
('TheSims2Image2', '../static/images/TheSims2Image2.jpg', 'The Sims 2 Image 2', 'G029'),
('TheSims2Image3', '../static/images/TheSims2Image3.jpg', 'The Sims 2 Image 3', 'G029'),
('TheSims4Image1', '../static/images/TheSims4Image1.jpg', 'The Sims 4 Image 1', 'G030'),
('TheSims4Image2', '../static/images/TheSims4Image2.jpg', 'The Sims 4 Image 2', 'G030'),
('TheSims4Image3', '../static/images/TheSims4Image3.jpg', 'The Sims 4 Image 3', 'G030');

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
-- Table structure for table `purchased`
--

CREATE TABLE `purchased` (
  `UserId` varchar(20) NOT NULL,
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
  `LastName` varchar(50) DEFAULT NULL,
  `PasswordHash` varchar(500) NOT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `EmailId` varchar(30) NOT NULL,
  `Gender` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Username`, `FirstName`, `LastName`, `PasswordHash`, `DateOfBirth`, `EmailId`, `Gender`) VALUES
('a1', 'a', 'a', 'aaaaaaaa', '2021-04-26', 'a@a.aa', 'M'),
('a11', 'a', 'b', '60e77261998d91bd06ea09b98e8fd294de48b1660dc59021eda77dcd9002b980293e2a38771de0eebf29cd483a2166e16cbe77457c0894a09719a1ea3cd4af3372d4cd17dfceafc48ded535002e41894ab9d466402ad297838c62c1736deb5bf', '2021-05-03', 'a@b.com', 'M'),
('a2', 'a', 'a', 'aaaaaaaa', '2021-05-05', 'a@a.aa', 'M'),
('a3', 'a', 'a', 'aaaaaaaa', '2021-05-06', 'a@a.aa', 'M'),
('a4', 'a', 'a', 'aaaaaaaa', '2021-04-30', 'a@a.aa', 'M'),
('a5', 'a', 'a', 'aaaaaaaa', '2021-05-05', 'a@a.aa', 'M');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`Username`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`UserId`,`GameId`);

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
-- Indexes for table `gamegenre`
--
ALTER TABLE `gamegenre`
  ADD PRIMARY KEY (`GameId`,`Genre`);

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
-- Indexes for table `purchased`
--
ALTER TABLE `purchased`
  ADD PRIMARY KEY (`UserId`,`GameId`);

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
