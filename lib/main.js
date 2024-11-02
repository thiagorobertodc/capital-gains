const { processOperationsList } = require('./processOperation');

/**
 * Extracts all JSON arrays from the input string.
 * @param {string} input - The raw input string containing multiple JSON arrays.
 * @returns {Array} - An array of parsed JSON arrays.
 */
function parseMultipleJSONArrays(input) {
    const arrays = [];
    let currentIndex = 0;

    while (currentIndex < input.length) {
        const start = input.indexOf('[', currentIndex);
        if (start === -1) break;

        let depth = 0;
        let end = start;
        let inString = false;

        while (end < input.length) {
            const char = input[end];
            if (char === '"' && input[end - 1] !== '\\') {
                inString = !inString;
            }
            if (!inString) {
                if (char === '[') depth++;
                else if (char === ']') depth--;
                if (depth === 0) {
                    end++; // Include the closing bracket
                    break;
                }
            }
            end++;
        }

        if (depth !== 0) {
            throw new Error('Invalid JSON input: unmatched brackets.');
        }

        const jsonArrayStr = input.substring(start, end);
        try {
            const jsonArray = JSON.parse(jsonArrayStr);
            arrays.push(jsonArray);
        } catch (error) {
            throw new Error(`Invalid JSON array: ${error.message}`);
        }

        currentIndex = end;
    }

    return arrays;
}

/**
 * Handles the input data.
 * @param {string} input - The raw input string from stdin.
 */
function handleInput(input) {
    if (input.trim() === '') {
        console.error('No input provided.');
        process.exit(1);
    }

    let jsonArrays;
    try {
        jsonArrays = parseMultipleJSONArrays(input.trim());
        if (jsonArrays.length === 0) {
            throw new Error('No JSON arrays found in the input.');
        }
    } catch (error) {
        console.error(`Input Parsing Error: ${error.message}`);
        process.exit(1);
    }

    const results = jsonArrays.map((operations, index) => {
        try {
            return processOperationsList(operations);
        } catch (error) {
            console.error(`Error processing simulation #${index + 1}: ${error.message}`);
            return null;
        }
    });

    const validResults = results.filter(result => result !== null);

    validResults.forEach(result => {
        console.log(JSON.stringify(result));
    });

    process.exit(0);
}

module.exports = { handleInput };
