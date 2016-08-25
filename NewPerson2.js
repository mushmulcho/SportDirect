var playerNames = [];
var moneyTakenFromCardBGN = 523.35;
var other = 8;
var allSum = 0;
var EUR = 1.98;
var euro = true;
(function createLocalStorageFiles(){
	var JSONfile = {"Даката":{"name":"Даката","gold":62.72333333333335,"items":{"Salomon XR Shift Mens Trail Running Shoes":["Salomon XR Shift Mens Trail Running Shoes","30"],"Gelert Dustpan+Brush 63":["Gelert Dustpan+Brush 63","1.8"],"Gelert Camper Deluxe Self Inflating Mat":["Gelert Camper Deluxe Self Inflating Mat","18"],"Karrimor Xlite Tee Sn71 Black Large":["Karrimor Xlite Tee Sn71 Black Large","9.59"]}},"Дели":{"name":"Дели","gold":41.72333333333334,"items":{"Ocean Pacific Pacific All Over Print Beach Tunic Ladies":["Ocean Pacific Pacific All Over Print Beach Tunic Ladies","7.19"],"Miss F 7 Pk Tr Liner Ld61 Black Ladies":["Miss F 7 Pk Tr Liner Ld61 Black Ladies","3"],"Slaz 5PK Crew Sk Wb Sn63 Dark/Multi":["Slaz 5PK Crew Sk Wb Sn63 Dark/Multi","1.8"],"Miss Fiori Stripe 4Pk":["Miss Fiori Stripe 4Pk","2.4"],"Slaz Plain Polo Snr 62 Charcoal":["Slaz Plain Polo Snr 62 Charcoal","5.1"],"Slaz Plain Polo Snr 62 Yellow":["Slaz Plain Polo Snr 62 Yellow","5.1"],"Gelert Camper Full Mat 64 Blue":["Gelert Camper Full Mat 64 Blue","13.8"]}},"Сашо":{"name":"Сашо","gold":67.81333333333332,"items":{"Firetrap 3 Pack Formal Socks Mens":["Firetrap 3 Pack Formal Socks Mens","6.3"],"Airwalk Metalhead Skateboarding Shoes Mens":["Airwalk Metalhead Skateboarding Shoes Mens","16.79"],"Character Sgl Boxer Snr63 Star Wars":["Character Sgl Boxer Snr63 Star Wars","3"],"Character Sgl Boxer Snr63 Kermit":["Character Sgl Boxer Snr63 Kermit","3.6"],"No Fear Tailslide Mens Trainers":["No Fear Tailslide Mens Trainers","17.99"],"Gelert Ottawa Low Mens Walking Shoes":["Gelert Ottawa Low Mens Walking Shoes","16.8"]}},"Гу":{"name":"Гу","gold":38.12333333333334,"items":{"Karrimor Duma Trail Mens Running Shoes":["Karrimor Duma Trail Mens Running Shoes","27.59"],"Slazenger 5 Pack Trainer Socks X2":["Slazenger 5 Pack Trainer Socks X2","7.2"]}},"Мунч":{"name":"Мунч","gold":21.933333333333334,"items":{"Gelert Camper Self Inflating Mat":["Gelert Camper Self Inflating Mat","13.8"],"SoulCal Web Stripe Mens Belt":["SoulCal Web Stripe Mens Belt","4.8"]}},"Митко":{"name":"Митко","gold":30.923333333333336,"items":{"Lee Cooper Crafted Joggers Mens":["Lee Cooper Crafted Joggers Mens","5.99"],"Adidas Volzo Short SnC99 White/Night":["Adidas Volzo Short SnC99 White/Night","7.2"],"UEFA Germany CoreTee Sn63 White":["UEFA Germany CoreTee Sn63 White","4.8"],"Adidas Santos Sock 00 White/Black":["Adidas Santos Sock 00 White/Black","4.8"]," Adidas Santos Sock 00 Black/White M ":[" Adidas Santos Sock 00 Black/White M ","4.8"]}}};
	if(JSONfile){
		for(var key in JSONfile){
			playerNames.push(key);
			localStorage.setItem(key , JSON.stringify(JSONfile[key]));
		}
		localStorage.setItem("playerName" , JSON.stringify(playerNames));
	}
	else{
		playerNames = JSON.parse(localStorage.getItem("playerName"));
	}
})();
// (function creatJSONfileForDownload(){
// 	var JSONfile = {};
// 	for (var i = 0; i < playerNames.length; i++) {
// 		var player = JSON.parse(localStorage.getItem(playerNames[i]));
// 		JSONfile[playerNames[i]] = player;
// 	}
// 	var json = JSON.stringify(JSONfile);
// 	var blob = new Blob([json], {type: "application/json"});
// 	var url  = URL.createObjectURL(blob);

// 	var a = document.createElement('a');
// 	a.download    = "backup.json";
// 	a.href        = url;
// 	a.textContent = "Download backup";

