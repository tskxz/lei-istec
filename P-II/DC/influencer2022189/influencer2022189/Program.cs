using influencer2022189.Models;

namespace influencer2022189
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Plataforma tanjil2022189 = new Plataforma();
            Seguidor seg1 = new Seguidor();
            seg1.setNome("Felisberto Silva");
            seg1.setEmail("felisberto@email.com");
            seg1.setNivelSeguidor(5);

            Seguidor seg2 = new Seguidor();
            seg2.setNome("Maria");
            seg2.setEmail("maria@email.com");
            seg2.setNivelSeguidor(3);

            Comentador com1 = new Comentador();
            com1.setNome("Carlos");
            com1.setEmail("carlos@email.com");
            com1.setPaisOrigem("Portugal");

            Comentador com2 = new Comentador();
            com2.setNome("Ana");
            com2.setEmail("ana.schmidt@email.com");
            com2.setPaisOrigem("Alemanha");

            Comentador com3 = new Comentador();
            com3.setNome("John Doe");
            com3.setEmail("john.doe@email.com");
            com3.setPaisOrigem("PT");

            Opiniao op1 = new Opiniao();
            op1.setTitulo("O Futuro da Inteligência Artificial");
            op1.setResumo("Uma reflexão sobre o impacto da tecnologia no quotidiano.");
            op1.setSeguidor(seg1);
            seg1.addOpiniao(op1);
            tanjil2022189.registarOpiniao(op1);

            // Opinião do Seguidor 2 (Testando strings vazias -> Regras de negócio)[cite: 1]
            Opiniao op2 = new Opiniao();
            op2.setTitulo("");
            op2.setResumo("");
            op2.setSeguidor(seg2);
            seg2.addOpiniao(op2);
            tanjil2022189.registarOpiniao(op2);

            Comentario c1 = new Comentario();
            c1.setTexto("Excelente ponto de vista! Concordo plenamente.");
            c1.setComentador(com1);
            c1.setOpiniao(op1);
            com1.addComentario(c1);
            op1.addComentario(c1);

            Comentario c2 = new Comentario();
            c2.setTexto("Acho que o impacto no mercado de trabalho vai ser gigante.");
            c2.setComentador(com2);
            c2.setOpiniao(op1);
            com2.addComentario(c2);
            op1.addComentario(c2);

            Comentario c3 = new Comentario();
            c3.setTexto("O post ficou sem conteúdo, mas o assunto interessa-me.");
            c3.setComentador(com2);
            c3.setOpiniao(op2);
            com2.addComentario(c3);
            op2.addComentario(c3);

            Comentario c4 = new Comentario();
            c4.setTexto("Fico à espera de mais detalhes para poder opinar.");
            c4.setComentador(com3);
            c4.setOpiniao(op2);
            com3.addComentario(c4);
            op2.addComentario(c4);


            tanjil2022189.mostrarAtividadeCompleta();

            Console.ReadLine();
        }
    }
}
