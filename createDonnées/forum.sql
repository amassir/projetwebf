CREATE TABLE Forum (
    idF INT AUTO_INCREMENT,
    titreF VARCHAR(255),
    contenuF TEXT,
    votesPositifs INT,
    votesNegatifs INT,
    idU INT,
    CONSTRAINT pk_idF PRIMARY KEY (idF),
    CONSTRAINT fk_Forum_idU FOREIGN KEY (idU) REFERENCES Utilisateur(idU)
)