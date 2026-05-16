using System;
using System.Collections.Generic;
using System.Text;

namespace WeDontBite.Models
{
    public class Fatura
    {
        private Guid _idFatura;
        private Consulta _consulta;

        public Guid getIdFatura()
        {
            return _idFatura;
        }
        public void setConsulta(Consulta consulta)
        {
            _consulta = consulta;
        }
    }
}
