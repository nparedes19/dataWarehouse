-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-11-2021 a las 18:50:15
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `datawarehouse`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id_ciudad` int(10) NOT NULL,
  `id_pais` int(10) NOT NULL,
  `ciudad` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id_ciudad`, `id_pais`, `ciudad`) VALUES
(2, 2, 'Cordoba'),
(3, 1, 'Bogotá'),
(17, 3, 'CMX'),
(18, 1, 'Cali');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compania`
--

CREATE TABLE `compania` (
  `id_compania` int(10) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefono` varchar(30) NOT NULL,
  `id_ciudad` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `compania`
--

INSERT INTO `compania` (`id_compania`, `nombre`, `direccion`, `email`, `telefono`, `id_ciudad`) VALUES
(3, 'de Raiz', 'calle18 #66-51', 'deraiz@hotmail.com', '1234455', 3),
(4, 'alltic', 'calle 18 #66-51', 'alltic@hotmail.com', '3155447864', 2),
(5, 'esap', 'carra 20 #56-90', 'esap@hotmail.com', '1234567', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id_contacto` int(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `id_compania` int(10) NOT NULL,
  `id_ciudad` int(10) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `interes` int(10) NOT NULL,
  `cuenta_telefono` varchar(100) NOT NULL,
  `preferencia_telefono` int(10) NOT NULL,
  `cuenta_whatsapp` int(15) NOT NULL,
  `preferencia_whatsapp` int(10) NOT NULL,
  `cuenta_instagram` varchar(100) NOT NULL,
  `preferencia_instagram` int(10) NOT NULL,
  `cuenta_facebook` varchar(100) NOT NULL,
  `preferencia_facebook` int(10) NOT NULL,
  `cuenta_linkedin` varchar(100) NOT NULL,
  `preferencia_linkedin` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id_contacto`, `nombre`, `apellido`, `id_compania`, `id_ciudad`, `direccion`, `cargo`, `interes`, `cuenta_telefono`, `preferencia_telefono`, `cuenta_whatsapp`, `preferencia_whatsapp`, `cuenta_instagram`, `preferencia_instagram`, `cuenta_facebook`, `preferencia_facebook`, `cuenta_linkedin`, `preferencia_linkedin`) VALUES
(3, 'Alejandra', 'Castrillon', 4, 2, 'Calle 18 #66-51', 'gerente', 0, '141323123', 1, 21313123, 1, '@ale_castrillon', 1, 'alejandracastri', 1, 'alejac', 1),
(7, 'Natalia', 'Paredes', 4, 18, 'Pasoancho con 66', 'Ingeniera de Procesos', 75, '3166955945', 3, 2147483647, 2, 'nataliaparedesm', 2, 'nataliaparedesm', 1, 'nataliaparedesm', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `id_pais` int(10) NOT NULL,
  `id_regiones` int(10) NOT NULL,
  `pais` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`id_pais`, `id_regiones`, `pais`) VALUES
(1, 1, 'colombia'),
(2, 1, 'Argentina'),
(3, 2, 'Mexico'),
(5, 1, 'Venezuela'),
(7, 1, 'Chile');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencias`
--

CREATE TABLE `preferencias` (
  `id_preferencia` int(10) NOT NULL,
  `preferencia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `preferencias`
--

INSERT INTO `preferencias` (`id_preferencia`, `preferencia`) VALUES
(1, 'Canal favorito'),
(2, 'No molestar'),
(3, 'Sin preferencia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regiones`
--

CREATE TABLE `regiones` (
  `id_regiones` int(10) NOT NULL,
  `region` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `regiones`
--

INSERT INTO `regiones` (`id_regiones`, `region`) VALUES
(1, 'Suramerica'),
(2, 'Norteamerica'),
(3, 'Europa'),
(4, 'Asia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(10) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `correo` varchar(20) NOT NULL,
  `fullname` varchar(30) NOT NULL,
  `telefono` int(10) DEFAULT NULL,
  `password` varchar(10) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `correo`, `fullname`, `telefono`, `password`, `is_admin`) VALUES
(1, 'nparedes', 'natalia@hotmail.com', 'natalia paredes', 6955945, 'hola1234', 1),
(17, 'alecastri', 'aleja@hotmail.com', 'alejandra castrillon', 3432432, 'hola1234', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id_ciudad`),
  ADD KEY `id_pais` (`id_pais`);

--
-- Indices de la tabla `compania`
--
ALTER TABLE `compania`
  ADD PRIMARY KEY (`id_compania`),
  ADD KEY `id_ciudad` (`id_ciudad`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id_contacto`),
  ADD KEY `id_ciudad` (`id_ciudad`),
  ADD KEY `id_compañia` (`id_compania`),
  ADD KEY `preferencia_instagram` (`preferencia_instagram`),
  ADD KEY `preferencia_facebook` (`preferencia_facebook`),
  ADD KEY `preferencia_linkedin` (`preferencia_linkedin`),
  ADD KEY `preferencia_telefono` (`preferencia_telefono`),
  ADD KEY `preferencia_whatsapp` (`preferencia_whatsapp`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id_pais`),
  ADD KEY `id_regiones` (`id_regiones`);

--
-- Indices de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD PRIMARY KEY (`id_preferencia`);

--
-- Indices de la tabla `regiones`
--
ALTER TABLE `regiones`
  ADD PRIMARY KEY (`id_regiones`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id_ciudad` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `compania`
--
ALTER TABLE `compania`
  MODIFY `id_compania` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id_contacto` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `id_pais` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  MODIFY `id_preferencia` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `regiones`
--
ALTER TABLE `regiones`
  MODIFY `id_regiones` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `ciudades_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`);

--
-- Filtros para la tabla `compania`
--
ALTER TABLE `compania`
  ADD CONSTRAINT `compania_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`);

--
-- Filtros para la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD CONSTRAINT `contactos_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id_ciudad`),
  ADD CONSTRAINT `contactos_ibfk_2` FOREIGN KEY (`id_compania`) REFERENCES `compania` (`id_compania`),
  ADD CONSTRAINT `contactos_ibfk_3` FOREIGN KEY (`preferencia_instagram`) REFERENCES `preferencias` (`id_preferencia`),
  ADD CONSTRAINT `contactos_ibfk_4` FOREIGN KEY (`preferencia_facebook`) REFERENCES `preferencias` (`id_preferencia`),
  ADD CONSTRAINT `contactos_ibfk_5` FOREIGN KEY (`preferencia_linkedin`) REFERENCES `preferencias` (`id_preferencia`),
  ADD CONSTRAINT `contactos_ibfk_6` FOREIGN KEY (`preferencia_telefono`) REFERENCES `preferencias` (`id_preferencia`),
  ADD CONSTRAINT `contactos_ibfk_7` FOREIGN KEY (`preferencia_whatsapp`) REFERENCES `preferencias` (`id_preferencia`);

--
-- Filtros para la tabla `paises`
--
ALTER TABLE `paises`
  ADD CONSTRAINT `paises_ibfk_1` FOREIGN KEY (`id_regiones`) REFERENCES `regiones` (`id_regiones`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
