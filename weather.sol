pragma solidity ^0.4.11;
import "github.com/oraclize/ethereum-api/oraclizeAPI_0.4.sol";

contract Test is usingOraclize {
   string public TEMPERATURE;
   event LogConstructorInitiated(string nextStep);
   event LogPriceUpdated(string price);
   event LogNewOraclizeQuery(string description);

   constructor() public payable {
       emit LogConstructorInitiated("Constructor was initiated. Call 'getWeather()' to send the Oraclize Query.");
   }

   function __callback(bytes32 myid, string result) public {
       if (msg.sender != oraclize_cbAddress()) revert();
       TEMPERATURE = strConcat(result,"°C");
       emit LogPriceUpdated(result);
   }
    
   function getWeather() public payable {
       if (oraclize_getPrice("URL") > address(this).balance) {
           emit LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
       } else {
           emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
           oraclize_query("URL","json(https://api.openweathermap.org/data/2.5/weather?id=1275004&units=metric&APPID=84a070758462174005f30a6dc80267d4).main.temp");
       }
   }
} 
