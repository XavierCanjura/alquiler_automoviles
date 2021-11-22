-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 07-11-2021 a las 04:23:35
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alquiler_autos`
--
CREATE DATABASE IF NOT EXISTS `alquiler_autos` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `alquiler_autos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquileres`
--

CREATE TABLE `alquileres` (
  `id_alquiler_PK` int(11) NOT NULL,
  `id_usuario_FK` int(11) NOT NULL,
  `id_auto_FK` int(11) NOT NULL,
  `lugar_entrega` varchar(70) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_entrega` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `lugar_devolucion` varchar(70) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_devolucion` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `dias_alquiler` int(11) NOT NULL,
  `precio_neto` decimal(6,2) NOT NULL,
  `precio_total` decimal(6,2) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `alquileres`
--

INSERT INTO `alquileres` (`id_alquiler_PK`, `id_usuario_FK`, `id_auto_FK`, `lugar_entrega`, `fecha_entrega`, `lugar_devolucion`, `fecha_devolucion`, `dias_alquiler`, `precio_neto`, `precio_total`, `estado`) VALUES
(1, 1, 2, 'San Salvador', '12/10/2021', 'San Salvador', '13/10/2021', 2, '10.00', '20.00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autos`
--

CREATE TABLE `autos` (
  `id_auto_PK` int(11) NOT NULL,
  `id_modelo_FK` int(11) NOT NULL,
  `anio` int(4) NOT NULL,
  `placa` varchar(7) COLLATE utf8_spanish_ci NOT NULL,
  `precio_dia` decimal(6,2) NOT NULL,
  `transmision` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `pasajeros` int(11) NOT NULL,
  `puertas` int(11) NOT NULL,
  `ac` varchar(2) COLLATE utf8_spanish_ci NOT NULL,
  `motor` varchar(3) COLLATE utf8_spanish_ci NOT NULL,
  `vidrios_electricos` varchar(2) COLLATE utf8_spanish_ci NOT NULL,
  `imagen` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `id_estado_auto_FK` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `autos`
--

INSERT INTO `autos` (`id_auto_PK`, `id_modelo_FK`, `anio`, `placa`, `precio_dia`, `transmision`, `pasajeros`, `puertas`, `ac`, `motor`, `vidrios_electricos`, `imagen`, `id_estado_auto_FK`, `estado`) VALUES
(1, 1, 2012, 'P606050', '10.00', 'Automatico', 5, 4, 'si', '1.5', 'si', 'https://upload.wikimedia.org/wikipedia/commons/d/d3/2014_Toyota_Yaris_1.5_XLi_in_Chile.jpg', 1, 1),
(2, 1, 2018, 'P606060', '15.00', 'Manual', 6, 2, 'Si', '2', 'No', 'https://www.toyota.com.sv/wp-content/uploads/2018/05/Yaris-SD_Gray-Metallic-1G3-1.png', 1, 0),
(3, 1, 2018, 'P962610', '10.00', 'Manual', 5, 4, 'Si', '1.5', 'Si', 'https://upload.wikimedia.org/wikipedia/commons/d/d3/2014_Toyota_Yaris_1.5_XLi_in_Chile.jpg', 1, 0),
(4, 2, 2018, 'P959500', '10.00', 'Automatica', 5, 4, 'Si', '1.8', 'Si', 'https://www.bookaway.com/media/files/612f40feeec97646ae54af73.jpeg', 1, 0),
(5, 2, 2016, 'P959501', '10.00', 'Automatica', 5, 4, 'Si', '1.8', 'Si', 'https://www.bookaway.com/media/files/612f40feeec97646ae54af73.jpeg', 1, 1),
(6, 2, 2014, 'P987654', '15.00', 'Manual ', 4, 4, 'No', '1.8', 'No', 'https://www.bookaway.com/media/files/612f40feeec97646ae54af73.jpeg', 1, 1),
(8, 2, 2019, 'P984327', '20.00', 'Automático ', 5, 4, 'No', '2.0', 'Si', 'https://www.bookaway.com/media/files/612f40feeec97646ae54af73.jpeg', 1, 0),
(9, 3, 2015, 'P765490', '20.00', 'Manual', 5, 4, 'Si', '2.0', 'Si', 'https://m.media-amazon.com/images/I/71ksk7ZPahL.jpg', 1, 1),
(19, 3, 2020, 'P123890', '15.00', 'Automática ', 5, 4, 'Si', '1.8', 'Si', 'https://m.media-amazon.com/images/I/71ksk7ZPahL.jpg', 1, 0),
(21, 3, 2010, 'P66677', '12.00', 'Automática', 5, 2, 'Si', '2', 'Si', 'https://noticias.coches.com/wp-content/uploads/2014/07/mitsubishi_lancer-mx-e-japan-2010_r9.jpg', 1, 1),
(22, 2, 2022, 'P123466', '25.00', 'Automática', 4, 4, 'Si', '5', 'No', 'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2022/corolla/xseapex/1860/1hh/2.png?fm=webp&bg=white&w=768&h=328', 1, 0),
(23, 2, 2022, 'A666555', '15.00', 'Manual', 4, 4, 'Si', '2.3', 'Si', 'https://www.toyota.com/imgix/content/dam/toyota/jellies/max/2022/corollahybrid/hybridle/1882/089/2.png?fm=webp&bg=white&w=768&h=328', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_auto`
--

CREATE TABLE `estados_auto` (
  `id_estado_auto_PK` int(11) NOT NULL,
  `estado_auto` varchar(25) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `estados_auto`
--

INSERT INTO `estados_auto` (`id_estado_auto_PK`, `estado_auto`) VALUES
(1, 'Disponible'),
(2, 'Alquilado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id_marca_PK` int(11) NOT NULL,
  `marca` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id_marca_PK`, `marca`, `estado`) VALUES
(1, 'Toyota', 0),
(3, 'Kia', 1),
(4, 'Nissan', 0),
(6, 'Ford', 0),
(7, 'Mitsubishi', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelos`
--

CREATE TABLE `modelos` (
  `id_modelos_PK` int(11) NOT NULL,
  `id_marca_FK` int(11) NOT NULL,
  `modelo` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `modelos`
--

INSERT INTO `modelos` (`id_modelos_PK`, `id_marca_FK`, `modelo`, `estado`) VALUES
(1, 1, 'Yaris', 0),
(2, 1, 'Corrolla', 0),
(3, 7, 'Lancer', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_usuario`
--

CREATE TABLE `tipos_usuario` (
  `id_tipo_usuario_PK` int(11) NOT NULL,
  `tipo_usuario` varchar(25) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tipos_usuario`
--

INSERT INTO `tipos_usuario` (`id_tipo_usuario_PK`, `tipo_usuario`) VALUES
(1, 'Administrador'),
(2, 'Empleado'),
(3, 'Cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario_PK` int(11) NOT NULL,
  `id_tipo_usuario_FK` int(11) NOT NULL,
  `nombres` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `usuario` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_nacimiento` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` int(11) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario_PK`, `id_tipo_usuario_FK`, `nombres`, `apellidos`, `email`, `usuario`, `password`, `fecha_nacimiento`, `direccion`, `telefono`, `estado`) VALUES
(1, 1, 'Fernando Xavier', 'Maldonado Canjura', 'xavier@email.com', 'XavierCanjura', '$2b$10$DPR4DNcv71./eOYzZMbuzej7MGrwTdJ5gtVRYnTTggHgzce/auGJO', '29/04/2000', 'Nejapa', 12345678, 0),
(2, 1, 'Fernando Xavier', 'Maldonado Canjura', 'xavier6@gmail.com', 'Xavier6', '$2b$10$DPR4DNcv71./eOYzZMbuzej7MGrwTdJ5gtVRYnTTggHgzce/auGJO', '29/04/2000', 'Nejapa', 12345679, 0),
(3, 3, 'Julio', 'Pérez ', 'julio@gmail.com', 'JulioP', '$2b$10$P2E/PgNLGmaIsjPLnPKAs.WT1lLKUQw1jKJj7eed.OuDGm5.oIcJK', '20/05/1999', 'San Salvador ', 76890432, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquileres`
--
ALTER TABLE `alquileres`
  ADD PRIMARY KEY (`id_alquiler_PK`),
  ADD KEY `id_usuario_FK` (`id_usuario_FK`),
  ADD KEY `id_auto_FK` (`id_auto_FK`);

--
-- Indices de la tabla `autos`
--
ALTER TABLE `autos`
  ADD PRIMARY KEY (`id_auto_PK`),
  ADD UNIQUE KEY `placa` (`placa`),
  ADD KEY `id_modelo_FK` (`id_modelo_FK`),
  ADD KEY `id_estado_auto_FK` (`id_estado_auto_FK`);

--
-- Indices de la tabla `estados_auto`
--
ALTER TABLE `estados_auto`
  ADD PRIMARY KEY (`id_estado_auto_PK`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id_marca_PK`);

--
-- Indices de la tabla `modelos`
--
ALTER TABLE `modelos`
  ADD PRIMARY KEY (`id_modelos_PK`),
  ADD KEY `id_marca_FK` (`id_marca_FK`);

--
-- Indices de la tabla `tipos_usuario`
--
ALTER TABLE `tipos_usuario`
  ADD PRIMARY KEY (`id_tipo_usuario_PK`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario_PK`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD KEY `tipo_usuario` (`id_tipo_usuario_FK`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alquileres`
--
ALTER TABLE `alquileres`
  MODIFY `id_alquiler_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `autos`
--
ALTER TABLE `autos`
  MODIFY `id_auto_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `estados_auto`
--
ALTER TABLE `estados_auto`
  MODIFY `id_estado_auto_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id_marca_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `modelos`
--
ALTER TABLE `modelos`
  MODIFY `id_modelos_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipos_usuario`
--
ALTER TABLE `tipos_usuario`
  MODIFY `id_tipo_usuario_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario_PK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquileres`
--
ALTER TABLE `alquileres`
  ADD CONSTRAINT `alquileres_ibfk_1` FOREIGN KEY (`id_auto_FK`) REFERENCES `autos` (`id_auto_PK`),
  ADD CONSTRAINT `alquileres_ibfk_2` FOREIGN KEY (`id_usuario_FK`) REFERENCES `usuarios` (`id_usuario_PK`);

--
-- Filtros para la tabla `autos`
--
ALTER TABLE `autos`
  ADD CONSTRAINT `autos_ibfk_1` FOREIGN KEY (`id_modelo_FK`) REFERENCES `modelos` (`id_modelos_PK`),
  ADD CONSTRAINT `autos_ibfk_2` FOREIGN KEY (`id_estado_auto_FK`) REFERENCES `estados_auto` (`id_estado_auto_PK`);

--
-- Filtros para la tabla `modelos`
--
ALTER TABLE `modelos`
  ADD CONSTRAINT `modelos_ibfk_1` FOREIGN KEY (`id_marca_FK`) REFERENCES `marcas` (`id_marca_PK`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_tipo_usuario_FK`) REFERENCES `tipos_usuario` (`id_tipo_usuario_PK`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
