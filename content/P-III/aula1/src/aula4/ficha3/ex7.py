"""
7. Classificação de participantes com critérios variáveis
Implementa a função:
def classificar_participantes(*participantes, **pesos):
"""

ana = {"nome": "Ana", "teoria": 16, "pratica": 18}
bruno = {"nome": "Bruno", "teoria": 18, "pratica": 14}
carla = {"nome": "Carla", "teoria": 15}


def classificar_participantes(*participantes, **pesos):
    """
    Classifica participantes com base em critérios e pesos variáveis:
    - Valida se os pesos são não-negativos e a sua soma é positiva.
    - Atribui zero aos critérios em falta.
    - Ignora critérios dos participantes sem peso associado.
    - Ordena por pontuação decrescente e por nome em caso de empate.
    - Devolve lista de tuplas (nome, pontuacao) e dicionário {nome: [criterios_em_falta]}.
    """
    if not pesos:
        raise ValueError("É necessário definir pelo menos um critério com peso.")

    soma_pesos = sum(pesos.values())
    if any(peso < 0 for peso in pesos.values()) or soma_pesos <= 0:
        raise ValueError("Os pesos devem ser não negativos e a sua soma deve ser positiva.")

    classificacao = []
    em_falta = {}

    for p in participantes:
        nome = p["nome"]
        faltam = []
        pontuacao_total = 0.0

        for criterio, peso in pesos.items():
            if criterio in p:
                pontuacao_total += p[criterio] * peso
            else:
                faltam.append(criterio)
                # Atribui 0 ao critério em falta (0 * peso = 0)

        media_final = pontuacao_total / soma_pesos
        classificacao.append((nome, round(media_final, 2)))
        em_falta[nome] = faltam

    # Ordenar por pontuação decrescente (-x[1]) e, em empate, pelo nome (x[0])
    classificacao.sort(key=lambda x: (-x[1], x[0]))

    return classificacao, em_falta


def ex1():
    """
    1. Calcula a média ponderada de cada participante usando apenas os critérios indicados em pesos.
    """
    classificacao, _ = classificar_participantes(ana, bruno, carla, teoria=0.4, pratica=0.6)
    return classificacao


def ex2():
    """
    2. Atribui zero aos critérios em falta. Mostra os critérios que faltaram a cada participante.
    """
    _, em_falta = classificar_participantes(ana, bruno, carla, teoria=0.4, pratica=0.6)
    return em_falta


def ex3():
    """
    3. Ignora os critérios presentes nos participantes que não tenham um peso associado.
    """
    daniel = {"nome": "Daniel", "teoria": 15, "pratica": 15, "extra": 20}
    classificacao, _ = classificar_participantes(daniel, teoria=0.5, pratica=0.5)
    return classificacao


def ex4():
    """
    4. Ordena os participantes por pontuação decrescente e, nos empates, pelo nome.
    """
    empate1 = {"nome": "Beatriz", "teoria": 15}
    empate2 = {"nome": "Afonso", "teoria": 15}
    classificacao, _ = classificar_participantes(empate1, empate2, teoria=1.0)
    return classificacao


def ex5():
    """
    5. Devolve a classificação como lista de tuplos (nome, pontuacao) e um dicionário
    que associe cada nome à lista de critérios em falta (Exemplo do enunciado).
    """
    return classificar_participantes(ana, bruno, carla, teoria=0.4, pratica=0.6)


if __name__ == "__main__":
    classificacao, em_falta = ex5()
    print("ex1 (classificacao):", ex1())
    print("ex2 (criterios em falta):", ex2())
    print("ex3 (ignorar criterios sem peso):", ex3())
    print("ex4 (desempate por nome):", ex4())
    print("ex5 (exemplo completo):")
    print("  classificacao:", classificacao)
    print("  em_falta:", em_falta)
