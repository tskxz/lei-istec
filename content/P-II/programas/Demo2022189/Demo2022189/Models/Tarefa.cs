using System;
using System.Collections.Generic;
using System.Text;

namespace Demo2022189.Models
{
    public class Tarefa
    {
        private Guid _idTarefa;
        private string _designacao;
        private string _descricao;
        private int _duracao;
        private bool _concluida;
        private decimal _custo;

        public Guid IdTarefa
        {
            get { return _idTarefa; }
        }

        // se designacao = "" então -> "A definir"
        public string Designacao
        {
            get { return _designacao; }
            set
            {
                _designacao = value.Trim();
                if (_designacao.Length == 0)
                {
                    _designacao = "A definir";
                }
            }
        }

        //Se descricao = "" então -> "Sem descrição"
        public string Descricao
        {
            get { return _descricao; }
            set
            {
                _descricao = value.Trim();
                if (_descricao.Length == 0)
                {
                    _descricao = "Sem descrição";
                }
            }
        }

        //Duração deve ser um valor positivo
        public int Duracao
        {
            get { return _duracao; }
            set
            {
                _duracao = value;
                if (_duracao <= 0) { _duracao = 1; }
            }
        }

        public decimal Custo
        {
            get { return _custo; }
            set
            {
                _custo = value;
                if (_custo < 0) { _custo = 0; }
            }
        }

        public bool Concluida
        {
            get { return _concluida; }
            set { _concluida = value; }
        }

        public Tarefa()
        {
            _idTarefa = Guid.NewGuid();
            Designacao = "";
            Descricao = "";
            Duracao = 0;
            Concluida = false;
        }

        public override string ToString()
        {
            string saida = $"Tarefa: Guid - {IdTarefa}; Designação - {Designacao}; Notas - {Descricao}; Duração: {Duracao}; Concluida: {Concluida}";
            return saida;
        }
    }

}
