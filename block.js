var powerMode = false;
var euro = true;

window.onload = function() {
	var storage = function(){

		var _JSONfile = {"Даката":{"name":"Даката","gold":62.72333333333335,"items":{"Salomon XR Shift Mens Trail Running Shoes":["Salomon XR Shift Mens Trail Running Shoes","30"],"Gelert Dustpan+Brush 63":["Gelert Dustpan+Brush 63","1.8"],"Gelert Camper Deluxe Self Inflating Mat":["Gelert Camper Deluxe Self Inflating Mat","18"],"Karrimor Xlite Tee Sn71 Black Large":["Karrimor Xlite Tee Sn71 Black Large","9.59"]}},"Дели":{"name":"Дели","gold":41.72333333333334,"items":{"Ocean Pacific Pacific All Over Print Beach Tunic Ladies":["Ocean Pacific Pacific All Over Print Beach Tunic Ladies","7.19"],"Miss F 7 Pk Tr Liner Ld61 Black Ladies":["Miss F 7 Pk Tr Liner Ld61 Black Ladies","3"],"Slaz 5PK Crew Sk Wb Sn63 Dark/Multi":["Slaz 5PK Crew Sk Wb Sn63 Dark/Multi","1.8"],"Miss Fiori Stripe 4Pk":["Miss Fiori Stripe 4Pk","2.4"],"Slaz Plain Polo Snr 62 Charcoal":["Slaz Plain Polo Snr 62 Charcoal","5.1"],"Slaz Plain Polo Snr 62 Yellow":["Slaz Plain Polo Snr 62 Yellow","5.1"],"Gelert Camper Full Mat 64 Blue":["Gelert Camper Full Mat 64 Blue","13.8"]}},"Сашо":{"name":"Сашо","gold":67.81333333333332,"items":{"Firetrap 3 Pack Formal Socks Mens":["Firetrap 3 Pack Formal Socks Mens","6.3"],"Airwalk Metalhead Skateboarding Shoes Mens":["Airwalk Metalhead Skateboarding Shoes Mens","16.79"],"Character Sgl Boxer Snr63 Star Wars":["Character Sgl Boxer Snr63 Star Wars","3"],"Character Sgl Boxer Snr63 Kermit":["Character Sgl Boxer Snr63 Kermit","3.6"],"No Fear Tailslide Mens Trainers":["No Fear Tailslide Mens Trainers","17.99"],"Gelert Ottawa Low Mens Walking Shoes":["Gelert Ottawa Low Mens Walking Shoes","16.8"]}},"Гу":{"name":"Гу","gold":38.12333333333334,"items":{"Karrimor Duma Trail Mens Running Shoes":["Karrimor Duma Trail Mens Running Shoes","27.59"],"Slazenger 5 Pack Trainer Socks X2":["Slazenger 5 Pack Trainer Socks X2","7.2"]}},"Мунч":{"name":"Мунч","gold":21.933333333333334,"items":{"Gelert Camper Self Inflating Mat":["Gelert Camper Self Inflating Mat","13.8"],"SoulCal Web Stripe Mens Belt":["SoulCal Web Stripe Mens Belt","4.8"]}},"Митко":{"name":"Митко","gold":30.923333333333336,"items":{"Lee Cooper Crafted Joggers Mens":["Lee Cooper Crafted Joggers Mens","5.99"],"Adidas Volzo Short SnC99 White/Night":["Adidas Volzo Short SnC99 White/Night","7.2"],"UEFA Germany CoreTee Sn63 White":["UEFA Germany CoreTee Sn63 White","4.8"],"Adidas Santos Sock 00 White/Black":["Adidas Santos Sock 00 White/Black","4.8"],"Adidas Santos Sock 00 Black/White M":["Adidas Santos Sock 00 Black/White M","4.8"]}}};
		var _playerNames = [];
		var linkToBlank = "https://drive.google.com/open?id=0B5FT30-zbj8KdnQwSG9DOE90MW8";

		function getJSONfile(){
			return JSON.parse(JSON.stringify(_JSONfile));
		}
		function setJSONfile(file){
			if(file === null || typeof file !== "object") return console.log("JSON file is not the proper type:"+ file);//TODO;
			_JSONfile = file ;
		}
		function saveJSONToLocalStorage(){
			if(_JSONfile){
				for(var name in _JSONfile){
					if(_playerNames.indexOf(name) == -1){
						_playerNames.push(name);
					}
					localStorage.setItem(name , JSON.stringify(_JSONfile[name]));
				}
			}

		}
		function addPlayer(player){
			if(player === null || typeof player !=="object") return console.log("Name of the new player has to be a string");//TODO
			if(_playerNames.indexOf(player.name) == -1){
				_playerNames.push(player.name);
				_JSONfile[player.name] = player;
			}
			else
				return console.log("That name already exists");//TODO
			updatePlayersGold(true);
		}
		function removePlayer(name){
			if(name == null || typeof name !=="string") return console.log("Name of the new player has to be a string");//TODO
			if(_playerNames.indexOf(name) !== -1){
				_playerNames.splice(_playerNames.indexOf(name), 1);
				delete _JSONfile[name];
			}
			else
				return console.log("That name doesn't exists");//TODO
			updatePlayersGold();
		}
		function createJSONfileForDownload(e){
			e.preventDefault();
			var json = JSON.stringify(_JSONfile);
			var blob = new Blob([json], {type: "application/json"});
			var url  = URL.createObjectURL(blob);
			var a = document.createElement("a");
			var event = new Event('click');  
		    a.download ="backup.json";
		    a.href = url;    
			a.dispatchEvent(event);
		}
		function getPlayersNames(){
			return _playerNames.slice();
		}
		function updatePlayersGold(addPlayer){
			var transport = playerCreatorAndMoney.transport();
			var oldSum = transport / (_playerNames.length-1);
			var newSum = transport / _playerNames.length;
			for(var i = 0;i<_playerNames.length;i++){
				var player = _JSONfile[_playerNames[i]];
				if(addPlayer){
					if(i ==_playerNames.length-1)player.gold =+player.gold +newSum;
					else player.gold =(player.gold -oldSum) +newSum;
				}
				else{
					player.gold =(player.gold -newSum) +oldSum;
				}
			}
			saveJSONToLocalStorage();
		}
		function init(){
			saveJSONToLocalStorage();
			if(powerMode){
				var a = $("<div>").attr("download","backup.json").text("Download JSON").css("cursor","pointer").click(createJSONfileForDownload);	
				$('#content').append(a);
			}		
			$("#content").append("<a target='_blank' href="+linkToBlank+" ><b> link to Order</b></a>");
		}

		init();
		return {
			getJSON:getJSONfile,
			setJSON:setJSONfile,
			getPlayers:getPlayersNames,
			addPlayer:addPlayer,
			removePlayer:removePlayer,
			saveToLocal:saveJSONToLocalStorage,
		};
	}();

	var playerCreatorAndMoney = function playerCreatorAndMoney(){
		
		var transportationCharges = 20;
		var moneyTakenFromCardBGN = 523.35;
		var other = 8;
		function getTransportCharges(){
			return transportationCharges;
		}
		(function init(){
			if(powerMode){
				$("#content").append("<h2>Creating New Character</h2>"+
					"<input placeholder='Character Name' id='characterName'></input>"+
					"<input placeholder='Gold' id='gold'></input>");
				$("#content").append("<button class='btn btn-success' id='newPlayer'>New Character</button>");
				$("#content").append("<br><input placeholder='Delete Character' id='deletePlayer'>"+
					"</input><button class='btn btn-danger' id='delete'>Delete Character</button>");
			}
			$("#content").append("<br><div class='text'>Доставка:</div><input value="+transportationCharges+" disabled>&euro;</input>");
			$("#content").append("<br><div class='text'>Общо:</div><input id='end' value='"+moneyTakenFromCardBGN+" BGN'  disabled></input>");
			$("#content").append("<br><div class='text'>Други:</div><input id='other' value='"+other+" BGN'  disabled></input>");
			$("#content").append("<br><button class='btn btn-success' id='convert'>Convert To BGN</button>");
			$("#convert").click(function(){
				if(euro){
					euro = false;
					$(this).text("Convert To EUR");
				} 
				else {
					euro = true;
					$(this).text("Convert To BGN");
				}
				playerTable.addPlayers();
			});
		}());
		return{
			transport:getTransportCharges
		};
	}();
	var convertGold = function(){
		var EUR = 1.98;
		return function convertGold(sum,toEuro){
			if(toEuro)return  Math.abs(sum).toFixed(2);
			else return +(+sum * EUR).toFixed(2);
		
		};
	}();

	var playerTable =  function playerTable(){
		var body;
		function deletePlayer(){
			$("#delete").click(function(){
				var name = $("#deletePlayer").val();
				storage.removePlayer(name);
				createPlayersTables();
				$("#deletePlayer").val("");
			});
		}
		function newPlayer(){
			$("#newPlayer").click(function(){
				var name = $("#characterName").val();
				var gold = $("#gold").val();
				if(name !==""){
					if(typeof parseInt(gold) !== "number")gold = 0;
					var character = {name:name,gold:gold,items:{}};
					storage.addPlayer(character);
					$("#gold, #characterName").val("");
					createPlayersTables();
				}
			});
		}
		function createPlayersTables(){
			var allSum = 0;
			var playersNames = storage.getPlayers();
			var JSONfile = storage.getJSON();
			if($(".fullHouse")) $(".fullHouse").remove();

			body.after("<div class='fullHouse'></div>");	
			for (var i = 0; i < playersNames.length; i++) {
				var player = JSONfile[playersNames[i]];
				$(".fullHouse").append("<table class="+player.name+"><tr><th class='name'>"+player.name+"</th><th id='gold'>"+convertGold(player.gold,euro)+"</th></tr></table>");
				if(player.items)
					for(var key in player.items)
						$("."+player.name).append("<tr><td class='item'>"+player.items[key][0]+"</td><td>"+convertGold(player.items[key][1],euro)+"</td></tr>");
				allSum+=convertGold(player.gold);
			}
			$(".name").click(addItem);
			$(".item").click(removeItem);
			console.log("Sum of all players:"+allSum);//TODO
		}
		(function init(){
			body = $("#content");
			if(powerMode){
				newPlayer();
				deletePlayer();
			}
			createPlayersTables();
		}());
		return{
			addPlayers:createPlayersTables,
		};
	}();

	function addItem(){
		if(!powerMode)return;
		var name = this.childNodes[0].nodeValue;
		var product = "";
		for(var i = 0;i<2;i++){
			bootbox.prompt({
			  title: i===0?"Cost":"Add Item",
			  callback: function(result) {
			    if (result === null) {
			      	return;
			    } else {
			    	var players = storage.getJSON();
			    	console.log(players);//TODO
			    	if(/Add/.test(this[0].innerText)){
			    		players[name].items[result] = [];
			    		product = result;
			    		$("."+name).append("<tr><td class='item'>"+result+"</td></tr>");
			    	}else{
			    		players[name].gold=+players[name].gold +(+result);
			    		$("."+name+" tbody tr:last-child").append("<td>"+result+"</td>");
			    	}
			      			      	
			      	players[name].items[product].push(result);
			      	storage.setJSON(players);
			      	playerTable.addPlayers();
			    }
			  }
			});
		}	
	}

	function removeItem(){
		if(!powerMode)return;
		var name = this.offsetParent.className;
		var product = this.innerText;

		var players = storage.getJSON();
		players[name].gold=+players[name].gold -(+players[name].items[product][1]);
		delete players[name].items[product];	
		storage.setJSON(players);
		playerTable.addPlayers();
	}
};
