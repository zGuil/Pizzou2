from models import Sale, Item_Venda, Produto, db
from app.code_pymysql import get_relatorios


class Vendas:

    def transaction(self, request_body):
        print(request_body)
        venda = Sale()
        db.session.add(venda)
        db.session.flush()
        for produto in request_body['produtos']:
            if produto["categoria"] == "bebida":
                produto_query = Produto.query.filter_by(nome=produto["nome"]).first()
                if int(produto["qtd"]) <= produto_query.qtd:
                    produto_query.qtd -= int(produto["qtd"])
                    db.session.add(produto_query)
                else:
                    return produto["nome"], produto_query.qtd

        
            item = Item_Venda()
            item.id_venda = venda.id
            item.produto = produto["nome"]
            item.qtd_produto = produto["qtd"]
            item.preco_produto = produto["preco"]

            db.session.add(item)
        db.session.commit()
        db.session.close()
        return "OK"

    def get(self, de_date, ate_date):
        relatorios = get_relatorios(de_date, ate_date)
        return relatorios

