const corsMiddleware = (context, next) => {
    context.response.headers.set('Access-Control-Allow-Origin', '*');
    context.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    context.response.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return next();
};

export { corsMiddleware };