using Demo2022189.Models;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Data;
using System.Windows;

namespace Demo2022189
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        // Base de dados temporaria
        public static ObservableCollection<Tarefa> lstTarefas = new ObservableCollection<Tarefa>();
    }


}
