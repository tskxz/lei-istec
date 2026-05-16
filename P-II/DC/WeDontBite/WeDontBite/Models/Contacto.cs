using System;
using System.Collections.Generic;
using System.Text;

namespace WeDontBite.Models
{
    public class Contacto
    {
        #region "atributos"
        private Guid _idContacto;
        private string _nome;
        private string _email;
        private string _nif;
        #endregion

        #region "getters e setters"

        public string getNome()
        {
            return _nome;
        }

        public void setNome(string nome)
        {
            _nome = nome.Trim();
            if(_nome.Length == 0)
            {
                _nome = "John Doe";
            }
        }

        public void setEmail(string email) {
            _email = email.Trim();
            if (_email.Length == 0)
            {
                _email = "";
            }

        }

        public string getEmail()
        {
            return _email;
        }

        public void setNif(string nif)
        {
            _nif = nif.Trim();
            if(_nif.Length == 0)
            {
                _nif = "---------";
            }
        }

        public string getNif()
        {
            return _nif;
        }

        public Guid getIdContacto()
        {
            return _idContacto;
        }

        public virtual string getInfo()
        {
            return $"ID Contacto: {getIdContacto()}, Nome: {getNome()} Email: {getEmail()}, NIF: {getNif()}\n";
        }

        #endregion

        #region "constructor"
        public Contacto()
        {
            _idContacto = Guid.NewGuid();
            setNome("");
            setEmail("");
            setNif("");
        }
        #endregion

    }
}
