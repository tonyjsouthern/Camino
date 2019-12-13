function runQuery(event, arg, scope) {

    var query = arg.queries;

    const config = {
        user: arg.server.username,
        password: arg.server.password,
        server: arg.server.address,
        database: arg.server.database
    }

    function queryLimiter(string) {
        if (arg.limited == true) {
            var limit = 'top 150';
            var stringArray = string.split(" ");
            var compiledString = '';
            for (var i = 0; i < stringArray.length; i++) {
                if (stringArray[i] == 'select') {
                    compiledString += stringArray[i] + " " + limit + " ";
                } else {
                    compiledString += stringArray[i] + " ";
                }
            }
            return compiledString;
        } else {
            return string;
        }
    }

    async function executeSql() {
        try {
            await scope.mssql.connect(config);
            var result = await scope.mssql.query(queryLimiter(query));
            await scope.mssql.close();
            if (result.recordset == undefined) {
                return [{
                    RowsAffected: result.rowsAffected
                }];
            } else {
                return result.recordset;
            }
        } catch (error) {
            scope.mssql.close();
            return scope.errorHandler(error.message);
        }
    }

    return executeSql();

}

module.exports = runQuery;
