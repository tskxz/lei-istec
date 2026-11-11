"""
4. Deteção de conflitos em reservas de salas
Cada reserva é uma tupla (sala, inicio, fim, responsavel). Os horários são números inteiros que
representam horas do mesmo dia.
"""

reservas = [
    ("A", 9, 11, "Ana"),
    ("A", 10, 12, "Bruno"),
    ("A", 12, 14, "Carla"),
    ("B", 9, 10, "Daniel"),
    ("B", 10, 12, "Eva"),
    ("B", 11, 13, "Filipe")
]


def agrupar_por_sala(lista_reservas):
    """
    Agrupa as reservas num dicionário por sala.
    """
    salas = {}
    for r in lista_reservas:
        sala = r[0]
        if sala not in salas:
            salas[sala] = []
        salas[sala].append(r)
    return salas


def ex1():
    """
    1. Agrupa as reservas num dicionário cuja chave seja a sala e cujo valor seja a lista
    das respetivas reservas.
    """
    return agrupar_por_sala(reservas)


def ex2():
    """
    2. Ordena as reservas de cada sala pela hora de início.
    """
    salas = agrupar_por_sala(reservas)
    for sala in salas:
        salas[sala].sort(key=lambda r: r[1])
    return salas


def ex3():
    """
    3. Identifica todos os pares de reservas em conflito na mesma sala.
    (Considera os intervalos como [inicio, fim): uma reserva que termina às 10
    não entra em conflito com outra que começa às 10).
    """
    salas_ordenadas = ex2()
    pares_conflito = []

    for sala, lista in salas_ordenadas.items():
        n = len(lista)
        for i in range(n):
            for j in range(i + 1, n):
                r1 = lista[i]
                r2 = lista[j]
                # Há conflito se o início da segunda for estritamente anterior ao fim da primeira
                if r2[1] < r1[2]:
                    pares_conflito.append((r1[3], r2[3]))

    return pares_conflito


def ex4():
    """
    4. Considera os intervalos como [inicio, fim): uma reserva que termina às 10
    não entra em conflito com outra que começa às 10. Devolve a descrição dos conflitos identificados.
    """
    conflitos = ex3()
    return [f"{p[0]}–{p[1]}" for p in conflitos]


def ex5():
    """
    5. Calcula o tempo total de ocupação de cada sala, contando apenas uma vez os períodos
    sobrepostos.
    """
    salas_ordenadas = ex2()
    tempo_ocupacao = {}

    for sala, lista in salas_ordenadas.items():
        if not lista:
            tempo_ocupacao[sala] = 0
            continue

        # Fusão de intervalos contíguos ou sobrepostos [inicio, fim)
        intervalos_fundidos = []
        for r in lista:
            inicio, fim = r[1], r[2]
            if not intervalos_fundidos:
                intervalos_fundidos.append([inicio, fim])
            else:
                ultimo_inicio, ultimo_fim = intervalos_fundidos[-1]
                if inicio <= ultimo_fim:
                    # Sobreposição ou contiguidade -> estende o fim
                    intervalos_fundidos[-1][1] = max(ultimo_fim, fim)
                else:
                    intervalos_fundidos.append([inicio, fim])

        total_horas = sum(fim - inicio for inicio, fim in intervalos_fundidos)
        tempo_ocupacao[sala] = total_horas

    return tempo_ocupacao


if __name__ == "__main__":
    print("ex1 (agrupadas por sala):", ex1())
    print("ex2 (ordenadas por inicio):", ex2())
    print("ex3 (pares em conflito):", ex3())
    print("ex4 (pares formatados):", ex4())
    print("ex5 (tempo total de ocupacao):", ex5())
