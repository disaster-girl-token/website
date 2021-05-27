var currentAccount = null;
var vars = {
    token: null,
    MaxBuyAmount: null,
    presale: null,
    Token: null,
    Presale: null
};
async function loadAbis() {
    vars.Token = await fetch("../abis/Disastergirltoken.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data
        });

    vars.Presale = await fetch("../abis/Presale.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data
        });
}

function handleAccountsChanged(accounts) {

    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        window.alert('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
        document.getElementById('connect-btn').innerHTML = ethereum.selectedAddress;
        currentAccount = accounts[0];
        // Do any other work!
    }
}

function handleEthereum() {
    const {
        ethereum
    } = window;
    if (ethereum && ethereum.isMetaMask) {
        if (web3.eth === undefined) {
            window.alert("Please download MetaMask Legacy Web3")
            // Opera 8.0+
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

            // Firefox 1.0+
            var isFirefox = typeof InstallTrigger !== 'undefined';

            // Internet Explorer 6-11
            var isIE = /*@cc_on!@*/ false || !!document.documentMode;

            // Edge 20+
            var isEdge = !isIE && !!window.StyleMedia;

            // Chrome 1 - 79
            var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

            var isChromium = !!window.chrome;

            var isBrave = !!navigator.brave;

            // Edge (based on chromium) detection
            var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edge") != -1);

            if (isFirefox){ 
                window.location = "https://addons.mozilla.org/en-US/firefox/addon/metamask-legacy-web3/"
            }            
            else if (isEdge || isEdgeChromium){
                window.location = "https://microsoftedge.microsoft.com/addons/detail/metamask-legacy-web3/obkfjbjkiofoponpkmphnpaaadebfloh"
            }
            else if (isChrome || isChromium || isBrave){
                window.location = "https://chrome.google.com/webstore/detail/metamask-legacy-web3/dgoegggfhkapjphahmgihfgemkgecdgl"
            }

            else{
                window.alert("Your browser is not compatible with Metamask")
            }

        } else {
            document.getElementById('connect-btn').innerHTML = ethereum.selectedAddress;
            currentAccount = web3.eth.accounts[0];
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
        }

    } else {
        window.location = "https://metamask.io/download.html";
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
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
            document.getElementById('connect-btn').innerHTML = ethereum.selectedAddress;
        });
    } else {
        window.alert("Please download Metamask");
        window.Location = "https://metamask.io/download.html";
    }

}



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


async function loadContract() {

    //console.log(this.state.bnbBalance);
    const networkId = (new web3.BigNumber(ethereum.chainId)).toString();

    // Load token
    const tokenData = vars.Token.networks[networkId];
    if (tokenData) {
        vars.token = web3.eth.contract(vars.Token.abi).at(tokenData.address);
    } else {
        window.alert("Token contract not deployed to detected network");
    }

    const PresaleData = vars.Presale.networks[networkId];

    if (PresaleData) {
        vars.presale = web3.eth.contract(vars.Presale.abi).at(PresaleData.address);
    } else {
        window.alert("Presale contract not deployed to detected network");
    }
}

async function buy(n) {
    if (n >= 0.01) {
        await vars.presale.buyTokens({
            value: web3.toWei(n, 'Ether'),
            from: currentAccount
        }, function (error, result) {
            if (!error)
                console.log(result);
            else
                console.log(error.code)
        });
    } else {
        window.alert("Minimum purchase 0.01 BNB")
    }
}

async function buyTokens() {
    var amount = document.getElementById("buy-input").value;
    await connectWallet();
    await loadAbis();
    await loadContract();
    await buy(amount);
}

// Events

document.getElementById("connect-btn").addEventListener("click", connectWallet);
document.getElementById("buy-btn").addEventListener("click", buyTokens);
document.getElementById("add-token-btn").addEventListener("click", addDISGToken);