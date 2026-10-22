lista_numeros = input("Insira uma lista de números separados por espaços: ").split()


maior_numero = int(lista_numeros[0])
for numero in lista_numeros:
    if int(numero) > maior_numero:
        maior_numero = int(numero)

print("O maior número da lista é: ", maior_numero)