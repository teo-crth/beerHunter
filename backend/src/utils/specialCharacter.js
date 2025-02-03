// export const replaceSpecialChars = (obj) => {

//     const charMap = {
//         'Š': 'è',
//         '“': 'ô',
//         'ˆ': 'ê',
//         'Œ': 'î',
//         '–': 'û',
//         'ƒ': 'â',
//         '…': 'à',
//         '‚': 'é'
//     };

//     console.log('obj in utils function', obj);

//     function replaceCommas(text) {
//         return text.replace(/(?<![ea])(?<!doux)(?<=[a-zA-Z]),(?=[a-zA-Z])|(?<=\b|[a-zA-Z]|\s|')(?<![ea])(?<!doux),(?=\s|,)|,(?=,)/g, 'é');
//     }

//     function recursiveReplace(value) {
//         console.log('value in utils function', value);
        
//         if (typeof value === 'string') {
//             value = replaceCommas(value);
//             return value.replace(/[Š“ˆŒ–ƒ…‚]/g, match => charMap[match]);
//         } else if (typeof value === 'object' && value !== null) {
//             for (let key in value) {
//                 value[key] = recursiveReplace(value[key]);
//             }
//         }
//         return value;
//     }

//     return recursiveReplace(obj);
// };


export const replaceSpecialChars = (obj) => {
    const charMap = {
        'Š': 'è',
        '“': 'ô',
        'ˆ': 'ê',
        'Œ': 'î',
        '–': 'û',
        'ƒ': 'â',
        '…': 'à',
        '‚': 'é'
    };

    const keysToModify = new Set(["name", "description", "subtitle", "address", "city", "text"]);

    function replaceCommas(text) {
        return text.replace(/(?<![ea])(?<!doux)(?<=[a-zA-Z]),(?=[a-zA-Z])|(?<=\b|[a-zA-Z]|\s|')(?<![ea])(?<!doux),(?=\s|,)|,(?=,)/g, 'é');
    }

    function recursiveReplace(value, key = null) {        
        if (typeof value === 'string' && (key === null || keysToModify.has(key))) {
            value = replaceCommas(value);
            return value.replace(/[Š“ˆŒ–ƒ…‚]/g, match => charMap[match]);
        } else if (typeof value === 'object' && value !== null) {
            for (let k in value) {
                value[k] = recursiveReplace(value[k], k);
            }
        }
        return value;
    }

    return recursiveReplace(obj);
};
