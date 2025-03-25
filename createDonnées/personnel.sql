CREATE TABLE Personnel (
    idP INT AUTO_INCREMENT,
    nomP VARCHAR(255),
    prenomP VARCHAR(255),
    dateEmbaucheP DATE,
    activiteP VARCHAR(255),
    statutP VARCHAR(255),
    CONSTRAINT pk_idP PRIMARY KEY (idP)
);
