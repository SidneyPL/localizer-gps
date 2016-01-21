import React, { PropTypes, Component } from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class RightNav extends Component {

	static propTypes = {
		openRightNav: PropTypes.bool,
		fixGPS: PropTypes.bool,
		currentCoords: PropTypes.any,
		satelites: PropTypes.number,
		quality: PropTypes.number
	};

	static defaultProps = {
		openRightNav: false,
		fixGPS: false,
		currentCoords: {
			lat: 0.0,
			lng: 0.0
    	},
    	satelites: 0,
    	quality: 0.00
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	constructor(props){
		super(props);
	}

	render(){

		return(
				<LeftNav 
					width = {200} 
					openRight = {true} 
					open = {this.props.openRightNav}
				>

					<List subheader = 'Aktualne informacje'>

					{function(){
						if(this.props.fixGPS == true){
						 	return(
						 		<div>
								<ListItem 
									primaryText = 'Lokalizacja GPS'
									secondaryText = 'Ustalona'
								/>

								<ListItem 
									primaryText = 'Latitude'
									secondaryText = {this.props.currentCoords.lat}
								/>

								<ListItem 
									primaryText = 'Longtitude'
									secondaryText = {this.props.currentCoords.lng}
								/>

								<ListItem 
									primaryText = 'Satelity'
									secondaryText = {this.props.satelites}
								/>

								<ListItem 
									primaryText = 'Dokładność'
									secondaryText = {this.props.quality}
								/>
								</div>
						 	);
						} else {
							return(
								<ListItem 
									primaryText = 'Lokalizacja GPS'
									secondaryText = 'Nieustalona'
								/>
							);
						}						
					}.call(this)}
						
					</List>

				</LeftNav>
		);
	}
}
