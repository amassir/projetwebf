CREATE TABLE Utilisateur (
    idU INT AUTO_INCREMENT,
    nomU VARCHAR(255),
    prenomU VARCHAR(255),
    emailU VARCHAR(255),
    mdpU VARCHAR(255),
    CONSTRAINT pk_idU PRIMARY KEY (idU)
);