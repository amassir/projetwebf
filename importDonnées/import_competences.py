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
fichier_csv = 'C:/Users/SADFI/Desktop/ProjetWebFinal/Données/liste_competences.csv'
with open(fichier_csv, newline='', encoding='utf-8') as fich_csv:
    donnees_csv = csv.reader(fich_csv, delimiter=';')
    for ligne in donnees_csv:
        cursor.execute(
            'INSERT INTO Competences (idC, nomCen, nomCfr) '
            'VALUES (%s, %s, %s)',
            ligne
        )

# Fermer la connexion à la base de données
mydb.commit()
cursor.close()
mydb.close()
print("Importation des données réussie")