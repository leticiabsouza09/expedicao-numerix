(function(){

/* ============ CONTEÚDO POR SÉRIE (BNCC, visão geral) ============ */
/* Cada pergunta tem "level": 1 = fácil, 2 = médio, 3 = difícil */
const GRADES = {
  6: {
    label:'6º ano', desc:'Números, frações iniciais e geometria básica',
    islands:[
      { id:'g6-numeros', emoji:'🔢', name:'Números Naturais', caption:'Operações, múltiplos e divisores',
        pool:[
          {q:'5 + 3 = ?', opts:['7','8','9','6'], a:1, level:1},
          {q:'9 − 4 = ?', opts:['4','5','6','13'], a:1, level:1},
          {q:'6 × 7 = ?', opts:['36','42','48','40'], a:1, level:1},
          {q:'45 ÷ 9 = ?', opts:['4','5','6','9'], a:1, level:1},
          {q:'Qual número é múltiplo de 5?', opts:['22','35','41','53'], a:1, level:1},
          {q:'7 + 8 × 2 = ?', opts:['23','30','15','16'], a:0, level:2},
          {q:'Qual número é divisor de 12?', opts:['5','7','4','9'], a:2, level:2},
          {q:'O resto da divisão de 17 por 5 é:', opts:['1','2','3','4'], a:1, level:2},
          {q:'Quantos divisores tem o número 10?', opts:['2','3','4','5'], a:2, level:2},
          {q:'Qual destes números é primo?', opts:['9','15','17','21'], a:2, level:3},
          {q:'Qual é o menor múltiplo comum de 4 e 6?', opts:['8','10','12','24'], a:2, level:3},
          {q:'(12 + 8) ÷ (10 − 6) = ?', opts:['4','5','10','20'], a:1, level:3},
        ]},
      { id:'g6-fracoes', emoji:'🍰', name:'Frações Iniciais', caption:'Representação e comparação',
        pool:[
          {q:'Qual fração representa "3 partes de um total de 4"?', opts:['4/3','3/4','1/3','3/1'], a:1, level:1},
          {q:'1/2 é igual a:', opts:['0,2','0,5','0,12','5'], a:1, level:1},
          {q:'Em uma pizza de 8 pedaços, comer 2 pedaços é comer:', opts:['1/8','1/4','2/4','1/2'], a:1, level:1},
          {q:'Qual fração representa a metade de 10?', opts:['10/2 = 5','1/10','2/10','10/1'], a:0, level:1},
          {q:'Qual fração é maior: 1/2 ou 1/4?', opts:['1/2','1/4','são iguais','depende'], a:0, level:2},
          {q:'3/6 simplificada é:', opts:['1/3','1/2','2/3','3/2'], a:1, level:2},
          {q:'Qual é maior: 2/3 ou 1/3?', opts:['2/3','1/3','iguais','não dá pra saber'], a:0, level:2},
          {q:'1/4 + 1/4 = ?', opts:['1/2','2/8','1/8','2/4 e 1/2 estão certas'], a:3, level:3},
          {q:'2/5 + 1/5 = ?', opts:['3/5','3/10','2/10','1/5'], a:0, level:2},
          {q:'Qual fração equivale a 0,25?', opts:['1/2','1/4','2/4','1/5'], a:1, level:3},
        ]},
      { id:'g6-geometria', emoji:'📐', name:'Geometria Básica', caption:'Perímetro, área e ângulos',
        pool:[
          {q:'Quantos lados tem um triângulo?', opts:['2','3','4','5'], a:1, level:1},
          {q:'Quantos lados tem um pentágono?', opts:['4','5','6','7'], a:1, level:1},
          {q:'Uma figura com 4 lados iguais e 4 ângulos retos é um:', opts:['triângulo','quadrado','círculo','hexágono'], a:1, level:1},
          {q:'Perímetro de um quadrado de lado 5 cm:', opts:['10 cm','20 cm','25 cm','15 cm'], a:1, level:2},
          {q:'Área de um quadrado de lado 4 cm:', opts:['8 cm²','16 cm²','12 cm²','4 cm²'], a:1, level:2},
          {q:'Um ângulo menor que 90° é chamado de:', opts:['reto','obtuso','agudo','raso'], a:2, level:2},
          {q:'O ângulo de uma volta completa mede:', opts:['90°','180°','270°','360°'], a:3, level:2},
          {q:'Perímetro de um retângulo 6×3:', opts:['9','18','24','27'], a:1, level:3},
          {q:'Área de um retângulo de lados 7 cm e 3 cm:', opts:['10 cm²','21 cm²','20 cm²','14 cm²'], a:1, level:3},
        ]},
      { id:'g6-estatistica', emoji:'📊', name:'Estatística Simples', caption:'Leitura de gráficos e média',
        pool:[
          {q:'Em um gráfico de barras, a barra mais alta representa:', opts:['o menor valor','o maior valor','a média','o total'], a:1, level:1},
          {q:'Qual gráfico é mais usado para mostrar partes de um total?', opts:['linha','barras','pizza (setores)','dispersão'], a:2, level:1},
          {q:'Se todos os valores de uma lista são iguais a 7, a média é:', opts:['0','1','7','14'], a:2, level:1},
          {q:'A média de 10 e 20 é:', opts:['10','15','20','30'], a:1, level:2},
          {q:'A média de 4, 6 e 8 é:', opts:['5','6','7','8'], a:2, level:2},
          {q:'Se em 5 provas as notas foram 6,7,8,9,10, a soma é:', opts:['38','40','42','44'], a:1, level:3},
        ]},
      { id:'g6-medidas', emoji:'⏱️', name:'Medidas', caption:'Comprimento, massa e tempo',
        pool:[
          {q:'1 metro tem quantos centímetros?', opts:['10','100','1000','1'], a:1, level:1},
          {q:'1 hora tem quantos minutos?', opts:['30','45','60','100'], a:2, level:1},
          {q:'1 quilograma tem quantos gramas?', opts:['10','100','1000','10000'], a:2, level:1},
          {q:'Quantos minutos há em 2 horas?', opts:['90','100','120','140'], a:2, level:2},
          {q:'2,5 m em centímetros é:', opts:['25 cm','205 cm','250 cm','2500 cm'], a:2, level:2},
          {q:'Se um evento começa às 14h e dura 3h30, termina às:', opts:['16h30','17h00','17h30','18h00'], a:2, level:3},
          {q:'500 g + 1,5 kg = quantos kg?', opts:['1,5 kg','2 kg','2,5 kg','3 kg'], a:1, level:3},
        ]},
      { id:'g6-final', emoji:'🗝️', name:'Tesouro do 6º ano', caption:'Desafio misto da série',
        pool:[
          {q:'8 × 9 = ?', opts:['62','72','81','64'], a:1, level:1},
          {q:'Qual fração é equivalente a 1/2?', opts:['2/3','2/4','3/4','1/3'], a:1, level:1},
          {q:'Quantos lados tem um hexágono?', opts:['5','6','7','8'], a:1, level:1},
          {q:'Perímetro de um triângulo equilátero de lado 4:', opts:['8','12','16','4'], a:1, level:2},
          {q:'A média de 2, 4 e 6 é:', opts:['3','4','6','12'], a:1, level:2},
          {q:'3/4 é maior, menor ou igual a 1/2?', opts:['maior','menor','igual','impossível saber'], a:0, level:2},
          {q:'Qual número é primo: 21 ou 23?', opts:['21','23','ambos','nenhum'], a:1, level:3},
          {q:'1,2 km em metros é:', opts:['12 m','120 m','1200 m','12000 m'], a:2, level:3},
        ]},
    ]
  },
  7: {
    label:'7º ano', desc:'Inteiros, frações, proporção e álgebra inicial',
    islands:[
      { id:'g7-inteiros', emoji:'➕', name:'Números Inteiros', caption:'Operações com positivos e negativos',
        pool:[
          {q:'(-8) + 15 = ?', opts:['7','-7','23','-23'], a:0, level:1},
          {q:'Qual número é o oposto de -15?', opts:['-15','0','15','1/15'], a:2, level:1},
          {q:'12 − (−5) = ?', opts:['7','17','-17','-7'], a:1, level:1},
          {q:'(-9) + (-4) = ?', opts:['13','-13','5','-5'], a:1, level:1},
          {q:'(-6) × (-3) = ?', opts:['-18','18','9','-9'], a:1, level:2},
          {q:'(-20) ÷ 4 = ?', opts:['-5','5','-16','16'], a:0, level:2},
          {q:'(2 + 3) × (5 − 2) = ?', opts:['13','15','17','25'], a:1, level:2},
          {q:'(-3)³ = ?', opts:['9','-9','27','-27'], a:3, level:3},
          {q:'(-15) ÷ (−3) + (−2) = ?', opts:['3','7','-7','5'], a:0, level:3},
        ]},
      { id:'g7-fracoes', emoji:'🍰', name:'Frações e Decimais', caption:'Operações e conversões',
        pool:[
          {q:'0,75 em fração é:', opts:['3/4','7/5','75/10','3/5'], a:0, level:1},
          {q:'Qual fração é equivalente a 2/6?', opts:['1/4','1/3','2/3','3/6'], a:1, level:1},
          {q:'4/5 − 1/5 = ?', opts:['3/5','5/5','3/10','1'], a:0, level:1},
          {q:'1/2 + 1/4 = ?', opts:['2/6','3/4','1/6','2/4'], a:1, level:2},
          {q:'1 − 2/5 = ?', opts:['3/5','2/5','1/5','4/5'], a:0, level:2},
          {q:'0,2 + 0,35 = ?', opts:['0,55','0,37','0,45','0,4'], a:0, level:2},
          {q:'2/3 × 3/5 = ?', opts:['6/15','5/8','2/5','6/8'], a:0, level:3},
          {q:'5/8 ÷ 1/4 = ?', opts:['5/2','5/32','20/8','2/5'], a:0, level:3},
        ]},
      { id:'g7-proporcao', emoji:'⚖️', name:'Proporção e %', caption:'Razão, proporção e porcentagem',
        pool:[
          {q:'20% de 50 é:', opts:['10','15','5','20'], a:0, level:1},
          {q:'10% de 90 é:', opts:['9','10','19','90'], a:0, level:1},
          {q:'75% equivale à fração:', opts:['3/4','7/5','3/5','1/4'], a:0, level:1},
          {q:'50% de 200 é:', opts:['50','100','150','25'], a:1, level:2},
          {q:'2 em 8 corresponde a quantos %?', opts:['20%','25%','40%','16%'], a:1, level:2},
          {q:'Qual razão é equivalente a 3:4?', opts:['6:8','3:5','4:3','9:16'], a:0, level:2},
          {q:'Se 30 é 50% de um número, esse número é:', opts:['15','60','45','90'], a:1, level:3},
        ]},
      { id:'g7-algebra', emoji:'🧩', name:'Álgebra Inicial', caption:'Expressões e equações simples',
        pool:[
          {q:'Se x + 7 = 12, então x = ?', opts:['5','19','-5','7'], a:0, level:1},
          {q:'Simplifique: 2x + 3x', opts:['5x','6x','x','2x³'], a:0, level:1},
          {q:'Se 3x = 21, então x = ?', opts:['18','24','7','3'], a:2, level:2},
          {q:'Se y − 5 = -2, y = ?', opts:['3','-7','7','-3'], a:0, level:2},
          {q:'Qual expressão representa "o dobro de um número mais 3"?', opts:['n+3','2n+3','3n+2','n²+3'], a:1, level:2},
          {q:'Se 2x − 4 = 10, x = ?', opts:['3','7','6','10'], a:1, level:3},
        ]},
      { id:'g7-angulos', emoji:'📏', name:'Ângulos e Polígonos', caption:'Tipos de ângulos e propriedades',
        pool:[
          {q:'Um ângulo de 90° é chamado de:', opts:['reto','agudo','obtuso','raso'], a:0, level:1},
          {q:'Um ângulo de 180° é chamado de:', opts:['reto','agudo','obtuso','raso'], a:3, level:1},
          {q:'Dois ângulos que somam 90° são chamados de:', opts:['complementares','suplementares','opostos','retos'], a:0, level:2},
          {q:'Dois ângulos que somam 180° são chamados de:', opts:['complementares','suplementares','agudos','retos'], a:1, level:2},
          {q:'Soma dos ângulos internos de um triângulo:', opts:['90°','180°','270°','360°'], a:1, level:2},
          {q:'Se um ângulo mede 35°, seu complementar mede:', opts:['45°','55°','65°','145°'], a:1, level:3},
          {q:'Soma dos ângulos internos de um quadrilátero:', opts:['180°','270°','360°','450°'], a:2, level:3},
        ]},
      { id:'g7-final', emoji:'🗝️', name:'Tesouro do 7º ano', caption:'Desafio misto da série',
        pool:[
          {q:'3/5 de 25 é:', opts:['10','15','20','5'], a:1, level:1},
          {q:'25% de 120 é:', opts:['25','30','35','40'], a:1, level:1},
          {q:'(-4) × 5 + 10 = ?', opts:['-10','30','-30','10'], a:0, level:2},
          {q:'1/3 + 1/6 = ?', opts:['1/2','2/9','1/9','2/3'], a:0, level:2},
          {q:'Se 5x = 35, x = ?', opts:['5','6','7','8'], a:2, level:2},
          {q:'Se y + 9 = 4, y = ?', opts:['5','-5','13','-13'], a:1, level:3},
        ]},
    ]
  },
  8: {
    label:'8º ano', desc:'Álgebra, Pitágoras, porcentagem e juros',
    islands:[
      { id:'g8-algebra', emoji:'🧩', name:'Álgebra', caption:'Equações e produtos notáveis',
        pool:[
          {q:'Qual é o termo independente em 5x + 9?', opts:['5','x','9','5x'], a:2, level:1},
          {q:'Qual é o coeficiente de x em 7x − 2?', opts:['-2','7','x','5'], a:1, level:1},
          {q:'4(x − 1) = 0 → x = ?', opts:['0','1','4','-1'], a:1, level:1},
          {q:'Se 2(x + 1) = 8, x = ?', opts:['3','4','2','5'], a:0, level:2},
          {q:'(x + 2)(x) quando x=3 vale:', opts:['15','9','5','11'], a:0, level:2},
          {q:'Se x² = 49, x pode ser:', opts:['6','7','8','9'], a:1, level:2},
          {q:'(x+1)² é igual a:', opts:['x²+1','x²+2x+1','x²+x+1','2x+1'], a:1, level:3},
          {q:'(x−3)(x+3) é igual a:', opts:['x²−9','x²+9','x²−6x+9','x²+6x−9'], a:0, level:3},
        ]},
      { id:'g8-geometria', emoji:'📐', name:'Geometria e Pitágoras', caption:'Teorema de Pitágoras e polígonos',
        pool:[
          {q:'Soma dos ângulos internos de um triângulo:', opts:['90°','180°','270°','360°'], a:1, level:1},
          {q:'Quantos lados tem um hexágono?', opts:['5','6','7','8'], a:1, level:1},
          {q:'Um triângulo com os três lados iguais é:', opts:['isósceles','escaleno','equilátero','retângulo'], a:2, level:1},
          {q:'Em um triângulo retângulo com catetos 3 e 4, a hipotenusa é:', opts:['5','6','7','12'], a:0, level:2},
          {q:'Área de um triângulo de base 8 e altura 5:', opts:['40','20','13','24'], a:1, level:2},
          {q:'Se a hipotenusa é 10 e um cateto é 6, o outro cateto é:', opts:['6','7','8','9'], a:2, level:3},
          {q:'Em um triângulo retângulo de catetos 9 e 12, a hipotenusa é:', opts:['13','14','15','16'], a:2, level:3},
        ]},
      { id:'g8-porcentagem', emoji:'💰', name:'Porcentagem e Juros', caption:'Descontos, aumentos e juros simples',
        pool:[
          {q:'150% de 40 é:', opts:['50','60','45','55'], a:1, level:1},
          {q:'Qual fração representa 40%?', opts:['2/5','4/100','4/10','ambas a e c'], a:3, level:1},
          {q:'Aumento de 10% sobre R$100 resulta em:', opts:['R$100','R$110','R$90','R$120'], a:1, level:1},
          {q:'Se algo custa R$80 com 25% de desconto, o desconto é:', opts:['R$15','R$20','R$25','R$10'], a:1, level:2},
          {q:'Se uma prova tem 20 questões e o aluno acertou 90%, quantas acertou?', opts:['16','18','19','20'], a:1, level:2},
          {q:'Juro simples de R$200 a 5% ao mês, em 1 mês:', opts:['R$5','R$10','R$20','R$50'], a:1, level:3},
          {q:'Juro simples de R$500 a 4% ao mês, em 3 meses:', opts:['R$20','R$40','R$60','R$80'], a:2, level:3},
        ]},
      { id:'g8-numeros', emoji:'🔢', name:'Potências e Raízes', caption:'Potenciação e radiciação',
        pool:[
          {q:'Qual o valor de 7²?', opts:['14','21','49','77'], a:2, level:1},
          {q:'Raiz quadrada de 81 é:', opts:['8','9','18','41'], a:1, level:1},
          {q:'Raiz quadrada de 144 é:', opts:['11','12','13','14'], a:1, level:1},
          {q:'(-2)² = ?', opts:['-4','4','-2','2'], a:1, level:2},
          {q:'2³ × 2² = ?', opts:['2⁵','2⁶','4⁵','16'], a:0, level:2},
          {q:'Raiz quadrada de 100:', opts:['9','10','11','20'], a:1, level:2},
          {q:'√50 está entre quais números inteiros?', opts:['5 e 6','6 e 7','7 e 8','4 e 5'], a:0, level:3},
        ]},
      { id:'g8-estatistica', emoji:'📊', name:'Estatística e Probabilidade', caption:'Frequências e chances',
        pool:[
          {q:'Em um dado de 6 faces, a chance de sair um número par é:', opts:['1/6','1/3','1/2','2/3'], a:2, level:1},
          {q:'A moda de 3,3,5,7,7,7 é:', opts:['3','5','7','não tem'], a:2, level:1},
          {q:'A mediana de 2,4,6,8,10 é:', opts:['4','6','8','10'], a:1, level:2},
          {q:'Em uma pesquisa com 50 pessoas, 20 preferem matemática. Qual a frequência relativa?', opts:['20%','40%','60%','80%'], a:1, level:2},
          {q:'A probabilidade de tirar um número maior que 4 em um dado de 6 faces é:', opts:['1/6','1/3','1/2','2/3'], a:1, level:3},
        ]},
      { id:'g8-final', emoji:'🗝️', name:'Tesouro do 8º ano', caption:'Desafio misto da série',
        pool:[
          {q:'25% de 200 é:', opts:['25','50','75','100'], a:1, level:1},
          {q:'Área de um quadrado de lado 9:', opts:['18','81','36','72'], a:1, level:1},
          {q:'Se 3x − 1 = 11, x = ?', opts:['3','4','5','6'], a:1, level:2},
          {q:'Hipotenusa de um triângulo com catetos 6 e 8:', opts:['9','10','12','14'], a:1, level:2},
          {q:'A moda de 1,2,2,2,3,4 é:', opts:['1','2','3','4'], a:1, level:3},
        ]},
    ]
  },
  9: {
    label:'9º ano', desc:'Potências, funções, geometria avançada e estatística',
    islands:[
      { id:'g9-potencias', emoji:'🔢', name:'Potências e Radiciação', caption:'Propriedades avançadas',
        pool:[
          {q:'5⁰ = ?', opts:['0','1','5','50'], a:1, level:1},
          {q:'Raiz cúbica de 27:', opts:['2','3','9','27'], a:1, level:1},
          {q:'2⁴ = ?', opts:['8','16','32','64'], a:1, level:1},
          {q:'2⁻¹ = ?', opts:['-2','1/2','2','0'], a:1, level:2},
          {q:'(2³)² = ?', opts:['2⁵','2⁶','64','64 e 2⁶'], a:3, level:2},
          {q:'(-3)⁴ = ?', opts:['-81','81','-12','12'], a:1, level:2},
          {q:'√50 está entre:', opts:['5 e 6','6 e 7','7 e 8','8 e 9'], a:1, level:3},
        ]},
      { id:'g9-funcoes', emoji:'📈', name:'Funções', caption:'Plano cartesiano e funções lineares',
        pool:[
          {q:'No plano cartesiano, o ponto (3,0) está sobre o eixo:', opts:['x','y','origem','nenhum'], a:0, level:1},
          {q:'O ponto (0,0) é chamado de:', opts:['eixo','origem','quadrante','vértice'], a:1, level:1},
          {q:'Quantos quadrantes tem o plano cartesiano?', opts:['2','3','4','6'], a:2, level:1},
          {q:'Na função y = 2x + 1, se x = 3, y = ?', opts:['5','6','7','8'], a:2, level:2},
          {q:'Na função y = x − 4, se y = 0, x = ?', opts:['0','4','-4','1'], a:1, level:2},
          {q:'Na função y = 3x, se x = 4, y = ?', opts:['7','12','34','43'], a:1, level:3},
        ]},
      { id:'g9-geometria', emoji:'📐', name:'Geometria Avançada', caption:'Áreas compostas, círculos e Pitágoras',
        pool:[
          {q:'Diâmetro é igual a:', opts:['1× o raio','2× o raio','3× o raio','metade do raio'], a:1, level:1},
          {q:'Soma dos ângulos internos de um quadrilátero:', opts:['180°','270°','360°','450°'], a:2, level:1},
          {q:'Em um triângulo retângulo com catetos 5 e 12, a hipotenusa é:', opts:['13','14','15','17'], a:0, level:2},
          {q:'Área de um círculo de raio 2 (use π≈3,14):', opts:['6,28','12,56','9,42','3,14'], a:1, level:2},
          {q:'Área de um trapézio com bases 4 e 6 e altura 3:', opts:['12','15','18','30'], a:1, level:3},
        ]},
      { id:'g9-estatistica', emoji:'📊', name:'Estatística e Probabilidade', caption:'Médias, moda e chances',
        pool:[
          {q:'A probabilidade de tirar "cara" em uma moeda honesta é:', opts:['25%','50%','75%','100%'], a:1, level:1},
          {q:'A moda de 2,2,3,4,5 é:', opts:['2','3','4','5'], a:0, level:1},
          {q:'A média de 10, 20 e 30 é:', opts:['15','20','25','30'], a:1, level:1},
          {q:'A mediana de 1,3,5,7,9 é:', opts:['3','5','7','9'], a:1, level:2},
          {q:'Em um dado de 6 faces, a chance de sair "5" é:', opts:['1/2','1/3','1/6','1/5'], a:2, level:2},
        ]},
      { id:'g9-trigonometria', emoji:'📐', name:'Trigonometria Básica', caption:'Seno, cosseno e tangente',
        pool:[
          {q:'No triângulo retângulo, o lado oposto ao ângulo reto é a:', opts:['altura','base','hipotenusa','mediana'], a:2, level:1},
          {q:'O seno de um ângulo é a razão entre:', opts:['cateto oposto e hipotenusa','cateto adjacente e hipotenusa','os dois catetos','hipotenusa e cateto oposto'], a:0, level:1},
          {q:'O cosseno de 0° vale:', opts:['0','0,5','1','-1'], a:2, level:2},
          {q:'O seno de 90° vale:', opts:['0','0,5','1','-1'], a:2, level:2},
          {q:'Em um triângulo retângulo com hipotenusa 10 e cateto oposto 5, o seno do ângulo é:', opts:['0,25','0,5','1','2'], a:1, level:3},
        ]},
      { id:'g9-final', emoji:'🗝️', name:'Tesouro do 9º ano', caption:'Desafio misto da série',
        pool:[
          {q:'√64 = ?', opts:['6','7','8','9'], a:2, level:1},
          {q:'A moda de 1,1,2,3,3,3 é:', opts:['1','2','3','não tem'], a:2, level:2},
          {q:'Hipotenusa de catetos 9 e 12:', opts:['13','14','15','16'], a:2, level:2},
          {q:'O cosseno de 90° vale:', opts:['0','0,5','1','-1'], a:0, level:3},
        ]},
    ]
  },
};

const QUESTIONS_PER_ROUND = 6;
const LEVEL_LABEL = {1:'Fácil', 2:'Médio', 3:'Difícil'};
const STATE = {
  grade:null,
  unlocked:0,
  hearts:3,
  gems:0,
  islandStars:{},
  current:null,
  quizQuestions:[],
  qIndex:0,
  correctCount:0,
  answered:false,
  playerName:'',
  playerTurma:'',
};

const $ = id => document.getElementById(id);

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function buildShuffledOptions(item){
  const order = shuffle(item.opts.map((text,i)=>({text, isCorrect:i===item.a})));
  return order;
}

function currentIslands(){
  return GRADES[STATE.grade].islands;
}

/* ============ JOGADOR (nome / turma) ============ */
function loadPlayer(){
  STATE.playerName = localStorage.getItem('numerix_name') || '';
  STATE.playerTurma = localStorage.getItem('numerix_turma') || '';
}

function savePlayer(name, turma){
  STATE.playerName = name;
  STATE.playerTurma = turma;
  localStorage.setItem('numerix_name', name);
  localStorage.setItem('numerix_turma', turma);
  updatePlayerPill();
}

function updatePlayerPill(){
  const pill = $('playerPill');
  if(STATE.playerName){
    pill.textContent = '👤 ' + STATE.playerName + (STATE.playerTurma ? ' · '+STATE.playerTurma : '');
    pill.classList.remove('hidden');
  } else {
    pill.classList.add('hidden');
  }
}

function ensurePlayerThenSelectGrade(gradeKey){
  loadPlayer();
  if(STATE.playerName){
    selectGrade(gradeKey);
    return;
  }
  $('playerModal').classList.remove('hidden');
  $('playerNameInput').value = '';
  $('playerTurmaInput').value = '';
  $('playerModalConfirm').onclick = ()=>{
    const name = $('playerNameInput').value.trim();
    const turma = $('playerTurmaInput').value.trim();
    if(!name){ $('playerNameInput').focus(); return; }
    savePlayer(name, turma);
    $('playerModal').classList.add('hidden');
    selectGrade(gradeKey);
  };
}

$('playerPill').addEventListener('click', ()=>{
  $('playerModal').classList.remove('hidden');
  $('playerNameInput').value = STATE.playerName;
  $('playerTurmaInput').value = STATE.playerTurma;
  $('playerModalConfirm').onclick = ()=>{
    const name = $('playerNameInput').value.trim();
    const turma = $('playerTurmaInput').value.trim();
    if(!name){ $('playerNameInput').focus(); return; }
    savePlayer(name, turma);
    $('playerModal').classList.add('hidden');
  };
});

/* ============ SELEÇÃO DE SÉRIE ============ */
function renderGradeSelect(){
  const grid = $('gradeGrid');
  grid.innerHTML='';
  Object.keys(GRADES).forEach(gradeKey=>{
    const g = GRADES[gradeKey];
    const card = document.createElement('div');
    card.className='grade-card';
    card.innerHTML = `<div class="num">${gradeKey}º</div><div class="lbl">${g.label}</div><div class="desc">${g.desc}</div>`;
    card.addEventListener('click', ()=>ensurePlayerThenSelectGrade(gradeKey));
    grid.appendChild(card);
  });
}

function selectGrade(gradeKey){
  STATE.grade = gradeKey;
  STATE.unlocked = 0;
  STATE.gems = 0;
  STATE.islandStars = {};
  $('gemCount').textContent = 0;
  $('gradePill').textContent = GRADES[gradeKey].label;
  $('gradePill').classList.remove('hidden');
  $('rankingBtn').classList.remove('hidden');
  updatePlayerPill();
  $('gradeView').classList.add('hidden');
  $('mapView').classList.remove('hidden');
  renderMap();
}

$('brandLogo').addEventListener('click', ()=>{
  $('mapView').classList.add('hidden');
  $('quizView').classList.add('hidden');
  $('resultView').classList.add('hidden');
  $('rankingView').classList.add('hidden');
  $('gradeView').classList.remove('hidden');
  $('gradePill').classList.add('hidden');
  $('rankingBtn').classList.add('hidden');
});
$('gradePill').addEventListener('click', ()=>{
  $('mapView').classList.add('hidden');
  $('rankingView').classList.add('hidden');
  $('gradeView').classList.remove('hidden');
  $('gradePill').classList.add('hidden');
  $('rankingBtn').classList.add('hidden');
});

/* ============ RENDER MAPA ============ */
function renderMap(){
  const wrap = $('islandsList');
  wrap.innerHTML='';
  currentIslands().forEach((isl, idx)=>{
    const locked = idx > STATE.unlocked;
    const done = STATE.islandStars[isl.id] !== undefined;
    const row = document.createElement('div');
    row.className = 'island-row' + (idx % 2 === 1 ? ' reverse' : '');

    const btn = document.createElement('button');
    btn.className = 'island-btn' + (locked ? ' locked' : '') + (done ? ' done' : '');
    btn.innerHTML = `<span class="emoji">${isl.emoji}</span><span class="lbl">${isl.name}</span>`;
    if(done){
      const s = STATE.islandStars[isl.id];
      const mini = document.createElement('span');
      mini.className='stars-mini';
      mini.textContent = '⭐'.repeat(s) + '☆'.repeat(3-s);
      btn.appendChild(mini);
    }
    if(!locked){
      btn.addEventListener('click', ()=>startIsland(idx));
    }

    const caption = document.createElement('div');
    caption.className='island-caption';
    caption.textContent = locked ? 'Bloqueado — complete a ilha anterior' : isl.caption;

    row.appendChild(btn);
    row.appendChild(caption);
    wrap.appendChild(row);
  });
}

/* ============ QUIZ ============ */
function buildProgressiveQuiz(pool, n){
  // Agrupa por nível e intercala do fácil pro difícil, embaralhando dentro de cada nível
  const byLevel = {1:[], 2:[], 3:[]};
  pool.forEach(item=>{
    const lvl = item.level || 2;
    (byLevel[lvl] || byLevel[2]).push(item);
  });
  const ordered = [
    ...shuffle(byLevel[1]),
    ...shuffle(byLevel[2]),
    ...shuffle(byLevel[3]),
  ];
  return ordered.slice(0, Math.min(n, ordered.length));
}

function startIsland(idx){
  STATE.current = idx;
  const isl = currentIslands()[idx];
  const n = Math.min(QUESTIONS_PER_ROUND, isl.pool.length);
  const picked = buildProgressiveQuiz(isl.pool, n);
  STATE.quizQuestions = picked.map(item=>({
    text:item.q,
    level: item.level || 2,
    options: buildShuffledOptions(item)
  }));
  STATE.qIndex = 0;
  STATE.correctCount = 0;
  STATE.hearts = 3;
  updateHeartsUI();
  $('mapView').classList.add('hidden');
  $('resultView').classList.add('hidden');
  $('quizView').classList.remove('hidden');
  renderQuestion();
}

function renderQuestion(){
  STATE.answered = false;
  const q = STATE.quizQuestions[STATE.qIndex];
  $('levelTag').textContent = LEVEL_LABEL[q.level] || 'Médio';
  $('levelTag').className = 'level-tag l' + (q.level || 2);
  $('questionText').textContent = q.text;
  $('qCounter').textContent = `${STATE.qIndex+1}/${STATE.quizQuestions.length}`;
  $('progressFill').style.width = `${(STATE.qIndex/STATE.quizQuestions.length)*100}%`;
  $('feedback').textContent = '';
  $('feedback').className = 'feedback';
  $('nextBtn').classList.add('hidden');

  const optWrap = $('optionsList');
  optWrap.innerHTML='';
  q.options.forEach(opt=>{
    const b = document.createElement('button');
    b.className='opt-btn';
    b.textContent = opt.text;
    b.addEventListener('click', ()=>handleAnswer(b, opt.isCorrect));
    optWrap.appendChild(b);
  });
}

function handleAnswer(btn, isCorrect){
  if(STATE.answered) return;
  STATE.answered = true;
  const buttons = document.querySelectorAll('.opt-btn');
  buttons.forEach(b=>b.disabled=true);

  if(isCorrect){
    btn.classList.add('correct');
    STATE.correctCount++;
    STATE.gems += 5;
    $('gemCount').textContent = STATE.gems;
    $('feedback').textContent = '✅ Correto! Bom trabalho, explorador(a)!';
    $('feedback').className = 'feedback good';
  } else {
    btn.classList.add('wrong');
    buttons.forEach(b=>{ if(b.textContent === correctTextOf()) b.classList.add('correct'); });
    STATE.hearts--;
    updateHeartsUI(true);
    $('feedback').textContent = '❌ Não foi essa. Continue tentando!';
    $('feedback').className = 'feedback bad';
  }
  $('nextBtn').classList.remove('hidden');

  function correctTextOf(){
    const q = STATE.quizQuestions[STATE.qIndex];
    return q.options.find(o=>o.isCorrect).text;
  }
}

function updateHeartsUI(shake){
  const pill = $('heartsPill');
  pill.textContent = '❤️'.repeat(Math.max(STATE.hearts,0)) + '🖤'.repeat(3-Math.max(STATE.hearts,0));
  if(shake){
    pill.classList.remove('shake');
    requestAnimationFrame(()=>pill.classList.add('shake'));
  }
  if(STATE.hearts <= 0){
    setTimeout(()=>finishIsland(true), 600);
  }
}

$('nextBtn').addEventListener('click', ()=>{
  if(STATE.hearts <= 0) return;
  STATE.qIndex++;
  if(STATE.qIndex >= STATE.quizQuestions.length){
    finishIsland(false);
  } else {
    renderQuestion();
  }
});

$('backBtn').addEventListener('click', ()=>{
  $('quizView').classList.add('hidden');
  $('mapView').classList.remove('hidden');
});

/* ============ ENVIO DE PONTUAÇÃO PARA O BACK-END ============ */
function submitScore(islandId){
  fetch('/api/score', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      name: STATE.playerName,
      turma: STATE.playerTurma,
      grade: String(STATE.grade),
      island_id: islandId,
      gems: STATE.gems,
      correct: STATE.correctCount,
      total: STATE.quizQuestions.length,
    })
  }).catch(()=>{ /* offline ou servidor fora: ignora silenciosamente */ });
}

