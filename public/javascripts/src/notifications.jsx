import React, {Component, PropTypes} from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {snackbarStyle} from './notifications-styles';

import WaitingProgress from './waiting-progress';
import Snackbar from 'material-ui/lib/snackbar';

export default class Notifications extends Component {

	static propTypes = {
		isConnectedDevice: PropTypes.bool,
		isFixGPS: PropTypes.bool
	};

	static defaultProps = {
		isConnectedDevice: false,
		isFixGPS: false
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	constructor(props){
		super(props);
	}

	render() {
		return(
			<div>

				<WaitingProgress 
					hide = {this.props.isFixGPS}
					text = "Oczekiwanie na moduł GPS"
				/>

				<Snackbar 
					open = {this.props.isConnectedDevice}
					message = 'Połączono z modułem GPS'
					autoHideDuration = {1000}
					bodyStyle = {snackbarStyle}
				/>

				<Snackbar 
					open = {this.props.isFixGPS}
					message = 'Lokalizacja GPS została określona'
					autoHideDuration = {1000}
					bodyStyle = {snackbarStyle}
				/>

			</div>
		);
	}

}