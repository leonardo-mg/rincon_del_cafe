const TransferenciaEthereum = artifacts.require("TransferenciaEthereum");

module.exports = function (deployer) {
    deployer.deploy(TransferenciaEthereum);
};