function finishIsland(failed){
  $('progressFill').style.width = '100%';
  const isl = currentIslands()[STATE.current];
  const total = STATE.quizQuestions.length;
  const ratio = STATE.correctCount / total;
  let stars = 1;
  if (ratio >= 0.9) stars = 3;
  else if (ratio >= 0.6) stars = 2;

  $('quizView').classList.add('hidden');
  $('resultView').classList.remove('hidden');

  if(failed){
    $('trophyEmoji').textContent = '💧';
    $('resultTitle').textContent = 'Sem corações... tente de novo!';
    $('resultStars').textContent = '☆☆☆';
    $('resultStats').textContent = `Você acertou ${STATE.correctCount} de ${total} perguntas em ${isl.name}.`;
  } else {
    const prevStars = STATE.islandStars[isl.id];
    if(prevStars === undefined || stars > prevStars){
      STATE.islandStars[isl.id] = stars;
    }
    if(STATE.unlocked === STATE.current && STATE.unlocked < currentIslands().length - 1){
      STATE.unlocked++;
    }
    STATE.gems += stars * 10;
    $('gemCount').textContent = STATE.gems;

    $('trophyEmoji').textContent = stars === 3 ? '🏆' : stars === 2 ? '🥈' : '🥉';
    $('resultTitle').textContent = `${isl.name} concluída!`;
    $('resultStars').textContent = '⭐'.repeat(stars) + '☆'.repeat(3-stars);
    $('resultStats').textContent = `Você acertou ${STATE.correctCount} de ${total} perguntas. +${stars*10} 💎 de bônus!`;
    if(stars === 3) launchConfetti();
  }

  // Registra a pontuação (sucesso ou falha) para o ranking, se houver nome.
  if(STATE.playerName){
    submitScore(isl.id);
  }
}

