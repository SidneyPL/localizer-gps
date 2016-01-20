import React, {Component, PropTypes} from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {containerStyle, refreshStyle, hideStyle} from './waiting-progress-styles';

import RefreshIndicator from 'material-ui/lib/refresh-indicator';

export default class WaitingProgress extends Component {

	static propTypes = {
		hide: PropTypes.bool,
		text: PropTypes.string
	};

	static defaultProps = {
		hide: false,
		text: ' '
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	constructor(props){
		super(props);
	}

	render() {
		return(
			<div style={this.props.hide ? hideStyle : containerStyle}>
				<RefreshIndicator 
					size={60}
					left={-30}
					top={-10}
					status="loading"
					style={refreshStyle}				
				/>
				{this.props.text}
			</div>
		);
	}

}