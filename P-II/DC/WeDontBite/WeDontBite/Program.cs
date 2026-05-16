using WeDontBite.Models;

namespace WeDontBite
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Dono d1 = new Dono();
            // Veterenario v1 = new Veterenario();
            
            Animal a1 = new Animal();
            d1.setNome("maria");
            d1.setEmail("maria@net.pt");
            d1.setNif("123456789");
            d1.setNrAnimais(5);

            a1.setDono(d1);
            
            Console.WriteLine(d1.getInfo());
            // Console.WriteLine(v1.getInfo());
            Console.WriteLine(a1.getInfo());
            
        }
    }
}
