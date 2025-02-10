CREATE TABLE Missions (
    idM INT,
    nomM VARCHAR(255),
    descriptionM VARCHAR(255),
    dateDebutM DATE,
    dateFinM DATE,
    statutM ENUM('en préparation','planifiée','en cours','terminée'),
    CONSTRAINT pk_idM PRIMARY KEY (idM)
);