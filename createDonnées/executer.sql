CREATE TABLE Executer(
    idM INT,
    idP INT,
    dateDebutE DATE,
    CONSTRAINT pk_Executer PRIMARY KEY (idM, idP),
    CONSTRAINT fk_executer_idM FOREIGN KEY (idM) REFERENCES Missions(idM),
    CONSTRAINT fk_executer_idP FOREIGN KEY (idP) REFERENCES Personnel(idP)
);