using System;
using System.Collections.Generic;
using System.Text;

namespace influencer2022189.Models
{
    public class Opiniao
    {
        private Guid _id;
        private string _titulo;
        private string _resumo;
        private DateTime _dataOpiniao;
        private List<Comentario> _lstComentarios;
        private Seguidor _seguidor;

        public Guid getId() { return _id; }
        public void setTitulo(string titulo)
        {
            _titulo = titulo;
            if(_titulo.Length == 0) {
                _titulo = "Sem título";
            }
        }

        public string getTitulo () { return _titulo; }
        public void setResumo(string resumo)
        {
            _resumo = resumo;
            if (_resumo.Length == 0)
            {
                _resumo = "Sem Descritivo";
            }
        }

        public string getResumo() { return _resumo; }
        public Seguidor getSeguidor() { return _seguidor; }
        public DateTime getDataOpiniao() { return _dataOpiniao; }
        public void setSeguidor(Seguidor seguidor)
        {
            _seguidor = seguidor;
        }

        public void addComentario(Comentario comentario)
        {
            _lstComentarios.Add(comentario);
        }

        public List<Comentario> getComentarios()
        {
            return _lstComentarios;
        }

        public Opiniao ()
        {
            _id = Guid.NewGuid();
            setTitulo("");
            setResumo("");
            _dataOpiniao = DateTime.Now;
            setSeguidor(new Seguidor());
            _lstComentarios = new List<Comentario>();
        }

        
    }
}
