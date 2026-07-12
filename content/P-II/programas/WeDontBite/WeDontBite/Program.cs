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
            
            Tratamento t1 = new Tratamento();
            t1.setDesignacao("vacina");
            t1.setCusto(5.0m);

            Tratamento t2 = new Tratamento();
            t2.setDesignacao("desparasitação");
            t2.setCusto(10.0m);

            Consulta c1 = new Consulta();
            
            c1.setAnimal(a1);
            c1.AddTratamento(t1);
            c1.AddTratamento(t2);
            Fatura f1 = new Fatura();
            c1.setFatura(f1);
            Console.WriteLine(c1.getInfo());

            Clinica clinica = new Clinica();
            clinica.setNome("Bite");
            clinica.AdicionarConsulta(c1);
            Console.WriteLine(clinica.getInfo());
        }
    }
}
