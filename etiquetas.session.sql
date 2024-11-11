
CREATE DATABASE Etiquetas

USE Etiquetas;

CREATE TABLE Pais (
    IdPais INT AUTO_INCREMENT PRIMARY KEY,
    Pais VARCHAR(50)
);

CREATE TABLE Estado (
    IdEstado INT AUTO_INCREMENT PRIMARY KEY,
    Estado VARCHAR(50),
    IdPais INT,
    FOREIGN KEY (IdPais) REFERENCES Pais(IdPais)
);

CREATE TABLE Municipio (
    IdMunicipio INT AUTO_INCREMENT PRIMARY KEY,
    Municipio VARCHAR(50),
    IdEstado INT,
    FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado)
);

CREATE TABLE Direccion (
    IdDireccion INT AUTO_INCREMENT PRIMARY KEY,
    Direccion TEXT,
    IdMunicipio INT,
    FOREIGN KEY (IdMunicipio) REFERENCES Municipio(IdMunicipio)
);

CREATE TABLE Viñedo (
    IdViñedo INT AUTO_INCREMENT NOT NULL,
    Nombre TEXT,
    IdDireccion INT,
    Descripcion TEXT,
    Liga TEXT,
    PRIMARY KEY (IdViñedo),
    FOREIGN KEY (IdDireccion) REFERENCES Direccion(IdDireccion)
);

CREATE TABLE Uva (
    IdUva INT AUTO_INCREMENT NOT NULL,
    Uva VARCHAR(256) NOT NULL,
    Color VARCHAR(256) NOT NULL,
    PRIMARY KEY (IdUva)
);

CREATE TABLE Categoria (
    IdCategoria INT AUTO_INCREMENT NOT NULL,
    Categoria VARCHAR(256) NOT NULL UNIQUE,
    PRIMARY KEY (IdCategoria)
);


CREATE TABLE Vino (
    IdVino INT AUTO_INCREMENT NOT NULL,
    IdViñedo INT NOT NULL,
    IdCategoria INT NOT NULL,
    Vino TEXT NOT NULL,
    Crianza TEXT,
    Añejamiento TEXT,
    Temperatura TEXT,
    PRIMARY KEY (IdVino),
    FOREIGN KEY (IdViñedo) REFERENCES Viñedo(IdViñedo) ON DELETE CASCADE,
    FOREIGN KEY (IdCategoria) REFERENCES Categoria(IdCategoria) ON DELETE CASCADE
);

CREATE TABLE Cata (
    IdCata INT AUTO_INCREMENT NOT NULL,
    Vista TEXT NOT NULL,
    Boca TEXT NOT NULL,
    Nariz TEXT NOT NULL,
    Maridaje TEXT NOT NULL,
    IdVino INT NOT NULL UNIQUE,
    FOREIGN KEY(IdVino) REFERENCES Vino(IdVino) ON DELETE CASCADE,
    PRIMARY KEY (IdCata)
);

CREATE TABLE VinoUva (
    IdVino INT NOT NULL,
    IdUva INT NOT NULL,
    PRIMARY KEY (IdVino, IdUva),
    FOREIGN KEY (IdVino) REFERENCES Vino(IdVino) ON DELETE CASCADE,
    FOREIGN KEY (IdUva) REFERENCES Uva(IdUva) ON DELETE CASCADE
);

-- Llenado con información del excel
INSERT INTO Pais (Pais) VALUES ('Mexico');
INSERT INTO Estado (Estado, IdPais) VALUES ('Guanajuato', 1);

-- Suponiendo que las tablas `MunicipioExcel`, `Estado`, `RegionExcel`, `VinedoExcel`, `VinoExcel`, `CategoriasExcel`, y `UvaExcel` ya existen con los datos requeridos para los inserts:
INSERT INTO Municipio (Municipio, IdEstado)
SELECT M.Municipio, E.IdEstado
FROM MunicipioExcel AS M
INNER JOIN Estado AS E ON M.IdEstado = E.IdEstado;

INSERT INTO Direccion (Direccion, IdMunicipio)
SELECT R.Calle, R.IdMunicipio
FROM RegionExcel AS R;

INSERT INTO Viñedo (Nombre, IdDireccion, Descripcion, Liga)
SELECT V.Nombre, V.IDRegión, V.Información, V.Liga
FROM ViñedoExcel AS V;

INSERT INTO Categoria (Categoria)
SELECT C.Categoria
FROM CategoriasExcel AS C;

INSERT INTO Vino (IdViñedo, IdCategoria, Vino, Crianza, Añejamiento, Temperatura)
SELECT V2.IdViñedo, C.IdCategoria, V.Vino, V.Crianza, V.Añejamiento, V.Temperatura
FROM VinoExcel AS V
INNER JOIN Categoria C ON V.IDCategoria = C.IdCategoria
INNER JOIN Viñedo V2 ON V.IDViñedo = V2.IdViñedo;

INSERT INTO Cata (Vista, Boca, Nariz, Maridaje,IdVino)
SELECT V.Vista, V.Boca, V.Nariz, V.Maridaje, Vi.IdVino
FROM VinoExcel AS V
INNER JOIN Vino Vi ON V.IDVino = Vi.IdVino
WHERE V.IDVino IS NOT NULL;

INSERT INTO Uva (Uva, Color)
SELECT U.Uva, U.Color
FROM UvaExcel AS U;

INSERT INTO VinoUva (IdVino, IdUva)
SELECT V.IdVino, V.IdUva
FROM VinoUvaExcel AS V;


DELIMITER //

DROP PROCEDURE IF EXISTS sp_buscarVinot;
CREATE PROCEDURE sp_buscarVinot(
    IN VinoIn TEXT
)
BEGIN
   SELECT V.IdVino AS ID, V.Vino, Vi.Nombre AS Vinedo FROM Vino AS V INNER JOIN Viñedo AS Vi ON V.IdViñedo = Vi.IdViñedo WHERE V.Vino LIKE CONCAT('%',VinoIn,'%');
END //

SELECT * FROM Vino;

DELIMITER ;