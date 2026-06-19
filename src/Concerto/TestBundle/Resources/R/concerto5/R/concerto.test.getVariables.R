concerto.test.getVariables = function(testId){
  
  idField <- "test_id"
  testId <- dbEscapeStrings(concerto$connection,toString(testId))
  result <- DBI::dbSendQuery(concerto$connection,sprintf("SELECT id, name, value, type FROM TestVariable WHERE %s='%s'",idField,testId))
  response <- DBI::dbFetch(result,n=-1)

  DBI::dbClearResult(result)
  return(response)
}
