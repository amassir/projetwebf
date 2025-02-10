CREATE TABLE Caracteriser (
    idM INT,
    idC VARCHAR(5),
    statutC ENUM('non satisfait','satisfait'),
    CONSTRAINT pk_Caracteriser PRIMARY KEY (idM, idC),
    CONSTRAINT fk_caracteriser_idM FOREIGN KEY (idM) REFERENCES Missions(idM),
    CONSTRAINT fk_caracteriser_idC FOREIGN KEY (idC) REFERENCES Competences(idC)
);