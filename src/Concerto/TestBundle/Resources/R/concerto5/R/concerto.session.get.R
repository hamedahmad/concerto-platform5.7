concerto.session.get = function(sessionHash){
  sessionHash <- dbEscapeStrings(concerto$connection,toString(sessionHash))
  result <- DBI::dbSendQuery(concerto$connection,sprintf("SELECT 
                                                    id, 
                                                    test_id,
                                                    timeLimit,
                                                    status,
                                                    params,
                                                    error,
                                                    clientIp,
                                                    clientBrowser,
                                                    submitterPort,
                                                    hash
                                                    FROM TestSession WHERE hash='%s'",sessionHash))
  response <- DBI::dbFetch(result,n=-1)
  DBI::dbClearResult(result)
  return(response)
}
