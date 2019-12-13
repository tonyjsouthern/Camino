function getDbs (event, arg, scope) {
  var query = 'SELECT name FROM master.sys.databases'

  var config = {
    host: arg.address,
    dialect: 'mssql',
    port: 1433
  };

  async function runQuery (){
    try {
      var connection = await new scope.sql('master', arg.username, arg.password, config);
      return await connection.query(query).spread((results) => {
        return results;
      })
    } catch (error) {
      return scope.errorHandler(error.message)
    }
  }

  return runQuery();

}

module.exports = getDbs;
