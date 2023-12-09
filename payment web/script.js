// Establece la conexión con Ganache
const web3 = new Web3('HTTP://127.0.0.1:7545');

// Dirección del contrato y ABI
const contractAddress = "0x126aab93C383C427f048eD7B5F0a9c966254031a";
const contractABI = [
    
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "Purchase",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "comprar",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address payable",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "purchases",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdrawFunds",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      
];

// Instancia del contrato
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Manejo del envío del formulario
document.getElementById("paymentForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const cardNumber = document.getElementById("cardNumber").value;
    const name = document.getElementById("name").value;
    const expiration = document.getElementById("expiration").value;
    const cvv = document.getElementById("cvv").value;

    const price = document.getElementById("price").value; // Nuevo campo de precio

    // Obtiene la cuenta del comprador y la cuenta del vendedor
    const buyerAccount = "0x2a56300b49CF5a10348a1D00E64A0Fa66Bfd878d";
    const sellerAccount = "0x68F2a69779E2ef6b5AD77b521b1382D846588778";

    try {
        // Verifica el balance del comprador
        const buyerBalance = await web3.eth.getBalance(buyerAccount);
        const priceWei = web3.utils.toWei(price, "ether");

        if (Number(buyerBalance) < Number(priceWei)) {
            alert("El comprador no tiene suficiente saldo para realizar la compra");
            return;
        }

        // Realiza la transferencia de fondos del comprador al vendedor
        const transaction = await web3.eth.sendTransaction({
            from: buyerAccount,
            to: sellerAccount,
            value: priceWei
        });

        // Registra la compra en el contrato
        const result = await contract.methods.comprar().send({
            from: buyerAccount
        });

        console.log(transaction);
        console.log(result);

        alert("Transferecia Realizada con Exito");
    } catch (error) {
        console.error(error);
        alert("Transferecia Realizada con Exito");
    }
});