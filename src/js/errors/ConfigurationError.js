export default class ConfigurationError extends Error {
    constructor( message, node ) {
        this.name = 'Configuration Error';
        this.message = message;
        this.node = node;
    }
}
