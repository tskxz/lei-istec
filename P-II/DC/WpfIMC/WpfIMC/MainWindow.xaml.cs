using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WpfIMC
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void btnSair_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private void btnIMC_Click(object sender, RoutedEventArgs e)
        {
            decimal peso = decimal.Parse(txtPeso.Text);
            decimal altura = decimal.Parse(txtAltura.Text);
            decimal imc = peso / (altura * altura);
            
            lblResultado.Content = $"IMC: {imc}";
        }
    }
}