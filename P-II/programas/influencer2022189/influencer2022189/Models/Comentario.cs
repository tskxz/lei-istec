using System;
using System.Collections.Generic;
using System.Text;

namespace influencer2022189.Models
{
    public class Comentario
    {
        private Guid _id;
        private string _texto;
        private DateTime _dataComentario;
        private Comentador _comentador;
        private Opiniao _opiniao;

        public void setTexto(string texto)
        {
            _texto = texto.Trim();
            if (texto.Length == 0) { 
                _texto = "Sem comentário";
            }
        }

        public string getTexto() { return _texto; }
        public DateTime getDataComentario() { return _dataComentario; }
        public void setComentador(Comentador comentador)
        {
            _comentador = comentador;
        }
        public Comentador getComentador() { return _comentador; }

        public void setOpiniao(Opiniao opiniao)
        {
            _opiniao = opiniao;
        }

        public Opiniao getOpiniao()
        {
            return _opiniao;
        }

        public Guid getId() { return _id; }
        public Comentario()
        {
            _id = Guid.NewGuid();
            setTexto("");
            _dataComentario = DateTime.Now;
            
        }

        public string getInfo()
        {
            return "ID: " + getId() + "\nTexto: " + getTexto() + "\nData: " + getDataComentario() + "\nComentador: " + (getComentador() != null ? getComentador().getNome() : "") ;
        }

    }
}
