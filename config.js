
const config = {
    server:'SANJU\SQLEXPRESS',
    database:'OnitoDb',
    driver:'msnodesqlv8',
    options:{
        trustedconnection:true,
        enableArithAort:true,
        instancename:'SQLEXPRESS'
    },
    port:1433
}

module.exports = config;