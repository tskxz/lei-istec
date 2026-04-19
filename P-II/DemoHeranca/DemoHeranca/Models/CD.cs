using System;
using System.Collections.Generic;
using System.Text;

namespace DemoHeranca.Models
{
    public class CD : Conteudo
    {
        // nMusicas = 1
        private int _nMusicas;
        private double _duracao;

        public void setNMusicas(int n) {
            _nMusicas = n;
        }

        public void setDurancao(double duracao)
        {
            _duracao = duracao;
        }

        public CD() : base() {
            setNMusicas(1);
        }

        public int getNMusicas() {
            return _nMusicas;
        }

        public double getDuracao() {
            return _duracao;
        }
        public override string show()
        {
            return $"{base.show()}\nN Musicas: {getNMusicas()}\nDuracao: {getDuracao()}";
        }

        public override string ToString()
        {
            return show();
        }
    }
}
