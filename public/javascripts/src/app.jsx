import React, { PropTypes, Component } from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Map from './map';
import LeftNav from 'material-ui/lib/left-nav';
import Notifications from './notifications';

injectTapEventPlugin();

class App extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	constructor(props){
		super(props);
		this.state = {
			isConnectedDevice: false,
			isFixGPS: false,
			currentCoords: {
				lat: 52.353948,
				lng: 19.170566
			},
			openRightNav: false
		};
	}

	componentDidMount(){
		// Services Sokcet.IO events
		this.socket = io();
		this.socket.on('connectedDevice', this._onConnectedDevice);
		this.socket.on('dataGPS', this._onUpdateDataGPS);
		this.socket.on('disconnectedDevice', this._onDisconnectedDevice)
		this.socket.on('test', function(data){
			alert(data);
		});
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}

	// start Socket.IO methods

	_onConnectedDevice = (deviceID) => {
		this.setState({
			isConnectedDevice: true
		});
	};

	_onUpdateDataGPS = (data) => {
		alert(data);
		this.setState({
			isFixGPS: true,
			currentCoords: {
				lat: data.lat,
				lng: data.lng
			}
		});
	};

	_onDisconnectedDevice = (deviceID) => {
		this.setState({
			isFixGPS: false,
			isConnectedDevice: false
		});
	};


	/// end Socket.IO methods

	// start actions on map methods

	_onMapClick = () => {
		this.setState({
			openRightNav: false
		});
	};

	// end actions on map methods

	_onPointerClick = (key, props) => {
		this.setState({
			openRightNav: true
		});
	};

	render(){
		return(
			<div>

				<Notifications 
					isConnectedDevice = {this.state.isConnectedDevice}
					isFixGPS = {this.state.isFixGPS}
				/>

				<Map 
					isFixGPS = {this.state.isFixGPS} 
					pointerCoords = {this.state.currentCoords}
					onMapClick = {this._onMapClick}
					onPointerClick = {this._onPointerClick}
				/>

				<LeftNav 
					width = {200} 
					openRight = {true} 
					open = {this.state.openRightNav}
				/>

			</div>
		);
	}

}

React.render( 
	<App />,
    document.getElementById('app')
);