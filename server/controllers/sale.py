class Sale:
    def __init__(self):
        self.product_pizza = ""
        self.product_drink = ""
        self.qtd_pizza = 0
        self.qtd_drink = 0
        self.price_pizza = 0
        self.price_drink = 0
        self.total = 0

    def transaction(self, request_body):
        # product_pizza, product_drink, qtd_pizza, qtd_drink
        banco = [
            {"name": "Pizza de Calabresa", "price": 30}

        ]

        for product in banco:
            print(request_body["product_pizza"])
            print(product["name"])
            if request_body["product_pizza"] == product["name"]:
                self.product_pizza = product["name"]
                self.price_pizza = product["price"]
                self.qtd_pizza = request_body["qtd_pizza"]
            else:
                self.product_pizza = None
                self.price_pizza = None
                self.qtd_pizza = None

            if request_body["product_drink"] == product["name"]:
                self.product_drink = product["name"]
                self.price_drink = product["price"]
                self.qtd_drink = request_body["qtd_drink"]
            else:
                self.product_drink = None
                self.price_drink = None
                self.qtd_drink = None

        # self.total = (self.price_drink * self.qtd_drink if self.product_drink is not None else 0) + (self.price_pizza * self.qtd_pizza if self.product_pizza is not None else 0)

        return dict(
            product_pizza=self.product_pizza,
            product_drink=self.product_drink,
            qtd_pizza=self.qtd_pizza,
            qtd_drink=self.qtd_drink,
            price_pizza=self.price_pizza,
            price_drink=self.price_drink
            #total=self.total
        )
