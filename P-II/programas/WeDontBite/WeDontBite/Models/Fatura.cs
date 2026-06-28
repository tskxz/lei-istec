using System;
using System.Collections.Generic;
using System.Text;

namespace WeDontBite.Models
{
    public class Fatura
    {
        private Guid _idFatura;
        private DateTime _dataEmissao;
        private Consulta _consulta;
        private decimal _valorTotal;

        public Guid getIdFatura()
        {
            return _idFatura;
        }

        public DateTime getDateTime()
        {
            return _dataEmissao;
        }

        public decimal getValorTotal()
        {
            return _valorTotal;
        }
        public void setConsulta(Consulta consulta)
        {
            _consulta = consulta;
        }

        public void setValorTotal(decimal valorTotal)
        {
            _valorTotal = valorTotal;
            if (_valorTotal <= 0)
            {
                _valorTotal = 1.00M;
            }
        }

        public Fatura()
        {
            _idFatura = Guid.NewGuid();
            _dataEmissao = DateTime.Now;
            setValorTotal(0);
        }
         public string GetInfo()
        {
            return $"Fatura: Id: {getIdFatura()} | Data Emissão: {getDateTime()} | Valor Total: {getValorTotal()}";
        }
    }
}
