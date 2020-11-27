from models.manager import Sale, Item_Venda, db


class Vendas:

    def transaction(self, request_body):
        venda = Sale()
        db.session.add(venda)
        db.session.flush()

        for produto in request_body:
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

        return "vendas"
