"""
Rotacionar uma Lista
Escreva um programa que rotacione uma lista para a direita por k posições. Por exemplo,
se k = 2, os dois últimos elementos movem-se para o início.
"""

lista_numeros = [1, 2, 3, 4, 5]
k = 2

for i in range(k):
    lista_numeros.insert(0, lista_numeros.pop())

print(lista_numeros)
