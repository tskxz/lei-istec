using System;
using System.Collections.Generic;
using System.Text;

namespace DemoGetterSetters.Models
{
    public class IMC
    {

        #region "Atributos"
        private Guid _guidIMC;
        private string _nome; // se _nome = "", _nome = "Anonimo"
        private decimal _peso; // se 4.5Mkg <= 500kg   
        private decimal _altura; // 0.5M <= altura <= 3m
        #endregion

        public IMC() {
            _guidIMC = Guid.NewGuid();
            setNome("");
            setPeso(0);
            setAltura(0);
        }

        #region "Getters/Setters"

        public Guid getGuidIMC() {
            return _guidIMC;
        }
        public void setNome(string nome)
        {
            _nome = nome.Trim(); // Remover espacos
            if (_nome.Length == 0)
            {
                _nome = "Anonimo";
            }
        }

        public string getNome()
        {
            return _nome;
        }

        public void setPeso(decimal peso)
        {
            _peso = peso;
            if(_peso < 4.5M)
            {
                _peso = 4.5M;
            }
            if(_peso > 500)
            {
                _peso = 500;
            }
        }

        public decimal getPeso()
        {
            return _peso;
        }

        public void setAltura(decimal altura)
        {
            _altura = altura;
            if(_altura < 0.1M)
            {
                _altura = 0.1M;
            }
            if(_altura > 3) {
                _altura = 3;
            }
        }

        public decimal getAltura() {
            return _altura;
        }
        #endregion


        #region "metodos de calculo"
        public decimal CalcularImc() {
           return _peso / (_altura * _altura);
        }
        #endregion
    }
}
