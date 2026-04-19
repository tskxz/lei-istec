using System;
using System.Collections.Generic;
using System.Text;

namespace DemoHeranca.Models
{
    public class Conteudo
    {
        // _idConteudo ReadOnly
        private Guid _idConteudo;

        // if _titulo = "", titulo = "Sem título
        private string _titulo;

        // if _autor = "", autor = "Anônimo"
        private string _autor;

        public void setTitulo(string titulo) {
            _titulo = titulo.Trim();
            if(_titulo.Length == 0) {
                _titulo = "Sem título";
            }
        }

        public string getTitulo() {
            return _titulo;
        }

        public void setAutor(string autor)
        {
            _autor = autor.Trim();
            if (_autor.Length == 0)
            {
                _autor = "Anônimo";
            }
        }

        public string getAutor() {
            return _autor;
        }

        public Guid getIdConteudo() {
            return _idConteudo;
        }

        public Conteudo() {
            _idConteudo = Guid.NewGuid();
            setTitulo("");
            setAutor("");
        }

        public virtual string show() {
            return $"ID: {getIdConteudo()}\nTítulo: {getTitulo()}\nAutor: {getAutor()}";
        }
    }
}
