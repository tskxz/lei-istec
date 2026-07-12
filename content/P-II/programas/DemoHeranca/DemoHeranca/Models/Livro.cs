using System;
using System.Collections.Generic;
using System.Text;

namespace DemoHeranca.Models
{
    public class Livro : Conteudo
    {
        // if _isbn = "", isbn = "0000000000000"
        private string _isbn;

        public void setISBN(string isbn) {
            _isbn = isbn.Trim();
            if(_isbn.Length == 0) {
                _isbn = "0000000000000";
            }
        }

        public Livro() : base() {
            setISBN("");
        }

        public string getISBN() {
            return _isbn;
        }

        public override string show()
        {
            return $"{base.show()}\nISBN: {getISBN()}";
        }

        public override string ToString()
        {
            return show();
        }
    }
}
