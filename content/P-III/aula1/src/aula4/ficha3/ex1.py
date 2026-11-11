"""
Cada aluno é representado por um dicionário. As notas estão numa lista de tuplas, em que cada
tupla contém o nome da disciplina e a respetiva nota.
"""

def ex1():
    """
    Cria um dicionário que associe o número de cada aluno à sua média, arredondada a duas casas decimais.
    """
    alunos = [
        {
        "numero": 101,
        "nome": "Ana",
        "notas": [("Matemática", 16), ("Programação", 18), ("Inglês", 14)]
        },
        {
        "numero": 102,
        "nome": "Bruno",
        "notas": [("Matemática", 9), ("Programação", 15), ("Inglês", 13)]
        },
        {
        "numero": 103,
        "nome": "Carla",
        "notas": [("Matemática", 17), ("Programação", 16), ("Inglês", 18)]
        }
    ]

    for aluno in alunos:
        soma_notas = 0
        for nota in aluno["notas"]:
            soma_notas += nota[1]
        media = soma_notas / len(aluno["notas"])
        aluno["media"] = round(media, 2)

    medias = {aluno["numero"]: aluno["media"] for aluno in alunos}
    
    return medias

def ex2():
    """
    Produz uma lista de tuplas (nome, media), ordenada por média decrescente. Em caso de
    empate, ordena pelo nome.
    """
    alunos = [
        {
        "numero": 101,
        "nome": "Ana",
        "notas": [("Matemática", 16), ("Programação", 18), ("Inglês", 14)]
        },
        {
        "numero": 102,
        "nome": "Bruno",
        "notas": [("Matemática", 9), ("Programação", 15), ("Inglês", 13)]
        },
        {
        "numero": 103,
        "nome": "Carla",
        "notas": [("Matemática", 17), ("Programação", 16), ("Inglês", 18)]
        }
    ]

    for aluno in alunos:
        soma_notas = 0
        for nota in aluno["notas"]:
            soma_notas += nota[1]
        media = soma_notas / len(aluno["notas"])
        aluno["media"] = round(media, 2)

    lista_tuplas = [(aluno["nome"], aluno["media"]) for aluno in alunos]
    lista_tuplas.sort(key=lambda x: (-x[1], x[0]))
    return lista_tuplas

def ex3():
    """
    Calcula a média de cada disciplina.
    """
    alunos = [
        {
        "numero": 101,
        "nome": "Ana",
        "notas": [("Matemática", 16), ("Programação", 18), ("Inglês", 14)]
        },
        {
        "numero": 102,
        "nome": "Bruno",
        "notas": [("Matemática", 9), ("Programação", 15), ("Inglês", 13)]
        },
        {
        "numero": 103,
        "nome": "Carla",
        "notas": [("Matemática", 17), ("Programação", 16), ("Inglês", 18)]
        }
    ]

    disciplinas_notas = {}
    for aluno in alunos:
        for disciplina, nota in aluno["notas"]:
            if disciplina not in disciplinas_notas:
                disciplinas_notas[disciplina] = []
            disciplinas_notas[disciplina].append(nota)

    medias_disciplinas = {
        disciplina: round(sum(notas) / len(notas), 2)
        for disciplina, notas in disciplinas_notas.items()
    }
    return medias_disciplinas


def ex4():
    """
    Identifica os alunos com pelo menos uma nota inferior a 10.
    """
    alunos = [
        {
        "numero": 101,
        "nome": "Ana",
        "notas": [("Matemática", 16), ("Programação", 18), ("Inglês", 14)]
        },
        {
        "numero": 102,
        "nome": "Bruno",
        "notas": [("Matemática", 9), ("Programação", 15), ("Inglês", 13)]
        },
        {
        "numero": 103,
        "nome": "Carla",
        "notas": [("Matemática", 17), ("Programação", 16), ("Inglês", 18)]
        }
    ]

    alunos_nota_inferior_10 = []
    for aluno in alunos:
        for disciplina, nota in aluno["notas"]:
            if nota < 10:
                alunos_nota_inferior_10.append(aluno["nome"])
                break
    return alunos_nota_inferior_10

def ex5():
    """
    Identifica o melhor aluno de cada disciplina. Se houver empate, inclui todos os nomes.
    """
    alunos = [
        {
        "numero": 101,
        "nome": "Ana",
        "notas": [("Matemática", 16), ("Programação", 18), ("Inglês", 14)]
        },
        {
        "numero": 102,
        "nome": "Bruno",
        "notas": [("Matemática", 9), ("Programação", 15), ("Inglês", 13)]
        },
        {
        "numero": 103,
        "nome": "Carla",
        "notas": [("Matemática", 17), ("Programação", 16), ("Inglês", 18)]
        }
    ]

    melhores_por_disciplina = {}
    for aluno in alunos:
        for disciplina, nota in aluno["notas"]:
            if disciplina not in melhores_por_disciplina:
                melhores_por_disciplina[disciplina] = {"nota": nota, "nomes": [aluno["nome"]]}
            else:
                if nota > melhores_por_disciplina[disciplina]["nota"]:
                    melhores_por_disciplina[disciplina] = {"nota": nota, "nomes": [aluno["nome"]]}
                elif nota == melhores_por_disciplina[disciplina]["nota"]:
                    melhores_por_disciplina[disciplina]["nomes"].append(aluno["nome"])

    resultado = {
        disciplina: dados["nomes"] if len(dados["nomes"]) > 1 else dados["nomes"][0]
        for disciplina, dados in melhores_por_disciplina.items()
    }
    return resultado

if __name__ == "__main__":
    print("ex1:", ex1())
    print("ex2:", ex2())
    print("ex3:", ex3())
    print("ex4:", ex4())
    print("ex5:", ex5())



