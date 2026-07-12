using System;
using System.Collections.Generic;
using System.Text;

namespace DemoProps.Models
{
    public class Produto
    {
        private Guid _idProduto;
        private string _designacao;
        private decimal _precoUnitario;
        private decimal _qtdStock;
        private decimal _iva;


        public Guid getIdProduto() { return _idProduto; }

        // designacao
        public void setDesignacao(string designacao) {
            _designacao = designacao.Trim();
            if(_designacao.Length == 0)
            {
                _designacao = "Produto a classificar";
            }
        }
        public string getDesignacao() { return _designacao; }

        public string Designacao
        {
            get { return _designacao; }
            set {
                _designacao = value.Trim();
                if (_designacao.Length == 0)
                {
                    _designacao = "Produto a classificar";
                }
            }
        }
        
        public decimal IVA
        {
            get { return _iva; }
            set {
                _iva = value;
                if(_iva < 0)
                {
                    _iva = 0;
                }
                
                if(_iva > 23)
                {
                    _iva = 23;
                }
            }
        }

        // precoUnitario
        public void setPrecoUnitario(decimal precoUnitario) {
            _precoUnitario = precoUnitario;
            if (precoUnitario <= 0) _precoUnitario = 1.00M;
        }
        public decimal getPrecoUnitario() { return _precoUnitario; }

        // qtdStock
        public void setQtdStock(decimal qtdStock) {
            _qtdStock = qtdStock;
            if(_qtdStock < 0) _qtdStock = 0.0M;
        }
        public decimal getQtdStock() { return _qtdStock; }

        public Produto()
        {
            _idProduto = Guid.NewGuid();
            // setDesignacao("");
            Designacao = "";
            setPrecoUnitario(0);
            setQtdStock(0);
        }

        //public string getInfo()
        // {
        //     return $"ID: {getIdProduto()}\nProduto: {getDesignacao()}\nPreço: {getPrecoUnitario():C}\nStock: {getQtdStock()}";
        // }

        public override string ToString()
        {
            return $"ID: {getIdProduto()}\nProduto: {getDesignacao()}\nPreço: {getPrecoUnitario():C}\nStock: {getQtdStock()}\nIVA: {IVA}%";
        }
    }
}
