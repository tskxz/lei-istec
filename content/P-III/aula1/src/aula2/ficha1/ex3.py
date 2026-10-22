"""
Remover Elementos Duplicados de uma Lista
Escreva um programa que remova os elementos duplicados de uma lista sem usar set().
Use ciclos e condições
"""

lista_numeros = [1, 2, 2, 3, 4, 4, 5]
lista_sem_duplicados = []

for numero in lista_numeros:
    if numero not in lista_sem_duplicados:
        lista_sem_duplicados.append(numero)

print(lista_sem_duplicados)
