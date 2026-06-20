using System;
using System.Collections.Generic;
using System.Text;

namespace Demo2022189.Models
{
    public class TarefaHelper
    {
        public void Insert(Tarefa tarefa)
        {
            App.lstTarefas.Add(tarefa);
        }

        public void Atualizar(Tarefa tarefa)
        {
            var tarefaExistente = App.lstTarefas.FirstOrDefault(t => t.IdTarefa == tarefa.IdTarefa);
            if (tarefaExistente != null)
            {
                tarefaExistente.Designacao = tarefa.Designacao;
                tarefaExistente.Descricao = tarefa.Descricao;
                tarefaExistente.Duracao = tarefa.Duracao;
                tarefaExistente.Custo = tarefa.Custo;
                tarefaExistente.Concluida = tarefa.Concluida;

            }
        }

        public void Apagar(Tarefa tarefa)
        {
            var tarefaExistente = App.lstTarefas.FirstOrDefault(t => t.IdTarefa == tarefa.IdTarefa);

            if (tarefaExistente != null)
            {
                App.lstTarefas.Remove(tarefaExistente);
            }
        }
    }
}
