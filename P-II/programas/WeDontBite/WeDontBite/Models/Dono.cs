using System;
using System.Collections.Generic;
using System.Text;

namespace WeDontBite.Models
{
    public class Dono : Contacto
    {
        private int _nrAnimais;
        #region "getters e setters"
        public void setNrAnimais(int nrAnimais)
        {
            _nrAnimais = nrAnimais;
            if (_nrAnimais < 0)
            {
                _nrAnimais = 0;
            }
        }

        public int getNrAnimais()
        {
            return _nrAnimais;
        }

        #endregion

        public Dono() : base()
        {
            setNrAnimais(0);
        }

        public override string getInfo()
        {
            string saida = "";
            saida = base.getInfo();
            saida += $"Dono: {getNrAnimais()} animais\n";
            return saida;
        }

    }
}
