App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../items.json', function(data) {
      var petsRow = $('#itemsRow');
      var itemTemplate = $('#itemTemplate');

      for (i = 0; i < data.length; i ++) {
        itemTemplate.find('.panel-title').text(data[i].name);
        itemTemplate.find('img').attr('src', data[i].picture);
        itemTemplate.find('.item-name').text(data[i].name);
        itemTemplate.find('.item-color').text(data[i].color);
        itemTemplate.find('.item-price').text(data[i].price);
        itemTemplate.find('.item-sku').text(data[i].sku);
        itemTemplate.find('.btn-primary').attr('data-id', data[i].id);

        petsRow.append(itemTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
  // Is there an injected web3 instance?
  if (typeof web3 !== 'undefined') {
    App.web3Provider = web3.currentProvider;
  } else {
  // If no injected web3 instance is detected, fall back to Ganache
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Transaction.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract

      var TransactionArtifact = data;
      App.contracts.Transaction = TruffleContract(TransactionArtifact);
    
      // Set the provider for our contract
      App.contracts.Transaction.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the purchased items
      return App.markPurchased();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-primary', App.handleBuy);
  },

  markPurcahsed: function(buyers, account) {
    var adoptionInstance;

    App.contracts.Transaction.deployed().then(function(instance) {
      transactionInstance = instance;
    
      return transactionInstance.getBuyers.call();
    }).then(function(buyers) {
      for (i = 0; i < buyers.length; i++) {
        if (buyers[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-item').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleBuy: function(event) {
    event.preventDefault();

    var itemId = parseInt($(event.target).data('id'));
    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
    
      App.contracts.Transaction.deployed().then(function(instance) {
        transactionInstance = instance;
    
        // Execute purcahse as a transaction by sending account
        return transactionInstance.buy(itemId, {from: account});
      }).then(function(result) {
        return App.markPurcahsed();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
