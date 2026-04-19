using DemoHeranca.Models;
namespace DemoHeranca
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Conteudo conteudo = new Conteudo();
             Console.WriteLine(conteudo.show());

            Livro l = new Livro();
            l.setTitulo("teste");
            l.setAutor("xico");
            Console.WriteLine(l.show());

            Console.WriteLine(l.ToString());

            Jornal j = new Jornal();
            Console.WriteLine(j.show());

            CD c = new CD();
            Console.WriteLine(c.show());

            List<Conteudo> festa = new List<Conteudo>();
            festa.Add(l);
            festa.Add(c);
            festa.Add(j);

            foreach (Conteudo objeto in festa){
                Console.WriteLine(objeto.show());
            }

          
        }
    }
}
