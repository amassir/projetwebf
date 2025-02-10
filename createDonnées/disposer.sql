CREATE TABLE Disposer (
    idP INT,
    idC VARCHAR(5),
    aptitude ENUM('novice', 'confirmé'),
    CONSTRAINT pk_Disposer PRIMARY KEY (idP, idC),
    CONSTRAINT fk_Disposer_idP FOREIGN KEY (idP) REFERENCES Personnel(idP),
    CONSTRAINT fk_Disposer_idC FOREIGN KEY (idC) REFERENCES Competences(idC)
);