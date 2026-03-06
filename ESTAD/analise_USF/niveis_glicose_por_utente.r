dados <- scan("niveis_glicose_por_utente.csv", sep = ",", quiet = TRUE)
dados_ordenados <- sort(dados)

frequencia_absoluta <- table(dados_ordenados)
frequencia_relativa <- frequencia_absoluta / length(dados_ordenados)
frequencia_absoluta_acumulada <- cumsum(frequencia_absoluta)
frequencia_relativa_acumulada <- cumsum(frequencia_relativa)

tabela_frequencias <- data.frame(
  "Níveis de Glicose" = names(frequencia_absoluta),
  "fi" = as.vector(frequencia_absoluta),
  "fr" = round(as.vector(frequencia_relativa), 3),
  "Fi" = as.vector(frequencia_absoluta_acumulada),
  "Fr" = round(as.vector(frequencia_relativa_acumulada), 3)
)

library(knitr)
kable(tabela_frequencias, caption = "Tabela de Frequências dos Níveis de Glicose por Utente")

cat("Níveis de Glicose por Utente (Ordenados): ")
cat(dados_ordenados, "\n")

par(mfrow = c(1, 2))

boxplot(dados,
        main = "Distribuição dos Níveis de Glicose",
        ylab = "Níveis de Glicose (mg/dL)",
        col = "lightgreen",
        border = "darkgreen",
        notch = FALSE,
        outpch = 19,
        outcol = "red")

grid(nx = NA, ny = NULL)

hist(dados,
     main = "Histograma dos Níveis de Glicose",
     xlab = "Níveis de Glicose (mg/dL)",
     ylab = "Frequência",
     col = "lightblue",
     border = "white",
     breaks = 10)

par(mfrow = c(1, 1))

png("boxplot_glicose.png", width = 800, height = 600)
boxplot(dados,
        main = "Boxplot dos Níveis de Glicose por Utente",
        ylab = "Níveis de Glicose",
        col = "lightblue",
        horizontal = FALSE)
dev.off()
cat("\nBoxplot guardado como 'boxplot_glicose.png'\n")