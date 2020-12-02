from models import Produto


def insert_produtos(body):
    produtos = get_produtos()
    for produto in produtos:
        if body["nome"].lower() == produto["nome"].lower():
            return None
    Produto.set(body)
    return "OK"


def update_produto(body):
    Produto.update(body)

def delete_produto(id):
    #for produto in body:
    Produto.delete(id)

def get_produtos():
    produtos = Produto.get()
    lista_produtos = []
    for produto in produtos:
        if produto.descricao != "":
            dic = dict(
                id=produto.id,
                nome=produto.nome,
                preco_atual=produto.preco_atual,
                qtd=produto.qtd,
                descricao=produto.descricao

            )
        else:
            dic = dict(
                id=produto.id,
                nome=produto.nome,
                preco_atual=produto.preco_atual,
                qtd=produto.qtd,
                descricao="-"

            )
        lista_produtos.append(dic)
    return lista_produtos
