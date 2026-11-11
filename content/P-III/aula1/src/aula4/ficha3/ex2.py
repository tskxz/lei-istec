"""
2. Gestão de inventário com histórico de movimentos
O inventário associa cada código de produto a um dicionário com os seus dados.
Os movimentos são tuplas no formato (codigo, tipo, quantidade).
"""
import copy

inventario = {
    "P01": {"nome": "Teclado", "preco": 30.0, "stock": 10},
    "P02": {"nome": "Rato", "preco": 15.0, "stock": 8},
    "P03": {"nome": "Monitor", "preco": 180.0, "stock": 4}
}

movimentos = [
    ("P01", "saida", 3),
    ("P02", "entrada", 5),
    ("P03", "saida", 6),
    ("P04", "entrada", 2),
    ("P01", "entrada", 4)
]


def processar_movimentos(inv, movs):
    """
    Processa os movimentos pela ordem apresentada, rejeitando movimentos inválidos
    e devolvendo um novo inventário sem alterar o original.
    """
    novo_inv = copy.deepcopy(inv)
    rejeitados = []

    for mov in movs:
        codigo, tipo, quantidade = mov

        if codigo not in novo_inv:
            rejeitados.append({"movimento": mov, "motivo": "Produto inexistente"})
            continue

        if tipo not in ("entrada", "saida"):
            rejeitados.append({"movimento": mov, "motivo": "Tipo inválido"})
            continue

        if quantidade <= 0:
            rejeitados.append({"movimento": mov, "motivo": "Quantidade não positiva"})
            continue

        if tipo == "saida" and quantidade > novo_inv[codigo]["stock"]:
            rejeitados.append({"movimento": mov, "motivo": "Saída superior ao stock disponível"})
            continue

        if tipo == "entrada":
            novo_inv[codigo]["stock"] += quantidade
        elif tipo == "saida":
            novo_inv[codigo]["stock"] -= quantidade

    return novo_inv, rejeitados


def ex1():
    """
    1. Implementa uma função que processe os movimentos pela ordem apresentada.
    """
    novo_inv, _ = processar_movimentos(inventario, movimentos)
    stock_final = {codigo: dados["stock"] for codigo, dados in novo_inv.items()}
    return stock_final


def ex2():
    """
    2. Rejeita movimentos com produto inexistente, tipo inválido, quantidade não positiva
    ou saída superior ao stock disponível.
    """
    _, rejeitados = processar_movimentos(inventario, movimentos)
    return [item["movimento"] for item in rejeitados]


def ex3():
    """
    3. Guarda os movimentos rejeitados numa lista de dicionários com o movimento original
    e o motivo da rejeição.
    """
    _, rejeitados = processar_movimentos(inventario, movimentos)
    return rejeitados


def ex4():
    """
    4. Devolve um novo inventário, sem alterar o original nem os seus dicionários internos.
    """
    novo_inv, _ = processar_movimentos(inventario, movimentos)
    return novo_inv


def ex5():
    """
    5. Calcula o valor total do inventário atualizado e lista os produtos com stock inferior a 5.
    """
    novo_inv, _ = processar_movimentos(inventario, movimentos)
    valor_total = sum(dados["preco"] * dados["stock"] for dados in novo_inv.values())
    baixo_stock = [codigo for codigo, dados in novo_inv.items() if dados["stock"] < 5]
    return {
        "valor_total": round(valor_total, 2),
        "produtos_stock_baixo": baixo_stock
    }


if __name__ == "__main__":
    print("ex1 (stock final):", ex1())
    print("ex2 (movimentos rejeitados):", ex2())
    print("ex3 (detalhes rejeições):", ex3())
    print("ex4 (novo inventario):", ex4())
    print("ex5 (valor total e baixo stock):", ex5())
