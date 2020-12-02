from models import Cardapio


def get_cardapio():
    cardapio = Cardapio.get()
    lista_cardapio = []
    for produto in cardapio:
        dic = dict(
            id=produto.id,
            nome=produto.nome,
            preco=produto.preco

        )
        lista_cardapio.append(dic.copy())
    return lista_cardapio