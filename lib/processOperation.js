/**
 * Class to calculate Capital Gains based on buy and sell operations.
 */
class CapitalGainsCalculator {
    constructor() {
        this.sharesOwned = 0;
        this.weightedAverage = 0.00;
        this.cumulativeLoss = 0.00;
    }

    /**
     * Processes a single operation and returns the tax due.
     * @param {Object} operation - The operation object.
     * @returns {Object} - An object containing the tax.
     */
    processOperation(operation) {
        let tax = 0.00;

        const { operation: opType, 'unit-cost': unitCost, quantity } = operation;

        if (opType === 'buy') {
            this.handleBuyOperation(unitCost, quantity)
        } else if (opType === 'sell') {
            tax = this.handleSellOperation(unitCost, quantity);
        } else {
            console.error(`Invalid operation type: ${opType}`);
            return { tax: null };
        }

        tax = tax?.toFixed(2) || null;
        return { tax };
    }

    /**
     * Handles buy operations by updating shares owned and weighted average.
     * @param {number} unitCost - Cost per share.
     * @param {number} quantity - Number of shares bought.
     */
    handleBuyOperation(unitCost, quantity) {
        const totalCost = this.weightedAverage * this.sharesOwned;
        const additionalCost = unitCost * quantity;
        const newTotalShares = this.sharesOwned + quantity;
        const newWeightedAverage = (totalCost + additionalCost) / newTotalShares;

        this.weightedAverage = newWeightedAverage;
        this.sharesOwned = newTotalShares;
    }

    /**
     * Handles sell operations by calculating tax based on profit or loss.
     * @param {number} unitCost - Sale price per share.
     * @param {number} quantity - Number of shares sold.
     * @returns {number} - Tax due for the operation.
     */
    handleSellOperation(unitCost, quantity) {
        if (quantity > this.sharesOwned) {
            console.error(`Cannot sell ${quantity} shares. Only ${this.sharesOwned} shares owned.`);
            return null;
        }
        const totalOperationValue = unitCost * quantity;

        if (totalOperationValue <= 20000.00) {
            const profitOrLoss = (unitCost - this.weightedAverage) * quantity;
            if (profitOrLoss < 0) {
                // Accumulate loss
                this.cumulativeLoss += Math.abs(profitOrLoss);
            }
            this.sharesOwned -= quantity;
            return 0.00;
        }

        const profitPerShare = unitCost - this.weightedAverage;
        const totalProfitOrLoss = profitPerShare * quantity;
        this.sharesOwned -= quantity;

        if (totalProfitOrLoss > 0) {
            let taxableProfit = totalProfitOrLoss;

            if (this.cumulativeLoss > 0) {
                if (this.cumulativeLoss >= taxableProfit) {
                    this.cumulativeLoss -= taxableProfit;
                    taxableProfit = 0.00;
                } else {
                    taxableProfit -= this.cumulativeLoss;
                    this.cumulativeLoss = 0.00;
                }
            }

            if (taxableProfit > 0) {
                const tax = taxableProfit * 0.20;
                return tax;
            } else {
                return 0.00;
            }
        } else if (totalProfitOrLoss < 0) {
            this.cumulativeLoss += Math.abs(totalProfitOrLoss);
            return 0.00;
        } else {
            return 0.00;
        }
    }
}

/**
 * Processes a list of operations and returns a list of tax objects.
 * @param {Array} operations - The list of operation objects.
 * @returns {Array} - The list of objects containing tax information.
 */
function processOperationsList(operations) {
    const calculator = new CapitalGainsCalculator();
    return operations.map(op => calculator.processOperation(op));
}

module.exports = { processOperationsList };
