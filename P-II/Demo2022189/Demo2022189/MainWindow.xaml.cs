using Demo2022189.Models;
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

namespace Demo2022189
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private Tarefa? tarefaEmEdicao = null;

        public MainWindow()
        {
            InitializeComponent();
            int minutosTotais = 0;
            int minutosPendentes = 0;
            App.lstTarefas.Add(new Tarefa
            {
                Designacao = "Estudar poo",
                Descricao = "Fazer PII",
                Custo = 30.12m,
                Duracao = 130,
                Concluida = true
            });
            App.lstTarefas.Add(new Tarefa
            {
                Designacao = "lavar loica",
                Descricao = "Ver alertas",
                Custo = 30.12m,
                Duracao = 10,
                Concluida = false
            });
            App.lstTarefas.Add(new Tarefa
            {
                Designacao = "Estudar ESTAD",
                Descricao = "Fazer ESTAD",
                Custo = 30.12m,
                Duracao = 240,
                Concluida = false
            });
            vidroPlacard.ItemsSource = App.lstTarefas;
            resetForm();
            foreach(Tarefa t in App.lstTarefas)
            {
                minutosTotais += t.Duracao;
                if (t.Concluida == false)
                {
                    minutosPendentes += t.Duracao;
                    
                }
            }
            lblTotalizador.Content = $"Total de tarefas: {App.lstTarefas.Count} | Total de minutos: {minutosTotais} | Total de minutos pendentes: {minutosPendentes} Total Custo: {App.lstTarefas.Sum(t => t.Custo):C}";
        }

        private void vidroPlacard_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var tarefaClicada = vidroPlacard.SelectedItem as Tarefa;
            if (tarefaClicada == null) return;
            tarefaEmEdicao = tarefaClicada;
            txtNome.Text = tarefaEmEdicao.Designacao;
            txtNotas.Text = tarefaEmEdicao.Descricao;
            txtDuracao.Text = tarefaEmEdicao.Duracao.ToString();
            txtCusto.Text = tarefaEmEdicao.Custo.ToString();
            chkConcluida.IsChecked = tarefaEmEdicao.Concluida;
            // MessageBox.Show("Tarefa: " + tarefaClicada.ToString());

            btnGravar.Content = "Atualizar";
            btnCancelar.IsEnabled = true;
            btnApagar.Visibility = Visibility.Visible;
        }

        private void btnSair_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
        private void btnGravar_Click(object sender, RoutedEventArgs e)
        {
            if(txtNome.Text.Trim().Length > 0){
                TarefaHelper th = new TarefaHelper();
                if(tarefaEmEdicao == null)
                    {

                
                    Tarefa t = new Tarefa();
                    t.Designacao = txtNome.Text.Trim();
                    t.Descricao = txtNotas.Text.Trim();
                    int duracao = 0;
                    decimal custo = 0;
                    try
                    {
                        duracao = Convert.ToInt32(txtDuracao.Text);
                        custo = Convert.ToDecimal(txtCusto.Text);
                    } catch { duracao = 0; custo = 0; }
                    t.Duracao = duracao;
                    t.Custo = custo;
                    if(chkConcluida.IsChecked == true)
                    {
                        t.Concluida = true;
                    }
                    else
                    {
                        t.Concluida = false;
                    }
                    th.Insert(t);
                    resetForm();
                } else
                {
                    tarefaEmEdicao.Designacao = txtNome.Text.Trim();
                    tarefaEmEdicao.Descricao = txtNotas.Text.Trim();
                    int duracao = 0;
                    int.TryParse(txtDuracao.Text, out duracao);
                    tarefaEmEdicao.Duracao = duracao;
                    decimal custo = 0;
                    decimal.TryParse(txtCusto.Text, out custo);
                    tarefaEmEdicao.Custo = custo;
                    tarefaEmEdicao.Concluida = (bool)chkConcluida.IsChecked;
                    th.Atualizar(tarefaEmEdicao);
                    vidroPlacard.Items.Refresh();
                }
                resetForm();
            }
        }
        

        private void btnCancelar_Click(object sender, RoutedEventArgs e)
        {
            
        }

        private void btnApagar_Click(object sender, RoutedEventArgs e)
        {
            TarefaHelper th = new TarefaHelper();


            th.Apagar(tarefaEmEdicao);
            vidroPlacard.Items.Refresh();
            resetForm();
        }

        private void resetForm()
        {
            tarefaEmEdicao = null;
            // limpar form
            txtNome.Text = "";
            txtNotas.Text = "";
            txtDuracao.Text = "";
            txtCusto.Text = "";
            chkConcluida.IsChecked = false;

            // gestao dos botoes
            btnGravar.Content = "Criar";
            btnCancelar.IsEnabled = false;
            btnApagar.Visibility = Visibility.Hidden;

            // Atualizar Indicadores
            int minutosTotais = 0;
            int minutosPendentes = 0;
            foreach (Tarefa t in App.lstTarefas)
            {
                minutosTotais += t.Duracao;
                if (t.Concluida == false)
                {
                    minutosPendentes += t.Duracao;

                }
            }
           
            lblTotalizador.Content = $"Total de tarefas: {App.lstTarefas.Count} | Total de minutos: {minutosTotais} | Total de minutos pendentes: {minutosPendentes} | Total Custo: {App.lstTarefas.Sum(t => t.Custo):C}";
        }
    }
    }
