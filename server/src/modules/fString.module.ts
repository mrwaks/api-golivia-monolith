"use strict";

/**
 * fString.
 * 
 * Used to format a string with variables.
 */
const fString = (str: string, ...args: any[]): string => {
    let variables;
    args.forEach(arg => {
        if (args.length == 1 && typeof arg === "object" && !Array.isArray(arg) && Object.keys(arg).length) {
            variables = arg;
        }
        if (typeof arg === "object") {
            args.splice(args.indexOf(arg), 1, JSON.stringify(arg));
        }
    });

    if (!variables) {
        const percentageS = /%s/g;
        if (percentageS.test(str)) {
            const arr = str.match(percentageS);
            if (arr.every(value => value === "%s")) {
                const substitute = (str: string, args: any[]): string => {
                    if (args.length) {
                        str = str.replace(/%s/, args.shift());
                        return substitute(str, args);
                    }
                    return str;
                };
        
                return substitute(str, args);
            }
        }
        const isThereLiteralExpressionAsNumber = /(?<=\${)\d+(?=})/g;
        if (isThereLiteralExpressionAsNumber) {
            const arr = str.match(isThereLiteralExpressionAsNumber);
            if (arr.every(value => /\d+/.test(value))) {
                args.unshift(str);
                return args.reduce((acc, arg, idx) => acc.replace(new RegExp("\\$\\{" + (idx - 1) + "\\}", "g"), arg));
            }
        }
        return;
    }

    const isThereLiteralExpression = /(?<=\${)\w+(?=})/g;

    if (!isThereLiteralExpression.test(str)) {
        throw new Error("parameter (str) contains no expression, like '${expression}' or '%s'");
    }

    Object.entries(variables).forEach(entry => {
        const key = entry[0];
        const value = entry[1];

        const literalExpressionInBrackets = new RegExp(`(?<=\\\${)${key}(?=})`);
        if (literalExpressionInBrackets.test(str)) {
            const literalExpressionWithBrackets = new RegExp(`\\\$\\\{${key}}`);
            str = str.replace(literalExpressionWithBrackets, value as string);
        }
    });

    return str;
};

export default fString;