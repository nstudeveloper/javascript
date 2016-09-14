// Base class for vehicles
var Vehicle = function(type, name, speed, capacity) {
	this.type = type;
	this.name = name;
	this.speed = speed;
	this.capacity = capacity;
};

var Automobile = function(type, name, speed, capacity, body) {
	Vehicle.apply(this, arguments);
	this.body = body;
};

var Airplane = function(type, name, speed, capacity, wingspan) {
	Vehicle.apply(this, arguments);
	this.wingspan = wingspan;
};

var Boat = function(type, name, speed, capacity, maxpower) {
	Vehicle.apply(this, arguments);
	this.maxpower = maxpower;
};

// Class for parse JSON response and manipulate other classes
var Handler = function(url) {
	this.url = url;
	vCollection = new vehicleCollection();
	tblCreator = new tableCreator();

	this.run = function() {
		getJSON(url, function(err, data) {
			if (err != null) {
				alert("Something went wrong: " + err);
			} else {
				typeHandler(data);
			}
		});
	};

	// Method for receive JSON from url
	function getJSON(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open("get", url, true);
		xhr.responseType = "json";
		xhr.onload = function() {
			var status = xhr.status;
			if (status == 200) {
				callback(null, xhr.response);
			} else {
				callback(status);
			}
		};
		xhr.send();
	};

	// Method for decide which class need to create and add to collection
	function typeHandler(data) {
		data.forEach(function(vehicle) {
			var type = vehicle.type;
			if (type === 'auto') {
				auto = new Automobile(vehicle.type, vehicle.name, vehicle.speed, vehicle.capacity, vehicle.body);
				vCollection.setAuto(auto);

			} else if (type === 'airplane') {
				airplane = new Airplane(vehicle.type, vehicle.name, vehicle.speed, vehicle.capacity, vehicle.wingspan);
				vCollection.setAirplane(airplane);
			} else if (type === 'boat') {
				boat = new Boat(vehicle.type, vehicle.name, vehicle.speed, vehicle.capacity, vehicle.maxpower);
				vCollection.setBoat(boat);
			}
		});
		addVehiclesToTable();
	}

	function addVehiclesToTable() {
		tblCreator.addCarsToTable(vCollection.getAutos());
		tblCreator.addAirplainesToTable(vCollection.getAirplaines());
		tblCreator.addBoatsToTable(vCollection.getBoats());
	}
};

// Class collect vehicle objects
var vehicleCollection = function() {
	this.autoCollect = [];
	this.airplaneCollect = [];
	this.boatCollect = [];

	this.getAutos = function() {
		return this.autoCollect;
	}
	this.setAuto = function(auto) {
		this.autoCollect.push(auto);
	}

	this.getAirplaines = function() {
		return this.airplaneCollect;
	}
	this.setAirplane = function(Airplane) {
		this.airplaneCollect.push(Airplane);
	}

	this.getBoats = function() {
		return this.boatCollect;
	}
	this.setBoat = function(boat) {
		this.boatCollect.push(boat);
	}
};

// Class for creating row from objects
var tableCreator = function() {
	function addTR(vehicle) {
		tr = document.createElement('tr');
		tr.appendChild(document.createElement('td'));
		tr.appendChild(document.createElement('td'));
		tr.appendChild(document.createElement('td'));
		tr.appendChild(document.createElement('td'));
		tr.cells[0].appendChild(document.createTextNode(vehicle.name))
		tr.cells[1].appendChild(document.createTextNode(vehicle.speed));
		tr.cells[2].appendChild(document.createTextNode(vehicle.capacity))
	}

	this.addCarsToTable = function(cars) {
		var table = document.getElementById('tbl_auto');
		cars.forEach(function(car) {
			addTR(car);
			tr.cells[3].appendChild(document.createTextNode(car.body));
			table.appendChild(tr);
		});
	}

	this.addAirplainesToTable = function(airplanes) {
		var table = document.getElementById('tbl_air');
		airplanes.forEach(function(airplane) {
			addTR(airplane);
			tr.cells[3].appendChild(document.createTextNode(airplane.wingspan));
			table.appendChild(tr);
		});
	}

	this.addBoatsToTable = function(boats) {
		var table = document.getElementById('tbl_boat');
		boats.forEach(function(boat) {
			addTR(boat);
			tr.cells[3].appendChild(document.createTextNode(boat.maxpower));
			table.appendChild(tr);
		});
	}
};

url = 'http://site.com/json.json';
handler = new Handler(url);
handler.run();