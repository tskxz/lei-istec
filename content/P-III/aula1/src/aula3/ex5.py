"""
Escreve um código para imprimir a chave do valor mínimo no seguinte dicionário:
dict = {
'Physics': 82,
'Math': 65,
'history': 75
}
"""

dict = {
    'Physics': 82,
    'Math': 65,
    'History': 75
}

print(min(dict, key=dict.get))