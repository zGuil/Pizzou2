import pymysql.cursors

# Connect to the database
connection = pymysql.connect(host='db-ope-pizzou.ct2bcpzzh2py.us-east-1.rds.amazonaws.com',
                             user='admin',
                             password='Pizzou1234',
                             db='pizzou',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

try:
    with connection.cursor() as cursor:
        # Read a single record
        sql = "SELECT `id`, `password` FROM `users` WHERE `email`=%s"
        cursor.execute(sql, ('webmaster@python.org',))
        result = cursor.fetchone()
        print(result)
finally:
    connection.close()