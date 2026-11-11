"""
6. Análise de classificações com opções de filtragem
Implementa a função:
def analisar_notas(*notas, **opcoes):
"""

OPCOES_VALIDAS = {"minimo", "maximo", "aprovacao", "excluir_extremos"}


def analisar_notas(*notas, **opcoes):
    """
    Analisa um conjunto variável de notas com parâmetros configuráveis por palavra-chave:
    - minimo: menor nota válida (omissão: 0)
    - maximo: maior nota válida (omissão: 20)
    - aprovacao: nota mínima de aprovação (omissão: 10)
    - excluir_extremos: remove 1 ocorrência da menor e da maior nota válida (omissão: False)

    Devolve:
        notas_analisadas (list), resumo (dict), invalidas (list)
    """
    for opcao in opcoes:
        if opcao not in OPCOES_VALIDAS:
            raise ValueError(f"Opção desconhecida: {opcao}")

    minimo = opcoes.get("minimo", 0)
    maximo = opcoes.get("maximo", 20)
    aprovacao = opcoes.get("aprovacao", 10)
    excluir_extremos = opcoes.get("excluir_extremos", False)

    # 1. Separar válidas de inválidas preservando a ordem
    validas = []
    invalidas = []
    for nota in notas:
        if minimo <= nota <= maximo:
            validas.append(nota)
        else:
            invalidas.append(nota)

    # 2. Se excluir_extremos=True e existirem pelo menos três válidas
    notas_analisadas = list(validas)
    if excluir_extremos and len(notas_analisadas) >= 3:
        menor = min(notas_analisadas)
        maior = max(notas_analisadas)
        notas_analisadas.remove(menor)
        notas_analisadas.remove(maior)

    # 3. Calcular média, aprovações e reprovações
    if not notas_analisadas:
        resumo = {
            "media": None,
            "aprovacoes": 0,
            "reprovacoes": 0
        }
    else:
        aprovacoes = sum(1 for n in notas_analisadas if n >= aprovacao)
        reprovacoes = sum(1 for n in notas_analisadas if n < aprovacao)
        media = round(sum(notas_analisadas) / len(notas_analisadas), 2)
        resumo = {
            "media": media,
            "aprovacoes": aprovacoes,
            "reprovacoes": reprovacoes
        }

    # 4. Devolve as notas analisadas, o resumo e as inválidas
    return notas_analisadas, resumo, invalidas


def ex1():
    """
    1. Separa as notas válidas das inválidas, preservando a ordem de entrada.
    """
    _, _, invalidas = analisar_notas(12, 18, 7, 25, 15)
    return {"invalidas": invalidas}


def ex2():
    """
    2. Se excluir_extremos=True e existirem pelo menos três notas válidas,
    remove uma ocorrência de cada extremo.
    """
    notas_filtradas, _, _ = analisar_notas(12, 18, 7, 25, 15, excluir_extremos=True)
    return notas_filtradas


def ex3():
    """
    3. Calcula a média e as quantidades de aprovações e reprovações apenas sobre
    as notas que permanecem na análise.
    """
    _, resumo, _ = analisar_notas(12, 18, 7, 25, 15, excluir_extremos=True)
    return resumo


def ex4():
    """
    4. Devolve três resultados: notas analisadas, resumo com média e contagens, e inválidas.
    (Exemplo do enunciado da Ficha 3).
    """
    return analisar_notas(
        12, 18, 7, 25, 15,
        aprovacao=10,
        excluir_extremos=True
    )


if __name__ == "__main__":
    notas, resumo, invalidas = ex4()
    print("ex1 (invalidas):", ex1())
    print("ex2 (notas analisadas):", ex2())
    print("ex3 (resumo):", ex3())
    print("ex4 (exemplo completo):")
    print("  notas:", notas)
    print("  resumo:", resumo)
    print("  invalidas:", invalidas)
