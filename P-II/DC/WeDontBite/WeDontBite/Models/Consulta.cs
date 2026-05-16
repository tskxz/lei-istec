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

        public animal getAnimal(){
            return _animal;
        }

        public void setAnimal(Animal animal){
            _animal = animal;
        }

        public string getInfo()
        {
            string saida = "";
            saida += $"ID Consulta: {getIdConsulta()}, Veterenario: {getVeterenario().getInfo()}, Animal: {getAnimal().getInfo()}\n";
            return saida;
        }
    }
}
