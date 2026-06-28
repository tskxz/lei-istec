using DemoGetterSetters.Models;

namespace DemoGetterSetters
{
    internal class Program
    {
        static void Main(string[] args)
        {
            IMC imc = new IMC();
            imc.setPeso(70);
            imc.setAltura(1.70m);
            imc.setNome("  ");
            decimal resultado = imc.CalcularImc();
            string saida = $"O IMC de {imc.getNome()} com id {imc.getGuidIMC()} com peso {imc.getPeso()} e altura {imc.getAltura()} tem imc: {resultado}";
            Console.WriteLine(saida);
            Console.ReadLine();
        }
    }
}
