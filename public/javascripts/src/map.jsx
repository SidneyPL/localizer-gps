import React, { PropTypes, Component } from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import Pointer from './pointer'

export default class Map extends Component {

	static propTypes = {
		zoom: PropTypes.number,
		pointerCoords: PropTypes.any,
		isFixGPS: PropTypes.bool,
		onPointerClick: PropTypes.func
	};

	static defaultProps = {
    	zoom: 7,
    	pointerCoords: {
   			lat: 52.206076, 
   			lng: 19.434237
    	},
    	isFixGPS: false
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	constructor(props){
		super(props);
	}

	_onChildClick = (key, childProps) => {
		
	};

  	render() {
	    return (
	       <GoogleMap
		       	center={this.props.pointerCoords}
		       	defaultZoom={this.props.zoom}
		       	onChildClick={this.props.onPointerClick}
		       	onClick={this.props.onMapClick}
		    >

		       	<Pointer 
		       		{...this.props.pointerCoords} 
		       		show={this.props.isFixGPS} 
		       	/>

	       </GoogleMap>
	    );
 	}
}