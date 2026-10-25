"""
Escreve um código para trocar as chaves pelos valores num dicionário. Assuma que
todos os valores são únicos.
Input: dict1 = {'a': 1, 'b': 2, 'c': 3}
outtput: Invertido dictionary1: {1: 'a', 2: 'b', 3: 'c'}
"""

dict1 = {'a': 1, 'b': 2, 'c': 3}
print(f"{dict1.items()}")
newDict = dict(zip(dict1.values(), dict1.keys()))
print(newDict)