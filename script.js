personal.unlockAccount(eth.coinbase, "admin",0);
console.log("== Coinbase Unlocked!");
console.log("== Auto Mining Script Loaded!");
var mining_threads = 2

function checkWork() {
    if (eth.getBlock("pending").transactions.length > 0 || eth.pendingTransactions.length>0) {
        if (eth.mining) return;
        console.log("== Pending transactions! Mining...");
        miner.start(mining_threads);
    } else {
        miner.stop();
        console.log("== No transactions! Mining stopped.");
    }
}

eth.filter("latest", function (err, block) { checkWork(); });
eth.filter("pending", function (err, block) { checkWork(); });

checkWork();