$('continueBtn').addEventListener('click', ()=>{
  $('resultView').classList.add('hidden');
  $('mapView').classList.remove('hidden');
  renderMap();
});

/* ============ RANKING ============ */
let rankingMode = 'individual'; // 'individual' | 'turma'

$('rankingBtn').addEventListener('click', openRanking);
$('rankingBackBtn').addEventListener('click', ()=>{
  $('rankingView').classList.add('hidden');
  $('mapView').classList.remove('hidden');
});
$('tabIndividual').addEventListener('click', ()=>{ rankingMode='individual'; updateRankingTabs(); loadRanking(); });
$('tabTurma').addEventListener('click', ()=>{ rankingMode='turma'; updateRankingTabs(); loadRanking(); });

function updateRankingTabs(){
  $('tabIndividual').classList.toggle('active', rankingMode==='individual');
  $('tabTurma').classList.toggle('active', rankingMode==='turma');
}

function openRanking(){
  $('mapView').classList.add('hidden');
  $('quizView').classList.add('hidden');
  $('resultView').classList.add('hidden');
  $('rankingView').classList.remove('hidden');
  $('rankingGradeLabel').textContent = GRADES[STATE.grade].label;
  rankingMode = 'individual';
  updateRankingTabs();
  loadRanking();
}

