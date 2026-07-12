using System;
using System.Collections.Generic;
using System.Text;

namespace WeDontBite.Models
{
    public class Consulta
    {
        private Veterenario _veterenario;
        private Fatura _fatura;
        private Animal _animal;
        private List<Tratamento> _lstTratamento;
        private Guid _idConsulta;
        
        public Guid getIdConsulta()
        {
            return _idConsulta;
        }

        public Veterenario getVeterenario(){
            return _veterenario;
        }

        public void setVeterenario(Veterenario vet){
            _veterenario = vet;
        }

        public Animal getAnimal(){
            return _animal;
        }

        public void setAnimal(Animal animal){
            _animal = animal;
        }

        public void setFatura(Fatura fatura)
        {
            decimal valorTotal = 0;

            _fatura = fatura;
            valorTotal = 50.00M; // Custo base da consulta

            if(_lstTratamento.Count > 0)
            {
                foreach (Tratamento tratamento in _lstTratamento)
                {
                    valorTotal += tratamento.getCusto();
                }
            }
            _fatura.setValorTotal(valorTotal);
        }

        public Fatura getFatura()
        {
            return _fatura;
        }

        public string getInfo()
        {
            decimal valorTotal = 0;
            string saida = "";
            saida += $"ID Consulta: {getIdConsulta()}, Veterenario: {getVeterenario().getInfo()}, Animal: {getAnimal().getInfo()}\n";
            if(_lstTratamento.Count == 0)
            {
                saida += "Sem tratamento\n";
            } else
            {
                saida += "Tratamentos:\n";
                foreach (Tratamento tratamento in _lstTratamento)
                {
                    valorTotal += tratamento.getCusto();
                    saida += $"\t{tratamento.GetInfo()}\n";
                }
                saida += $"\n{getFatura().GetInfo()}";
            }
            return saida;
        }

        public void AddTratamento(Tratamento tratamento)
        {
            _lstTratamento.Add(tratamento);
        }

        public Consulta()
        {
            _idConsulta = Guid.NewGuid();
            setVeterenario(new Veterenario());
            setAnimal(new Animal());
            _lstTratamento = new List<Tratamento>();
            setFatura(new Fatura());
        }
    }
}
