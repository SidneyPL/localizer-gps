var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    net = require('net');


// Data start
var currentDataGPS = {
	connectedDevice: false,
	fixGPS: false,
	latitude: 0.00,
	longtitude: 0.00,
	satelites: 0,
	quality: 0.00
};

var parseRawDataGPS = (rawData) => {
	if(rawData == '0'){ // no fix GPS
		currentDataGPS.fixGPS = false;
	} else { // GPS is fix, example rawData: '5017.23402N;01840.5987E;07;1.19'
		var splitData = rawData.split(";");

		var latitude = splitData[0]; 
		latitude = latitude.substring(0, latitude.length - 1); // remove last char from latitude
		latitude = latitude.substring(0, 2) + '.' + latitude.substring(2, 2) + latitude.substring(5); // convert latitude to GoogleMaps format

		var longtitude = splitData[1];
		longtitude = longtitude.substring(0, longtitude.length - 1); // remove last char from longtitude
		longtitude = longtitude.substring(0, 2) + '.' + longtitude.substring(2, 2) + longtitude.substring(5); // convert longtitude to GoogleMaps format

		currentDataGPS = {
			fixGPS: true,
			latitude: latitude,
			longtitude: longtitude,
			satelites: splitData[2],
			quality: splitData[3]
		};
	}
};
// Data end

//start TCP/IP server
var serverTCP = net.createServer((socket) => {

    console.log('LocalizerGPS connected on ' + socket.remoteAddress + ':' + socket.remotePort);

    currentDataGPS.connectedDevice = true;
    io.emit('connectedDevice', 0);

    socket.on('data', (data) => {
    	console.log('LocalizerGPS send data: ', data.toString());

    	parseRawDataGPS(data.toString());

    	if(currentDataGPS.fixGPS == true){
    		io.emit('dataGPS', currentDataGPS);
    	} else {
    		io.emit('dataGPS', '0');
    	}
    	
    });

    socket.on('end', () => {
        console.log('LocalizerGPS on ' + socket.remoteAddress + ':' + socket.remotePort + ' disconnected');

        io.emit('disconnectedDevice', 0);
    });

});

serverTCP.listen(1337, ()=> {
	console.log('Server TCP LocalizerGPS listening on *:1337');
});
//end TCP/IP server


// App config start
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
// App congif end

// App router start
app.get('/live', function(req, res) {
    res.render('live', {
    	title: 'Live'
    });
});

app.get('*', function(req,res){ // Error 404 - page not found
	res.render('404', {
		title: 'Page not found'
	});
});
// App router end

// start Socket.io methods
io.on('connection', function(socket){

	/*socket.on('disconnect', function(){
		io.emit('disconnectedDevice', '0');
	})*/

});
// end Socket.io methods

http.listen(80, () => {
    console.log('WebApp LocalizerGPS listening on *:80');
});