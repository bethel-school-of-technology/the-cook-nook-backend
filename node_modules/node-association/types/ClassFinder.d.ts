import * as ExtendableError from 'es6-error';
export declare class ClassLocationError extends ExtendableError {
    constructor(message?: string);
}
export declare class ClassFinder {
    static _classLocation: any;
    static _classFor: any;
    static readonly localPath: string;
    static readonly searchPath: string[];
    static readonly hierarchyDivider: string;
    static classLocation(classType: string): any;
    static resolveClassLocation(classType: string): never;
    static classForRequire(name: string, classType: string): any;
    static removeNamespace(name: string): string;
    static classFor(name: string, classType: string): any;
}
//# sourceMappingURL=ClassFinder.d.ts.map