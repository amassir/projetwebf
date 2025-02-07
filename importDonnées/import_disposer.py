import csv
import MySQLdb

# Informations de connexion à la base de donnée 
db_host = 'localhost'
db_port = 3306
db_user = 'root'
db_password = 'mdproot2025'
db_name = 'projetweb'

# Créer une connexion à la base de données
mydb = MySQLdb.connect(
    host=db_host,
    user=db_user,
    passwd=db_password,
    db=db_name
)
cursor = mydb.cursor()

# Lire le fichier CSV
fichier_csv = 'C:/Users/SADFI/Desktop/ProjetWebFinal/Données/competences_personnel.csv'
with open(fichier_csv, newline='', encoding='utf-8') as fich_csv:
    donnees_csv = csv.reader(fich_csv, delimiter=';')
    # Ignorer la première ligne du fichier CSV
    next(donnees_csv)  
    for ligne in donnees_csv:
        idP = ligne[0]
        competences = ligne[1:]
        for idC in competences:
            # Vérifier si la compétence existe dans la table Competences
            cursor.execute('SELECT COUNT(*) FROM Competences WHERE idC = %s', (idC,))
            if cursor.fetchone()[0] > 0:
                cursor.execute(
                    'INSERT INTO Disposer (idP, idC, aptitude) '
                    'VALUES (%s, %s, %s)',
                    (idP, idC, 'novice')
                )

# Fermer la connexion à la base de données
mydb.commit()
cursor.close()
mydb.close()
print("Importation des données réussie")