using System;
using System.Collections.Generic;
using System.Text;

namespace influencer2022189.Models
{
    public class Comentador : Pessoa
    {
        private string _paisOrigem;
        private List<Comentario> _lstComentarios;

        public void setPaisOrigem(string paisOrigem)
        {
            _paisOrigem = paisOrigem.Trim();
        }

        public string getPaisOrigem()
        {
            return _paisOrigem;
        }

        public Comentador()
        {
            setPaisOrigem("");
            _lstComentarios = new List<Comentario>();
        }

        public void addComentario(Comentario comentario)
        {
            _lstComentarios.Add(comentario);
        }

        public List<Comentario> getComentarios()
        {
            return _lstComentarios;
        }

        public string getInfo()
        {
            return "Nome: " + getNome() + "\nEmail: " + getEmail() + "\nPais: " + getPaisOrigem();
        }
    }
}
