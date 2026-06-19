concerto.test.getConnections = function(testId){
  
  idField <- "flowTest_id"
  testId <- dbEscapeStrings(concerto$connection,toString(testId))
  result <- DBI::dbSendQuery(concerto$connection,sprintf("
    SELECT id, sourceNode_id, sourcePort_id, destinationNode_id, destinationPort_id, returnFunction 
    FROM TestNodeConnection 
    WHERE %s='%s'",idField,testId))
  response <- DBI::dbFetch(result,n=-1)

  DBI::dbClearResult(result)
  return(response)
}
