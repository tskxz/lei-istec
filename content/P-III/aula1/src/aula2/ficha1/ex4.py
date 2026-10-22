"""
Gerador de Tabela de Multiplicação
Peça ao utilizador um número e imprima a sua tabela de multiplicação até 10 usando um
ciclo
"""

numero = int(input("Insira um número: "))

for i in range(1, 11):
    print(f"{numero} x {i} = {numero * i}")