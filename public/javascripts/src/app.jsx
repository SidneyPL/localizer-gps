import React, { PropTypes, Component } from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Map from './map';
import Notifications from './notifications';
import RightNav from './right-nav';

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
			satelites: 0,
			quality: 0.00,

			openRightNav: false,
			zoom: 7
		};
	}

	componentDidMount(){
		// Services Sokcet.IO events
		this.socket = io();
		this.socket.on('connectedDevice', this._onConnectedDevice);
		this.socket.on('dataGPS', this._onUpdateDataGPS);
		this.socket.on('disconnectedDevice', this._onDisconnectedDevice)

		if(this.state.isConnectedDevice == true){
			this.setState({
				openRightNav: true
			});
		}
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}

	// start Socket.IO methods

	_onConnectedDevice = (deviceID) => {
		this.setState({
			isConnectedDevice: true,
			openRightNav: true
		});
	};

	_onUpdateDataGPS = (data) => {
		if(data!='0'){
			this.setState({
				isFixGPS: data.fixGPS,
				currentCoords: {
					lat: data.latitude,
					lng: data.longtitude
				},
				satelites: data.satelites,
				quality: data.quality,
				zoom: 18
			});			
		} else {
			this.setState({
				isFixGPS: false,
				openRightNav: true
			});
		}

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
		if(this.state.isFixGPS == true){
			this.setState({
				openRightNav: false
			});
		}
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
					zoom = {this.state.zoom}
				/>

				<RightNav 
					openRightNav = {this.state.openRightNav}
					currentCoords = {this.state.currentCoords}
					satelites = {this.state.satelites}
					quality = {this.state.quality}
					fixGPS = {this.state.isFixGPS}
				/>

			</div>
		);
	}

}

React.render( 
	<App />,
    document.getElementById('app')
);