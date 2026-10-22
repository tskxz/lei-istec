"""
Calcule a separação binária
Uma “separação binária” dentro de um número inteiro positivo N é qualquer sequência
máxima de zeros consecutivos que está rodeada por uns em ambas as extremidades na
representação binária de N.
Por exemplo, o número 9 tem representação binária 1001 e contém uma separação binária
de comprimento 2. O número 529 tem representação binária 1000010001 e contém duas
separações binárias: uma de comprimento 4 e outra de comprimento 3. O número 20 tem
representação binária 10100 e contém uma separação binária de 1. O número 15 tem
representação binária 1111 e a separação binária é 0. O número 32 tem representação
binária 100000 e também a sua separação binária é 0.
Escreva uma função:
def solution(N)
que, dado um número inteiro positivo N, retorne o comprimento da sua “separação binária”
mais longa. A função deve retornar 0 se N não contiver um intervalo binário.
Por exemplo, dado N = 1041, a função deve retornar 5, porque N tem representação binária
10000010001 e, portanto, o seu intervalo binário mais longo tem comprimento 5. Dado N =
32, a função deve retornar 0, porque N tem representação binária ‘100000’ e, portanto, não
há intervalos binários.
Experimenta com varios numeros. Considere que N está no intervalo [1,20000]
"""