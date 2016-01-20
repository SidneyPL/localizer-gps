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
	if(rawData.toString() == '0'){ // no fix GPS
		currentDataGPS.fixGPS = false;
	} else { // GPS is fix
		var splitData = rawData.toString().split(";");
		currentDataGPS = {
			fixGPS: true,
			latitude: splitData[0],
			longtitude: splitData[1],
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
    	console.log('LocalizerGPS send data: ', data);

    	parseRawDataGPS(data);
    	var result = 'Lat: '+currentDataGPS.latitude+' Lng: '+currentDataGPS.longtitude+' Satelites: '+currentDataGPS.quality;
    	io.emit('dataGPS', result);
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