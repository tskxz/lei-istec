"""
5. Recomendação de itens com base em avaliações
As avaliações estão organizadas num dicionário que associa cada utilizador a uma lista de tuplas
(item, nota). As notas variam entre 1 e 5.
"""

avaliacoes = {
    "Ana": [("Livro A", 5), ("Livro B", 3)],
    "Bruno": [("Livro A", 4), ("Livro C", 5), ("Livro D", 2)],
    "Carla": [("Livro B", 4), ("Livro C", 4), ("Livro D", 5)],
    "Daniel": [("Livro A", 3), ("Livro C", 3), ("Livro E", 5)]
}


def inverter_avaliacoes(dados_avaliacoes):
    """
    Inverte a estrutura para associar cada item à lista de notas atribuídas.
    """
    itens = {}
    for _, lista_itens in dados_avaliacoes.items():
        for item, nota in lista_itens:
            if item not in itens:
                itens[item] = []
            itens[item].append(nota)
    return itens


def calcular_estatisticas(itens_avaliacoes):
    """
    Calcula a média e a quantidade de avaliações para cada item.
    """
    estatisticas = {}
    for item, notas in itens_avaliacoes.items():
        media = round(sum(notas) / len(notas), 2)
        total = len(notas)
        estatisticas[item] = (media, total)
    return estatisticas


def recomendar(dados_avaliacoes, utilizador, minimo_avaliacoes=2, limite=3):
    """
    Recomenda itens a um utilizador com base nas avaliações globais:
    - Exclui itens já avaliados pelo utilizador.
    - Exclui itens que não atinjam o número mínimo de avaliações.
    - Ordena por média decrescente, número de avaliações decrescente e nome do item.
    - Devolve até `limite` tuplas (item, media, numero_avaliacoes).
    """
    itens_avaliados = set()
    if utilizador in dados_avaliacoes:
        itens_avaliados = {item for item, _ in dados_avaliacoes[utilizador]}

    itens_invertidos = inverter_avaliacoes(dados_avaliacoes)
    stats = calcular_estatisticas(itens_invertidos)

    candidatos = []
    for item, (media, count) in stats.items():
        if item in itens_avaliados:
            continue
        if count < minimo_avaliacoes:
            continue
        candidatos.append((item, media, count))

    # Ordenar por: média desc (-x[1]), contagem desc (-x[2]), nome asc (x[0])
    candidatos.sort(key=lambda x: (-x[1], -x[2], x[0]))

    return candidatos[:limite]


def ex1():
    """
    1. Inverte a estrutura para obter um dicionário que associe cada item à lista
    das suas avaliações.
    """
    return inverter_avaliacoes(avaliacoes)


def ex2():
    """
    2. Calcula, para cada item, a média e o número de avaliações.
    """
    itens = inverter_avaliacoes(avaliacoes)
    return calcular_estatisticas(itens)


def ex3():
    """
    3. Implementa a função recomendar(avaliacoes, utilizador, minimo_avaliacoes=2, limite=3).
    Demonstra a recomendação para 'Ana'.
    """
    return recomendar(avaliacoes, "Ana")


def ex4():
    """
    4. A função deve excluir os itens já avaliados pelo utilizador e os que não atingem
    o número mínimo de avaliações.
    """
    return recomendar(avaliacoes, "Ana", minimo_avaliacoes=2)


def ex5():
    """
    5. Ordena os candidatos por média decrescente, depois por número de avaliações
    decrescente e, finalmente, pelo nome do item.
    """
    return recomendar(avaliacoes, "Ana", limite=10)


def ex6():
    """
    6. Devolve até limite tuplas (item, media, numero_avaliacoes). Para um utilizador
    inexistente, considera que ainda não avaliou nenhum item.
    """
    return recomendar(avaliacoes, "UtilizadorInexistente", minimo_avaliacoes=2, limite=3)


if __name__ == "__main__":
    print("ex1 (itens -> avaliacoes):", ex1())
    print("ex2 (media e total por item):", ex2())
    print("ex3 (recomendacao para Ana):", ex3())
    print("ex4 (filtro minimo=2):", ex4())
    print("ex5 (candidatos ordenados):", ex5())
    print("ex6 (recomendacao utilizador novo):", ex6())
