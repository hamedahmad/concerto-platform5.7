concerto.table.get <-
function(tableId, cache=F){

  if(!is.null(concerto$cache$tables[[as.character(tableId)]])) {
    return(concerto$cache$tables[[as.character(tableId)]])
  }

  objField <- "id"
  if(is.character(tableId)){
    objField <- "name"
  }

  tableId <- dbEscapeStrings(concerto$connection,toString(tableId))
  result <- DBI::dbSendQuery(concerto$connection,sprintf("SELECT id,name FROM Table WHERE %s='%s'",objField,tableId))
  response <- DBI::dbFetch(result,n=-1)
  DBI::dbClearResult(result)

  if(dim(response)[1] > 0){
    table = as.list(response)
    if(cache) {
        concerto$cache$tables[[as.character(response$id)]] <<- table
        concerto$cache$tables[[response$name]] <<- table
    }
    return(table)
  }

  return(NULL)
}
