"""
3. Consolidação de transações e classificação de clientes
Cada transação é uma tupla com o formato (id_transacao, cliente, categoria, valor_centimos).
Usam-se valores inteiros em cêntimos.
"""

transacoes = [
    ("T01", "Ana", "Livros", 2500),
    ("T02", "Bruno", "Tecnologia", 8000),
    ("T03", "Ana", "Tecnologia", 5000),
    ("T02", "Bruno", "Tecnologia", 8000),
    ("T04", "Carla", "Livros", 3000),
    ("T05", "Bruno", "Livros", 2000),
    ("T06", "Ana", "Livros", 1500)
]


def remover_duplicados(lista_transacoes):
    """
    Remove transações duplicadas pelo identificador, preservando a primeira ocorrência
    e a ordem original.
    """
    vistos = set()
    unicas = []
    for t in lista_transacoes:
        id_transacao = t[0]
        if id_transacao not in vistos:
            vistos.add(id_transacao)
            unicas.append(t)
    return unicas


def ex1():
    """
    1. Remove transações duplicadas pelo identificador, preservando a primeira ocorrência
    e a ordem original.
    """
    return remover_duplicados(transacoes)


def ex2():
    """
    2. Constrói um dicionário com o total gasto por cliente.
    """
    unicas = remover_duplicados(transacoes)
    totais = {}
    for _, cliente, _, valor in unicas:
        totais[cliente] = totais.get(cliente, 0) + valor
    return totais


def ex3():
    """
    3. Constrói um dicionário aninhado no formato: {"Ana": {"Livros": 4000, "Tecnologia": 5000}}.
    """
    unicas = remover_duplicados(transacoes)
    gastos_categoria = {}
    for _, cliente, categoria, valor in unicas:
        if cliente not in gastos_categoria:
            gastos_categoria[cliente] = {}
        gastos_categoria[cliente][categoria] = gastos_categoria[cliente].get(categoria, 0) + valor
    return gastos_categoria


def ex4():
    """
    4. Produz uma lista de tuplas (cliente, total) ordenada por total decrescente e,
    nos empates, por nome.
    """
    totais = ex2()
    lista_totais = [(cliente, total) for cliente, total in totais.items()]
    lista_totais.sort(key=lambda x: (-x[1], x[0]))
    return lista_totais


def ex5():
    """
    5. Determina a categoria com maior faturação. Se houver empate, devolve todas as categorias
    empatadas.
    """
    unicas = remover_duplicados(transacoes)
    faturacao = {}
    for _, _, categoria, valor in unicas:
        faturacao[categoria] = faturacao.get(categoria, 0) + valor

    maior_valor = max(faturacao.values())
    melhores = [cat for cat, val in faturacao.items() if val == maior_valor]

    return melhores if len(melhores) > 1 else melhores[0]


if __name__ == "__main__":
    print("ex1 (sem duplicados):", ex1())
    print("ex2 (totais por cliente):", ex2())
    print("ex3 (gastos por categoria):", ex3())
    print("ex4 (clientes ordenados):", ex4())
    print("ex5 (maior faturacao):", ex5())
