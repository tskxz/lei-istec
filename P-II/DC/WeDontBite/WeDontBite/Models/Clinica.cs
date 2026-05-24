using System;
using System.Collections.Generic;
using System.Text;

namespace WeDontBite.Models
{
    public class Clinica : Contacto
    {
        private List<Consulta> _listConsulta;
        private decimal totalFaturado;

        public void AdicionarConsulta(Consulta consulta)
        {
            _listConsulta.Add(consulta);
            totalFaturado += consulta.getFatura().getValorTotal();
        }

        public Clinica() : base()
        {
            _listConsulta = new List<Consulta>();
            totalFaturado = 0;
        }

        public override string getInfo()
        {
            string saida = "";
            saida = base.getInfo();
            if(_listConsulta.Count == 0)
            {
                saida += "Sem consultas registadas\n";
            }
            else
            {
                foreach (Consulta consulta in _listConsulta)
                {
                    decimal totalFaturado = 0;

                    saida += consulta.getInfo();
                    totalFaturado += consulta.getFatura().getValorTotal();
                }
                saida += $"Total faturado: {totalFaturado}\n";
            }

            return saida;
        }
    }
}
