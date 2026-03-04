#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#define MAX_NOME 128

using namespace std;

struct defPessoa {
    char nome[MAX_NOME];
    int anoNascimento;
    float peso;
    float altura;

    void Ler(){+
        printf("Nome da pessoa: ");
        gets(nome);

        printf("Ano de nascimento: ");
        scanf("%d", &anoNascimento);

        fflush(stdin);

        printf("Peso: ");
        scanf("%f", &peso);

        printf("Altura: ");
        scanf("%f", &altura);
    }

    void Escrever(){
        int idade = 0;
        idade = 2026 - anoNascimento;
        printf("%s nasceu em %d e tem %d anos.\nPeso: %.2f Altura: %.2f\n", nome, anoNascimento, idade, peso, altura);
    }
};

int main()
{
    defPessoa P1;
    defPessoa P2;

    P1.Ler();
    P1.Escrever();

    P2.Ler();
    P2.Escrever();

    return 0;
}
