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

            list_dic_venda = []
            list_id_venda = []
            
            for dic in result:
                if dic["id_venda"] not in list_id_venda:
                    dic_venda = {
                        "id": dic["id_venda"],
                        "data": dic["date"].strftime("%Y-%m-%d %H:%M:%S"),
                        "total": dic["preco_produto"] * dic["qtd_produto"],
                        "produtos": [{
                            "nome": dic["produto"],
                            "qtd": dic["qtd_produto"],
                            "preco": dic["preco_produto"]
                        }]
                    }
                    list_dic_venda.append(dic_venda.copy())
                    list_id_venda.append(dic["id_venda"])
                else:
                    for venda in list_dic_venda:
                        if dic["id_venda"] == venda["id"]:
                            venda["produtos"].append({
                                "nome": dic["produto"],
                                "qtd": dic["qtd_produto"],
                                "preco": dic["preco_produto"]
                            })
                            venda["total"] += dic["preco_produto"] * dic["qtd_produto"]
     
    finally:
        connection.close()

    return list_dic_venda
