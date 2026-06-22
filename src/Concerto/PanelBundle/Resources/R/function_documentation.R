library(jsonlite)
library(tools)

for(package in rownames(installed.packages())){

    tryCatch({

        library(package, character.only = TRUE)

        db <- Rd_db(package)
        adm <- c()

        for(doc in db){

            outfile <- tempfile(fileext = ".html")
            tools::Rd2HTML(doc, out = outfile)
            HTML <- paste0(readLines(outfile), collapse = "")
            unlink(outfile)

            aliases <- tools:::.Rd_get_metadata(x = doc, kind = 'alias')

            for(alias in aliases) {

                if(!grepl('^[a-zA-Z0-9_.]*$', alias, perl = TRUE) ||
                   alias %in% adm ||
                   !exists(alias, where = asNamespace(package), inherits = FALSE) ||
                   !is.function(get(alias, envir = asNamespace(package)))){

                    next
                }

                adm <- c(adm, alias)

                form <- formals(get(alias, envir = asNamespace(package)))
                arguments <- names(form)
                defaults <- paste(form)

                json <- jsonlite::toJSON(list(
                    lib = package,
                    fun = alias,
                    doc = paste0(alias, "()"),
                    args = paste(arguments, collapse = ","),
                    defs = ""
                ), auto_unbox = TRUE)

                cat(json, "\n", sep = "")
            }

        }

    }, error = function(e) {
        # skip broken package
    })

}