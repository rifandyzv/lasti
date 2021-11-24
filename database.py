import mysql.connector

db = mysql.connector.connect(
    user='root', 
    password='root', 
    host='localhost', 
    database='lasti')

cursor = db.cursor()
