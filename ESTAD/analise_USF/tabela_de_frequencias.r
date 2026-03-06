dados <- scan("num_consultas_anuais_por_utentes.csv", sep = ",", quiet = TRUE)
dados_ordenados <- sort(dados)

# quantidade de vezes que aparece o numero de consultas
frequencia_absoluta <- table(dados_ordenados)

# frequencia absoluta dividido pelo numero total de dados
frequencia_relativa <- frequencia_absoluta / length(dados_ordenados)

# soma das frequencias absolutas ate um certo ponto
frequencia_absoluta_acumulada <- cumsum(frequencia_absoluta)

# soma das frequencias relativas ate um certo ponto
frequencia_relativa_acumulada <- cumsum(frequencia_relativa)

tabela_frequencias <- data.frame(
  "Consultas" = names(frequencia_absoluta),
  "fi" = as.vector(frequencia_absoluta),
  "fr" = round(as.vector(frequencia_relativa), 3),
  "Fi" = as.vector(frequencia_absoluta_acumulada),
  "Fr" = round(as.vector(frequencia_relativa_acumulada), 3)
)

library(knitr)
kable(tabela_frequencias, caption = "Tabela de Frequências")