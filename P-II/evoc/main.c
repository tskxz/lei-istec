#include <stdio.h>
#include <stdlib.h>
#define MAX_NOME 128

void Ler(char *nome, int *ano) {
    printf("Insere o nome da pessoa :");
    gets(nome);
    printf("Digita o ano de nascimento da pessoa: ");
    scanf("%d", ano);
    fflush(stdin);
}

void Escrever(char *nome, int ano){
    int idade = 0;
    idade = 2026 - ano;
    printf("A pessoa chama-se %s nasceu em %d e tem %d ano\n",
           nome, ano, idade);
}

struct defPessoa {
    char nome[MAX_NOME];
    int anoNascimento;
};

int main()
{
    struct defPessoa P1;
    struct defPessoa P2;

    Ler (P1.nome, &P1.anoNascimento);
    Ler (P2.nome, &P2.anoNascimento);

    Escrever(P1.nome, P1.anoNascimento);
    Escrever(P1.nome, P2.anoNascimento);


     return 0;
}
