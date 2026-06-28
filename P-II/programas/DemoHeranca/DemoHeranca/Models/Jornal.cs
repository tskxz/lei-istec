using System;
using System.Collections.Generic;
using System.Text;

namespace DemoHeranca.Models
{
    public class Jornal : Conteudo
    {
        // periodicidade = "diario
        private string _periodicidade; 

        public void setPeriodicidade(string periodicidade) {
            _periodicidade = periodicidade.Trim();
            if(_periodicidade.Length == 0) {
                _periodicidade = "diario";
            }
        }

        
        public Jornal() : base() {
            setPeriodicidade("");
        }

        public string getPeriodicidade() {
            return _periodicidade;
        }

        public override string show()
        {
            return $"{base.show()}\nPeriodicidade: {getPeriodicidade()}";
        }

        public override string ToString()
        {
            return show();
        }
    }
}
