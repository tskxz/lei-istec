"""
No seguinte dicionario:
a. Imprime o valor da chave 'history'
b. Modifique o nome em “Mark”
dict = {
"class": {
"student": {
"name": "Mike",
"marks": {
"physics": 70,
"history": 80
}
}
}
}
"""

dict = {
    "class": {
        "student": {
            "name": "Mike",
            "marks": {
                "physics": 70,
                "history": 80
            }
        }
    }
}


print(dict["class"]["student"]["marks"]["history"])
dict["class"]["student"]["name"] = "Mark"
print(dict)