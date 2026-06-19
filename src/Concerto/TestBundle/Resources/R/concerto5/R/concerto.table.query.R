concerto.table.query <-
function(sql, params=list(), n=-1){
  sql <- gsub("^\\s+|\\s+$", "", sql)
  sql <- concerto.table.insertParams(sql, params)

  concerto.log(sql)

  result <- NULL
  output <- NULL
  if(toupper(substring(sql, 1, 6)) == "SELECT") {
    result <- DBI::dbSendQuery(concerto$connection, sql)
    output <- DBI::dbFetch(result, n=n)
    DBI::dbClearResult(result)
  } else if(toupper(substring(sql, 1, 6)) == "INSERT") {
    if(concerto$connectionParams$driver == "pdo_sqlsrv") {
         result <- DBI::dbSendQuery(
              concerto$connection,
              paste0(sql, "; SELECT LAST_INSERT_ID();")
          )

          output <- DBI::dbFetch(result, n = 1)[1,1]
          DBI::dbClearResult(result)
         concerto$sqlsrv_last_insert_id <<- output
    } else {
        result <- DBI::dbSendStatement(concerto$connection, sql)
        output <- DBI::dbGetRowsAffected(result)
    }
  } else {
    result <- DBI::dbSendStatement(concerto$connection, sql)
    output <- DBI::dbGetRowsAffected(result)
  }

  DBI::dbClearResult(result)

  return(output)
}
