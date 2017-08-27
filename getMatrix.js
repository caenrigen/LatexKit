/*
  Esta função vai receber a range e um vetor das configurações específicas duma tabela a criar
  
  Primeiro tem que se verificar se há err, esta verificação dependerá depois das configurações especificas se for uma tabela em waiting list mas relevante agora
  Crias uma matriz auxliar temporária (há já uma função criada que auxilia na criação de matriz vazia)
  Percorres uma vez a range toda à procura de 'err guardas num vetor as posiçoes das células de 'err' e também o index das colunas que são 'err'
  Ao mesmo tempo, classificas todas o conteúdo de todas as células a partir do getValues() (não com o getDisplayValues()), i.e. guardas na matrix auxiliar tipo 'str'/'num'/'empty'
  Após esta parte cada entrada da matrix auxiliar fica e.g. {cellType:'str',spanC:0, spanR:0} [Talvez seja bom guardar logo o alinhamento do texto para implementação futura]
  Em seguida com base nos range.getMergedRanges() preenche-se os spanC e spanR de cada célula, se para uma dada célula o spanR existir então copias o spanC desta para as debaixo
  Com base nas colunas que são de 'err' ajustas os spanC das células que precisem disso
  Cria-se uma nova matriz, agora adicionas um tipo de células 'err', que será tipo {cellType:'err',spanC:0,spanR:0,strValue:'123',strError'10'}
  Cria-se uma matriz que contém só '&' ou '' consoante os spans que existem
  
  Tendo estas informações reunidas depois será só aplicar várias funções consecutivas
  Para adicionar multicol/multirow, formatar num+error, proteger as células que não são numero, criar o vetor dos hlines, criar o vetor do bigstrut
  
  As tarefas ali em cima poderão eventualmente ser desempenhadas por subfunções, mas esta função tem que ser a primeira que entra em contacto com a range da tabela
*/
  
//function getMatrix(range, tabSettings) 
//{
//  
//  // Create array of colFeat obj. 
//  // and configure column features: 
//  // is_pmError
//  var colFeats=create_colFeat(range);
//  
//    //Create a 2D array of Cell obj.
//  //each Cell obj. contains:
//  // number   value:    value stored in obj.
//  // boolean  rowSpan:  if it's multiRow spanned
//  // boolean  colSpan:  if it's multiCol spanned
//  var matrix=create_matrix(range);
//  
//  
//
//  err_handler({matrix: matrix, colFeats: colFeats});
//  
//  set_forPrint({matrix: matrix, colFeats: colFeats},def_err_printer);
//  
//  add_columnSeparator({matrix: matrix, colFeats: colFeats});
//  
//  var str = create_string({matrix: matrix, colFeats: colFeats});
//  
//  alertExportToFile(str);
//  
//  return matrix;
//  
//    
//}









