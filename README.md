# yeezy-store
A blockchain based webstore using ethereum smart contract to transfer ownership of the ever popular Yeezy's

This is a proof of concept to demonstrate how smart contracts can be used for online retail, this dApp can be implemented along with a JSON feed of products from a traditional webstore to make purchases using a smart contract and the best thing is merchants will know exactly how many you have sold!!!

Now if only Ethereum could scale to meet the demand of YEEZYS!!

![alt text](/screenshot.png "Smart contrat eCommerce")


# Requires Truffle & Ganache
    Download Ganache from here: [Here]: http://truffleframework.com/ganache/

## Install Truffle    
    npm install -g truffle

## Clone the directory
    cd yeezy-store

## Run the Compiler    
    truffle compile

## Run Migraions    
    truffle migrate

## Run tests
    truffle test

## To run on local host ensure you have MetaMask installed in your browser
    npm run dev

    You will see the webstore running in you browser on http://localhost:3000

## To execute a transaction via smart contract open MetaMask

    Select Custom and enter http://127.0.0.1:7450 as the New URL and Save 
    You should see Private Network in the top left of meta mask

    NOW YOU CAN COP SOME YEEZYS!!!!               
