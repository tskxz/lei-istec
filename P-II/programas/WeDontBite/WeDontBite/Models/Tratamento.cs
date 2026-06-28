using System;
using System.Collections.Generic;
using System.Text;

namespace WeDontBite.Models
{
    public class Tratamento
    {
        private Guid _idTratamento;
        private string _designacao;
        private decimal _custo;

        #region getters e setters
        public Guid getIdTratamento()
        {
            return _idTratamento;
        }

        public void setDesignacao(string designacao)
        {
            _designacao = designacao.Trim();
            if (designacao.Length == 0) { 
                _designacao = "Geral";
            }
        }  

        public string getDesignacao()
        {
            return _designacao;
        }

        public void setCusto(decimal custo)
        {
            _custo = custo;
            if(_custo <= 0)
            {
                _custo = 1.00M;
            }
        }
        public decimal getCusto()
        {
            return _custo;
        }
        #endregion

        public Tratamento()
        {
            _idTratamento = Guid.NewGuid();
            setDesignacao("");
            setCusto(0);
        }

        public string GetInfo()
        {
            return $"Tratamento: Id: {getIdTratamento()} | Designação: {getDesignacao()} | Custo: {getCusto()}";
        }
    }
}
