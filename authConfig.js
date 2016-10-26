var configForDevelopment = {
    providers: {
        google: {
            clientId: '486001374115-omu1ss1g192abgti64ecl90h8fal57r1.apps.googleusercontent.com'
        }
        // ,
        // linkedin:{
        //     clientId:'778mif8zyqbei7'
        // },
        // facebook:{
        //     clientId:'1452782111708498'
        // }
      },
    baseUrl: 'http://localhost:9000',
    // The API specifies that new users register at the POST /users enpoint.
    signupUrl: 'users',
    // Logins happen at the POST /sessions/create endpoint.
    loginUrl: 'sessions/create',
    // The API serves its tokens with a key of id_token which differs from
    // aureliauth's standard.
    tokenName: 'id_token',
    // Once logged in, we want to redirect the user to the welcome view.
    loginRedirect: '#/welcome',
};

var configForProduction = {
    providers: {
        google: {
            clientId: '486001374115-omu1ss1g192abgti64ecl90h8fal57r1.apps.googleusercontent.com'
        }
        // ,
        // linkedin:{
        //     clientId:'7561959vdub4x1'
        // },
        // facebook:{
        //     clientId:'1653908914832509'
        // }

    },
    baseUrl: 'http://localhost:8080',
    // The API specifies that new users register at the POST /users enpoint.
    signupUrl: 'users',
    // Logins happen at the POST /sessions/create endpoint.
    loginUrl: 'sessions/create',
    // The API serves its tokens with a key of id_token which differs from
    // aureliauth's standard.
    tokenName: 'id_token',
    // Once logged in, we want to redirect the user to the welcome view.
    loginRedirect: '#/welcome',
};
var config ;
if (window.location.hostname==='localhost') {
    config = configForDevelopment;
}
else{
    config = configForProduction;
}


export default config;
