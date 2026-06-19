concerto.test.getNodes = function(testId){
  
  idField <- "flowTest_id"
  testId <- dbEscapeStrings(concerto$connection,toString(testId))
  result <- DBI::dbSendQuery(concerto$connection,sprintf("SELECT id, type, sourceTest_id FROM TestNode WHERE %s='%s'",idField,testId))
  response <- DBI::dbFetch(result,n=-1)

  DBI::dbClearResult(result)
  return(response)
}
