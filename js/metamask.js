var currentAccount = null;

function handleAccountsChanged(accounts) {
    console.log(accounts)
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        // Do any other work!
    }
}

function handleEthereum() {
    const {
        ethereum
    } = window;
    if (ethereum && ethereum.isMetaMask) {
        console.log('Wallet successfully detected!');
        // Access the decentralized web!
        ethereum
            .request({
                method: 'eth_requestAccounts'
            })
            .then(handleAccountsChanged)
            .catch((error) => {
                if (error.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(error);
                }
            });

    } else {
        console.log('Please install MetaMask!');
    }

}


function connectWallet() {

    if (window.ethereum) {
        handleEthereum();
    } else {
        window.addEventListener('ethereum#initialized', handleEthereum, {
            once: true,
        });

        // If the event is not dispatched by the end of the timeout,
        // the user probably doesn't have MetaMask installed.
        setTimeout(handleEthereum, 3000); // 3 seconds


    }


}

window.ethereum.on('accountsChanged', function (accounts) {
    document.getElementById('connect-btn').innerHTML = ethereum.selectedAddress;
})

function addDISGToken() {
    ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: '0x46445d5de905b6abfb6f0e3a06b68ed445d1ab10',
                    symbol: 'DISG',
                    decimals: 9,
                    image: 'https://i.ibb.co/0FN9bcS/token.png',
                },
            },
        })
        .then((success) => {
            if (success) {
                window.alert('DISG successfully added to wallet!')
            } else {
                throw new Error('Something went wrong.')
            }
        })
        .catch(console.error)
}

function connectBSC() {
    const params = [{
        chainId: 0x38, // A 0x-prefixed hexadecimal string
        chainName: 'BSC',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB', // 2-6 characters long
            decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com/']
    }];
    ethereum.request({
            method: 'wallet_addEthereumChain',
            params
        })
        .then(() => console.log('Success')
            .catch((error) => console.log("Error", error.message)))

}