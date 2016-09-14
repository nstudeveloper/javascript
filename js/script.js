// var Vehicle = {
// 	constructor: function function_name(speed, capacity) {
// 		this.speed = speed;
// 		this.capacity = capacity;
// 		return this;
// 	}
// };

// var Automobile = Object.create(Vehicle);
// Automobile.constructor = function function_name(speed, capacity, type) {
// 	Vehicle.constructor.apply(this, arguments);
// 	this.type = type;
// 	return this;
// }


// var Aircraft = Object.create(Vehicle);
// Aircraft.constructor = function function_name(speed, capacity, wingspan) {
// 	Vehicle.constructor.apply(this, arguments);
// 	this.wingspan = wingspan;
// 	return this;
// }


// var car = Object.create(Automobile).constructor(60, 450, 'Sedan');
// var ac  = Object.create(Aircraft).constructor(60, 450, 20);

var Vehicle = function(name, speed, capacity) {
	this.name = name;
	this.speed = speed;
	this.capacity = capacity;
}

var Automobile = function(name, speed, capacity, body) {
	Vehicle.apply(this, arguments);
	this.body = body;
}

var Aircraft = function(name, speed, capacity, wingspan) {
	Vehicle.apply(this, arguments);
	this.wingspan = wingspan;
}

var Boat = function(name, speed, capacity, maxpower) {
	Vehicle.apply(this, arguments);
	this.maxpower = maxpower;
}



var getJSON = function(url, callback) {
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


var url = 'http://site.com/json.json';

getJSON(url, function(err, data) {
	if (err != null) {
		alert("Something went wrong: " + err);
	} else {
		typeHandler(data);
	}
});

function typeHandler(data) {
	data.forEach(function(vehicle) {
		var type = vehicle.type;
		if (type === 'auto') {
			createAuto(vehicle);
		} else if (type === 'airplane') {
			createAircraft(vehicle);
		} else if (type === 'boat') {
			createBoat(vehicle);
		}
	});
}


function createAuto(car) {
	var autoCollect = [];
	Automobile.prototype = Object.create(Vehicle.prototype);
	Automobile.prototype.constructor = Automobile;
	autoCollect.push(new Automobile(car.name, car.speed, car.capacity, car.body));
	addCarsToTable(autoCollect);
}


function createAircraft(airplance) {
	var airplaneCollect = [];
	Aircraft.prototype = Object.create(Vehicle.prototype);
	Aircraft.prototype.constructor = Aircraft;
	airplaneCollect.push(new Aircraft(airplance.name, airplance.speed, airplance.capacity, airplance.wingspan));
	addAirplanesToTable(airplaneCollect);
}

function createBoat(boat) {
	var boatCollect = [];
	Boat.prototype = Object.create(Vehicle.prototype);
	Boat.prototype.constructor = Boat;
	boatCollect.push(new Boat(boat.name, boat.speed, boat.capacity, boat.maxpower));
	addBoatsToTable(boatCollect);
}

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

function addCarsToTable(cars) {
	var table = document.getElementById('tbl_auto');

	cars.forEach(function(car) {
		addTR(car);
		tr.cells[3].appendChild(document.createTextNode(car.body));
		table.appendChild(tr);
	});
}

function addAirplanesToTable(airplanes) {
	var table = document.getElementById('tbl_air');

	airplanes.forEach(function(airplane) {
		addTR(airplane);
		tr.cells[3].appendChild(document.createTextNode(airplane.wingspan));
		table.appendChild(tr);
	});
}

function addBoatsToTable(boats) {
	var table = document.getElementById('tbl_boat');

	boats.forEach(function(boat) {
		addTR(boat);
		tr.cells[3].appendChild(document.createTextNode(boat.maxpower));
		table.appendChild(tr);
	});
}