function loadRanking(){
  const list = $('rankingList');
  list.innerHTML = '<div class="ranking-empty">Carregando...</div>';
  const url = rankingMode === 'individual'
    ? `/api/ranking/${STATE.grade}`
    : `/api/ranking/${STATE.grade}/turmas`;

  fetch(url).then(r=>r.json()).then(data=>{
    if(!data.ok || !data.ranking || data.ranking.length === 0){
      list.innerHTML = '<div class="ranking-empty">Ainda não há pontuações registradas para esta série. Seja o primeiro!</div>';
      return;
    }
    list.innerHTML = '';
    data.ranking.forEach((row, i)=>{
      const div = document.createElement('div');
      const isMe = rankingMode==='individual' && row.name === STATE.playerName;
      div.className = 'ranking-row' + (isMe ? ' me' : '');
      if(rankingMode === 'individual'){
        div.innerHTML = `
          <div class="ranking-pos">${i+1}º</div>
          <div class="ranking-info">
            <div class="ranking-name">${escapeHtml(row.name)}</div>
            <div class="ranking-sub">${row.turma ? escapeHtml(row.turma) : 'sem turma'} · ${row.total_correct||0}/${row.total_questions||0} acertos</div>
          </div>
          <div class="ranking-gems">💎 ${row.best_gems}</div>`;
      } else {
        div.innerHTML = `
          <div class="ranking-pos">${i+1}º</div>
          <div class="ranking-info">
            <div class="ranking-name">${escapeHtml(row.turma)}</div>
            <div class="ranking-sub">${row.alunos} aluno(s)</div>
          </div>
          <div class="ranking-gems">💎 ${row.turma_total}</div>`;
      }
      list.appendChild(div);
    });
  }).catch(()=>{
    list.innerHTML = '<div class="ranking-empty">Não foi possível carregar o ranking agora.</div>';
  });
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

/* ============ CONFETTI ============ */
function launchConfetti(){
  const colors = ['#D9A22A','#E8634F','#5FAE6C','#7FE3D6','#F2E2B8'];
  for(let i=0;i<40;i++){
    const p = document.createElement('div');
    p.className='confetti-piece';
    p.style.left = Math.random()*100 + 'vw';
    p.style.background = colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDuration = (2 + Math.random()*1.5) + 's';
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    document.body.appendChild(p);
    setTimeout(()=>p.remove(), 4000);
  }
}

/* ============ INIT ============ */
loadPlayer();
updatePlayerPill();
updateHeartsUI();
renderGradeSelect();

})();