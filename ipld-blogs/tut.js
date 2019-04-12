const ipfsClient = require('ipfs-http-client');
const CID = require('cids');
const ipfs = new ipfsClient();

async function addNewFarmer(hash) {

  var fileDetailsArray = new Array();
  var data = {
    fileUploadDate: new Date().toISOString().slice(0, 10),
    fileHash: hash
  }
  fileDetailsArray.push(data)
  var newFarmer = await ipfs.dag.put(
    {
      content: fileDetailsArray
    }
  );
  const multihash = newFarmer.multihash;
  const cids = new CID(1, 'dag-cbor', multihash);
  return cids.toBaseEncodedString();
}

async function getExistingFileDetailsArray(recordCID) {
  var record = await ipfs.dag.get(recordCID);
  return record.value.content;
}

async function updateExistingFarmer(fileDetailsArray, newHash) {

  var data = {
    fileUploadDate: new Date().toISOString().slice(0, 10),
    fileHash: newHash
  }
  fileDetailsArray.push(data)
  var existingFarmer = await ipfs.dag.put(
    {
      content: fileDetailsArray
    }
  );
  const multihash = existingFarmer.multihash;
  const cids = new CID(1, 'dag-cbor', multihash);
  return cids.toBaseEncodedString();
}

async function fetchRecord(recordCID) {
  var record = await ipfs.dag.get(recordCID);
  return record.value
}

function startPublication() {
  addNewFarmer('QmcYbx136FjzR8kpxDkFvULwB2U8S8uGeLtWnSfEyNinRF')
    .then((result) => {
      console.log("1st CID",result)
      getExistingFileDetailsArray(result)
        .then((result1) => {
          updateExistingFarmer(result1, 'Qmf1cXnvBtm2sCCdtVmftoH6cJp4mAPckmFF6er8LqcBjM')
            .then((result2) => {
              console.log("2nd CID",result2)
            });
        });
    });
}

startPublication();

/*-----------------------------------------------------------------------------------------------------------------------------------------------*/