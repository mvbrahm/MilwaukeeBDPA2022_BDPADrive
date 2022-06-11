const mysql=require('mysql2');
var connection=mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'bdpA!2o22',
    database: 'BDPADrive'
}); 
connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL database is connected successfully');
	}
});
module.exports = connection;