// 	document.getElementById('content').appendChild(a);
// })();
window.onload = function() {
	(function(){

		//creating input field for new player
		// $("#content").append("<h2>Creating New Character</h2>"+
		// 	"<input placeholder='Character Name' id='characterName'></input>"+
		// 	"<input placeholder='Gold' id='gold'></input>");
		// $("#content").append("<button class='btn btn-success' id='newPlayer'>New Character</button>");
		//$("#content").append("<br><input placeholder='Delete Character' id='deletePlayer'></input><button class='btn btn-danger' id='delete'>Delete Character</button>");
		$("#content").append("<br><a target='_blank' href='https://drive.google.com/open?id=0B5FT30-zbj8KdnQwSG9DOE90MW8' ><strong> link to Order</strong></a>");
		$("#content").append("<br>Доставка:<input id='transport' value='20' disabled>&euro;</input>");
		$("#content").append("<br>Общо:<input id='end' value='"+moneyTakenFromCardBGN+" BGN'  disabled></input>");
		$("#content").append("<br>Други:<input id='other' value='"+other+" BGN'  disabled></input>");
		$("#content").append("<button class='btn btn-success' id='convert'>Convert To BGN/EUR</button>");
		$("#convert").click(function(){
			if(euro) euro = false;
			else euro = true;
			addPlayers($("#content"));
		});
		deletePlayer();
		newPlayer();
		addPlayers($("#content"));
	})();
};
function convert(sum,toEuro){
	if(toEuro)return  Math.abs(sum).toFixed(2);
	else return +(+sum * EUR).toFixed(2);
	
}
function addPlayers(body){
	if($(".fullHouse")) $(".fullHouse").remove();
	body.after("<div class='fullHouse'></div>");
	for (var i = 0; i < playerNames.length; i++) {
		var player = JSON.parse(localStorage.getItem(playerNames[i]));
		$(".fullHouse").append("<table class="+player.name+"><tr><th>"+player.name+"</th><td id='gold'>"+convert(player.gold,euro)+"</td></tr></table>");
		// Enable Adding new items
		//$("."+player.name+" tr th").click(addItem);
		if(player.items)
			for(var key in player.items){
				// Add this to "td" RemoveItems : onclick='removeItem(this)'
				$("."+player.name).append("<tr><td >"+player.items[key][0]+"</td><td>"+convert(player.items[key][1],euro)+"</td></tr>");				
			}
		console.log(JSON.parse(localStorage.getItem(""+playerNames[i])));
		body.append();
		allSum+=convert(player.gold);
	}
	console.log(allSum);//TODO
	
}
function addItem(){
	var name = this.childNodes[0].nodeValue;
	var product = "";
	for(var i = 0;i<2;i++){
		bootbox.prompt({
		  title: i===0?"Cost":"Add Item",
		  callback: function(result) {
		    if (result === null) {
		      	return;
		    } else {
		    	var player = JSON.parse(localStorage.getItem(name));
		    	if(/Add/.test(this[0].innerText)){
		    		player.items[result] = [];
		    		product = result;
		    		$("."+name).append("<tr><td onclick='removeItem(this)'>"+result+"</td></tr>");
		    	}else{
		    		updateGold(name,result,true);
		    		player.gold=+player.gold +(+result);
		    		$("."+name+" tbody tr:last-child").append("<td>"+result+"</td>");
		    	}
		      			      	
		      	player.items[product].push(result);
		     	localStorage.setItem(name , JSON.stringify(player));
		    }
		  }
		});
	}
	
}
function updateGold(name,sum,add){
	if(!name || !sum) return console.log("Error with sum");//TODO
	
	var endGold = $("."+name+" #gold")[0].innerHTML;
	if(add){
		endGold = +sum +(+endGold);
	}
	else{
		endGold = +endGold -(+sum) ;
	}
	$("."+name+" #gold")[0].innerHTML = endGold.toFixed(2);
}
function removeItem(that){
	var name = that.offsetParent.className;
	var product = that.innerText;

	var player = JSON.parse(localStorage.getItem(name));
	player.gold=+player.gold -(+player.items[product][1]);
	delete player.items[product];
	localStorage.setItem(name , JSON.stringify(player));

	updateGold(name,that.parentElement.childNodes[1].innerText,false);

	$(that.parentNode).remove();
}
//delete player from local storage
function deletePlayer(){

	$("#delete").click(function(){
		var character = $("#deletePlayer").val();
		for (var i = 0; i < playerNames.length; i++) {
			if(playerNames[i] == character){
				updateTransportGold(false);
				playerNames.splice(i,1);
				localStorage.setItem("playerName", JSON.stringify(playerNames));
				localStorage.removeItem(character);
				$("#deletePlayer").val("");
				addPlayers($("#content"));
				break;
			}
		};
	});
}
//create and save players to local storage
function newPlayer(){
	$("#newPlayer").click(function(){
		var character = $("#characterName").val();
		var gold = $("#gold").val();
		if(character !==""){
			if(gold =="")
				gold = 0;
			alert("You just made :"+ character);
			var thisPlayer = {name:character,gold:gold,items:{}};
			playerNames.push(character);
			localStorage.setItem("playerName", JSON.stringify(playerNames));
			localStorage.setItem(character , JSON.stringify(thisPlayer));
			$("#gold, #characterName").val("");
			console.log(thisPlayer);
			updateTransportGold(true);
			addPlayers($("#content"));
		}
	});
}
function updateTransportGold(addPlayer){
	var transport = $("#transport").val();
	var oldSum = +transport / (playerNames.length-1);
	var newSum = +transport / playerNames.length;
	for(var i = 0;i<playerNames.length;i++){
		var player = JSON.parse(localStorage.getItem(playerNames[i]));
		if(addPlayer){
			if(i ==playerNames.length-1)player.gold =+player.gold +newSum;
			else player.gold =(player.gold -oldSum) +newSum;
		}
		else{
			player.gold =(player.gold -newSum) +oldSum;
		}
		
		localStorage.setItem(playerNames[i] , JSON.stringify(player));
	}
}