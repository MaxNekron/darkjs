export default function parse(string, params) {
    const keys = Object.keys(params);
    for(var i=0; i<keys.length; i++) {
        const key = keys[i];
        string = string.replace(new RegExp("{"+key+"}", "g"), params[key]);
    }
    return string.replace(new RegExp("{\\w+}", "g"), '');
};