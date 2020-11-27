import pymysql.cursors

def get_relatorios(de_date, de_ate):
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
            sql = """SELECT id_venda, qtd_produto, produto, preco_produto, sale.date
                    FROM pizzou.item_venda
                    JOIN pizzou.sale ON sale.id = item_venda.id_venda
                    where sale.date between %s and %s"""
            cursor.execute(sql, (de_date, de_ate,))
            result = cursor.fetchall()
            
    finally:
        connection.close()

    return result
