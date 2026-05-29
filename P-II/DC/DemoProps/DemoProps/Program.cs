using DemoProps.Models;

namespace DemoProps
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Produto produto = new Produto();
            // produto.setDesignacao("Coca-cola");
            produto.Designacao = "Coca-Cola";
            produto.IVA = 23.0M;
            produto.setPrecoUnitario(1.5m);
            produto.setQtdStock(100);
            Console.WriteLine(produto.ToString());

            Produto produto2 = new Produto();
            produto2.Designacao = "Pepsi";
            produto2.IVA = 1.00M;
            Console.WriteLine(produto2.ToString());
            Console.ReadKey();
        }
    }
}
