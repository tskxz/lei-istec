[Níveis de glicose em jejum de 20 pacientes](../niveis_glicose_por_utente.csv)

> a) Calcula Q1, Q2, Q3.

Dados ordenados: 
85 90 92 95 98 100 102 105 108 110 112 115 118 120 122 125 130 135 140 200  

### $Q2$
$\tilde{x}$ = (110+112)/2   
$\tilde{x}$ = 111  
$Q2$=111 mg/dL

### $Q1$
(20+1) · 0.25 = 5,25  
Entre 5º e 6º valor  
5º = 98, 6º = 100  
100-98 = 2  
$Q1$=98+0,25 · 2 = 98,5 mg/dL

### $Q3$
(20+1) · 0.75 = 15,75  
Entre 15º e 16º valor  
15º = 122, 16º = 125  
125-122 = 3  
$Q3$ = 122+0.75 · 3 = 124,25 mg/dL

> b) Calcula AIQ.

$AIQ$=$Q3$-$Q1$  
$AIQ$=124,25 - 98,5 mg/dL  
$AIQ$=25,75 mg/dL  

> c) Identifica outliers.  

LI=98.5-1,5 · 25,75 = 59,875 mg/dL  
LS=124,25+1.5 · 25,75 = 162,875  

Valores a verificar:  
- Mínimo = 85 > 59,875 (ok)
- Máximo = 200 > 162,875 → 200 é outlier!

d) Constrói um boxplot (identifica os 5 números: min, Q1, Q2, Q3, max).  
Boxplot (5 números):
- Mínimo = 85
- Q1 = 98,5
- Q2 = 111
- Q3 = 124,25
- Máximo (sem contar outlier) = 140 (pois 200 é outlier)

![bloxpot](imgs/boxplot_glicose.png)