from models.manager import Produto


def insert_produtos(body):
    for produto in body:
        Produto.set(produto)


def get_produtos():
    produtos = Produto.get()
    lista_produtos = []
    for produto in produtos:
        dic = dict(
            nome=produto.nome,
            preco_atual=produto.preco_atual,
            qtd=produto.qtd

        )
        lista_produtos.append(dic)
    return lista_produtos
