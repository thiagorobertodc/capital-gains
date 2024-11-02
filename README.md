# Capital Gains CLI Application

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [1. Using Input Files](#1-using-input-files)
  - [2. Using Echo Command](#2-using-echo-command)
  - [3. Manual Input](#3-manual-input)
- [Testing](#testing)
- [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Capital Gains CLI Application** is a command-line tool designed to process financial market operations related to buying and selling stocks. It calculates the applicable taxes based on specified business rules and outputs the results in a structured JSON format. All of them are provided from the Nubank "Ganho de Capitais" challenge sent for me via email. 

## Features

- **Multiple Simulations:** Handle multiple sets of financial operations in a single input.
- **Independent Processing:** Each simulation is processed independently without shared state.
- **Flexible Input Methods:** Supports input via files, echo commands, or manual entry.
- **Error Handling:** Provides clear error messages for invalid inputs or processing issues.

## Prerequisites

Before setting up the Capital Gains CLI Application, ensure you have the following installed on your system:

- **Node.js:** Version 12 or higher
- **npm:** Node Package Manager (comes bundled with Node.js)

## Installation

1. **Unzip and extract the files:**
2. **Navigate to the Project Directory:**
    
        cd capital-gains
3. **Install dependecies**
    
        npm install
4. **Link the CLI Application Globally (Optional):**
    
        npm link
    This way you can run the script from anywhere.

## Usage
The Capital Gains CLI Application can process financial operations provided as JSON arrays. You can input the data using files, echo commands, or manual entry.

1. Using Input Files
Recommended Method: To avoid manual input complexities and ensure smooth operation, it's recommended to provide your operations via a JSON file.

    capital-gains < operations.json

2. Using Echo Command
You can pipe JSON input directly into the CLI using the echo command.

        
    echo '[{"operation":"buy","unit-cost":10,"quantity":100},{"operation":"sell","unit-cost":15,"quantity":50},{"operation":"sell","unit-cost":15,"quantity":50}]
    [{"operation":"buy","unit-cost":10,"quantity":10000},{"operation":"sell","unit-cost":20,"quantity":5000},{"operation":"sell","unit-cost":5,"quantity":5000}]' | capital-gains
        

3. Manual Input
You can enter the JSON arrays manually in the terminal. However, note that this method requires sending an End-of-File (EOF) signal to indicate the end of input. (pressing Enter twice).

## Testing
The application includes a suite of tests to ensure functionality. To run the tests:

    npm test

