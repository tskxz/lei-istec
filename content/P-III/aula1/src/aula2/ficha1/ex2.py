lista_numeros = input("Insira uma lista de números separados por espaços: ").split()

# contar numero par e impar
contador_par = 0
contador_impar = 0

for numero in lista_numeros:
    if int(numero) % 2 == 0:
        contador_par = contador_par + 1
    else:
        contador_impar = contador_impar + 1

print(f"Existem {contador_par} números pares")
print(f"Existem {contador_impar} números ímpares")

