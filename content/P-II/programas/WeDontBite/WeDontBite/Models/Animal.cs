using System;
using System.Collections.Generic;
using System.Text;

namespace WeDontBite.Models
{
    public class Animal
    {
        private Dono _dono;
        private Guid _idAnimal;
        private string _name;
        private string _especie;
        #region "getters e setters"
        public Guid getIdAnimal() {  return _idAnimal; }
        public string getName() { return _name; }
        public string getEspecie() { return _especie; }
        public Dono getDono() { return _dono; }

        public void setName(string name)
        {
            _name = name.Trim();
            if (_name.Length == 0)
            {
                _name = "Indeterminado";
            }
        }

        public void setEspecie(string especie)
        {
            _especie = especie.Trim();
            if (_especie.Length == 0)
            {
                _especie = "Indeterminado";
            }
        }

        public void setDono (Dono dono)
        {
            _dono = dono;
        }

        #endregion

        #region constructor
        public Animal() {
            _idAnimal = Guid.NewGuid();
            setName("");
            setEspecie("");
            _dono = new Dono();
        }

        public string getInfo()
        {
            string saida = "";
            saida += $"ID Animal: {getIdAnimal()}, Nome: {getName()} Especie: {getEspecie()} Dono: {getDono().getInfo()}\n";
            return saida;
        }
        #endregion
    }
}
