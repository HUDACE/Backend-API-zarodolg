-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Dec 12. 12:20
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `513szoft_zarodolgozatok`
--
CREATE DATABASE IF NOT EXISTS `513szoft_zarodolgozatok` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `513szoft_zarodolgozatok`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `dolgozatok`
--

CREATE TABLE `dolgozatok` (
  `ID` int(11) NOT NULL,
  `nev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `zarodolgozatcim` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `rovidleiras` varchar(150) COLLATE utf8_hungarian_ci NOT NULL,
  `leadasidatum` date NOT NULL,
  `konzulensnev` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `ertekeles` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `dolgozatok`
--
ALTER TABLE `dolgozatok`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `dolgozatok`
--
ALTER TABLE `dolgozatok`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
