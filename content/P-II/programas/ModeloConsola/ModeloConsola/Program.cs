using ModeloConsola.Models;

namespace ModeloConsola
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Pessoa p;
            p = new Pessoa();
            // p._nome = "João";
            p.Ler();
            p.Escrever();
            Console.ReadLine();

            p.mostrarIMC();
        }
    }
}