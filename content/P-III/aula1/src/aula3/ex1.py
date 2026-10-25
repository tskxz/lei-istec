"""
Escreve um programa em Python que converta duas listas em um dicionário, onde
os elementos da primeira lista se tornam as chaves e os elementos da segunda lista
se tornam os valores."
Input: keys = ['Ten', 'Twenty', 'Thirty'], values = [10, 20, 30]
Output: {'Ten': 10, 'Twenty': 20, 'Thirty': 30}
"""

keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

d1 = dict(zip(keys, values))
print(d1)
