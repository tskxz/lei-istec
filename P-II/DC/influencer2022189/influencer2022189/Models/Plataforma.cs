using System;
using System.Collections.Generic;
using System.Text;

namespace influencer2022189.Models
{
    public class Plataforma
    {
        private List<Opiniao> _listaOpinioesGlobais;

        public Plataforma()
        {
            _listaOpinioesGlobais = new List<Opiniao>();
        }

        public void registarOpiniao(Opiniao op)
        {
            if (op != null)
            {
                _listaOpinioesGlobais.Add(op);
            }
        }

        public int getTotalOpinioes()
        {
            return _listaOpinioesGlobais.Count;
        }

        public int getTotalComentarios()
        {
            int total = 0;
            foreach (Opiniao op in _listaOpinioesGlobais)
            {
                total += op.getComentarios().Count;
            }
            return total;
        }
        public void mostrarAtividadeCompleta()
        {       
            foreach (Opiniao op in _listaOpinioesGlobais)
            {
                Console.WriteLine($"id: {op.getId()}Título: {op.getTitulo()} Resumo: {op.getResumo()} Data de Publicação: {op.getDataOpiniao()}");
                if (op.getSeguidor() != null)
                {
                    Console.WriteLine($"Publicado por: {op.getSeguidor().getNome()} (Nível {op.getSeguidor().getNivelSeguidor()})");
                }
                Console.WriteLine("COMENTÁRIOS DESTE POST:");
                if (op.getComentarios().Count == 0)
                {
                    Console.WriteLine("  -> Esta opinião ainda não tem comentários.");
                }
                else
                {
                    foreach (Comentario cm in op.getComentarios())
                    {
                        Console.WriteLine(cm.getInfo());
                        if (cm.getComentador() != null)
                        {
                            Console.WriteLine($"País do Autor: {cm.getComentador().getPaisOrigem()}");
                        }
                        Console.WriteLine();
                    }
                }
                Console.WriteLine();
            }

            
            Console.WriteLine($"Total de Opiniões Publicadas: {getTotalOpinioes()}");
            Console.WriteLine($"Total de Comentários Registados: {getTotalComentarios()}");
        }
    }
}
