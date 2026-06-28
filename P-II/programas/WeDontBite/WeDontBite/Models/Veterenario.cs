using System;
using System.Collections.Generic;
using System.Text;

namespace WeDontBite.Models
{
    public class Veterenario : Contacto 
    {  
        private string _nrOrdem;

        #region "getters e setters"
        public void setNrOrdem(string nrOrdem)
        {
            _nrOrdem = nrOrdem.Trim();
            if (_nrOrdem.Length == 0)
            {
                _nrOrdem = "Indeterminado";
            }
        }

        public string getNrOrdem() 
        {
            return _nrOrdem;
        }
        #endregion

        public Veterenario() : base()
        {
            setNrOrdem("");
            
        }

        public override string getInfo()
        {
            string saida = "";
            saida = base.getInfo();
            saida += $"Veterenario: {getNrOrdem()}\n";
            return saida;
            
        }   

    }


}
