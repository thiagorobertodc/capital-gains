const { processOperationsList } = require('../lib/processOperation');

describe('CapitalGainsCalculator', () => {
    test('should handle multiple losses and profits correctly', () => {
        const operations = [
            { "operation": "buy", "unit-cost": 10.00, "quantity": 10000 },
            { "operation": "sell", "unit-cost": 8.00, "quantity": 2000 }, 
            { "operation": "sell", "unit-cost": 12.00, "quantity": 3000 },
            { "operation": "sell", "unit-cost": 15.00, "quantity": 5000 }
        ];

        const result = processOperationsList(operations);

        expect(result).toEqual([
            { "tax": "0.00" },
            { "tax": "0.00" },
            { "tax": "400.00" },
            { "tax": "5000.00" } // Updated expected tax to "5000.00"
        ]);
    });

    test('should accumulate losses and deduct from future profits', () => {
        const operations = [
            { "operation": "buy", "unit-cost": 10.00, "quantity": 10000 },
            { "operation": "sell", "unit-cost": 5.00, "quantity": 2000 },  // Loss: 5 * 2000 = -10,000
            { "operation": "sell", "unit-cost": 15.00, "quantity": 1000 }  // Profit: 5 * 1000 = 5,000 - 10,000 = -5,000 -> No tax
        ];

        const result = processOperationsList(operations);

        expect(result).toEqual([
            { "tax": "0.00" },
            { "tax": "0.00" },
            { "tax": "0.00" }
        ]);
    });

    test('should not apply tax if total operation value <= 20000', () => {
        const operations = [
            { "operation": "buy", "unit-cost": 10.00, "quantity": 1000 },
            { "operation": "sell", "unit-cost": 15.00, "quantity": 1000 } // Total Value: 15000 <= 20000 -> Tax: "0.00"
        ];

        const result = processOperationsList(operations);

        expect(result).toEqual([
            { "tax": "0.00" },
            { "tax": "0.00" }
        ]);
    });

    test('should handle multiple losses and profits correctly', () => {
        const operations = [
            { "operation": "buy", "unit-cost": 10.00, "quantity": 10000 },
            { "operation": "sell", "unit-cost": 8.00, "quantity": 2000 },  // Loss: 2 * 2000 = -4000
            { "operation": "sell", "unit-cost": 12.00, "quantity": 3000 }, // Profit: 2 * 3000 = 6000 - 4000 = 2000 -> Tax: "400.00"
            { "operation": "sell", "unit-cost": 15.00, "quantity": 5000 }  // Profit: 5 * 5000 = 25000 -> Tax: "5000.00"
        ];

        const result = processOperationsList(operations);

        expect(result).toEqual([
            { "tax": "0.00" },
            { "tax": "0.00" },
            { "tax": "400.00" },
            { "tax": "5000.00" }
        ]);
    });

    test('should return null tax for invalid operations', () => {
        const operations = [
            { "operation": "hold", "unit-cost": 10.00, "quantity": 10000 }, // Invalid operation type
            { "operation": "sell", "unit-cost": "20.00", "quantity": 5000 }, // Non-numeric unit-cost
            { "operation": "buy", "unit-cost": 15.00, "quantity": 5000 }     // Valid operation
        ];

        const result = processOperationsList(operations);

        expect(result).toEqual([
            { "tax": null },
            { "tax": null },
            { "tax": "0.00" }
        ]);
    });
});
