using System;
using System.Collections.Generic;
using System.Text;

namespace influencer2022189.Models
{
    public class Pessoa
    {
        private Guid _id;
        private string _nome;
        private string _email;

        #region getters e setters
        public void setNome(string nome)
        {
            _nome = nome.Trim();
            
        }
        public string getNome() {
            return _nome;
        }

        public void setEmail(string email) {
            _email = email.Trim();
        }
        public string getEmail() {
            return _email;
        }

        public Guid getId() { return  _id; }

        public Pessoa()
        {
            _id = Guid.NewGuid();
            setNome("");
            setEmail("");
        }
        #endregion

        public string getInfo()
        {
            return "ID: " + getId() + "\n" +
                   "Nome: " + getNome() + "\n" +
                   "Email: " + getEmail();
        }
    }
}
