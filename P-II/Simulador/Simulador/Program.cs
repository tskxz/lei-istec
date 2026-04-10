using System.Security.Cryptography;
using Simulador.Models;


namespace Simulador
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Models.Simulador simulador = new Models.Simulador();
            simulador.setAnoNascimento(2005);
            decimal mensalidade = simulador.CalcularMensalidade();
            simulador.ExibirDados();
        }
    }
}
