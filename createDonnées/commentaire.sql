CREATE TABLE Commentaire (
    idO INT AUTO_INCREMENT,
    contenuC TEXT,
    idF INT,
    idU INT,
    CONSTRAINT pk_idO PRIMARY KEY (idO),
    CONSTRAINT fk_Commentaire_idF FOREIGN KEY (idF) REFERENCES Forum(idF),
    CONSTRAINT fk_Commentaire_idU FOREIGN KEY (idU) REFERENCES Utilisateur(idU)
)