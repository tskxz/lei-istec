"""
Pesquisa binária em lista ordenada
Implemente uma função busca_binaria que receba uma lista ordenada e um valor alvo, e
retorne o índice do valor na lista caso ele exista, ou None caso não exista. Use controle
condicional e ciclos para executar a busca binária (dividir e conquistar)
"""

def busca_binaria(lista, alvo):
    inicio = 0
    fim = len(lista) - 1

    while inicio <= fim:
        meio = (inicio + fim) // 2

        if lista[meio] == alvo:
            return meio
        elif lista[meio] < alvo:
            inicio = meio + 1
        else:
            fim = meio - 1

    return None

if __name__ == "__main__":
    numeros = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
    
    alvos = [23, 2, 91, 50, 100]
    
    print(f"Lista: {numeros}\n")
    for alvo in alvos:
        resultado = busca_binaria(numeros, alvo)
        if resultado is not None:
            print(f"Valor {alvo}: encontrado no índice {resultado}")
        else:
            print(f"Valor {alvo}: não encontrado (None)")
