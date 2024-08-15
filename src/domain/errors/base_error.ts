export class BaseError extends Error {
    status: number;
    _stack: any;
    error: string;
    metadata: any;

    constructor(message: string, status: number, metadata?: any) {
        super(message || 'Default error');
        this.error = this.message;
        this.status = status;
        this._stack = this.stack;
        this.metadata = metadata;
    }

    toString() {
        const metadata = this.metadata ? '\n Metadata: ' + this.metadata : '';
        return super.toString() + metadata;
    }
}
