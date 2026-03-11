using System;
using System.Collections.Generic;
using System.Text;

namespace ModeloConsola.Models
{
    public class Pessoa
    {
        private string _nome;
        private string _nif;
        private int _anoNascimento;

        public void Ler()
        {
            Console.Write("Nome: ");
            _nome = Console.ReadLine();
            Console.WriteLine("Nif: ");
            _nif = Console.ReadLine();
            Console.WriteLine("Ano de nascimento: ");
            _anoNascimento = Convert.ToInt32(Console.ReadLine());
        }

        public void Escrever()
        {
            int idade = 0;
            idade = DateTime.Now.Year - _anoNascimento;
            string saida = $"Nome: {_nome}\nNif: {_nif}\nAno de nascimento: {_anoNascimento}\nIdade: {idade}";
            Console.WriteLine(saida);
        }
    }

}
