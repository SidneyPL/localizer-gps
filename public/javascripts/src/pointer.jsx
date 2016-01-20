import React, { PropTypes, Component } from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {pointerStyle} from './pointer-styles'

export default class Pointer extends Component {

	static propTypes = {
		show: PropTypes.bool
	};

	static defaultProps = {
		show: false
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	constructor(props){
		super(props);
		this.state = {
			show: props.show
		}
	}

	render(){
		return(
			<div 
				style={pointerStyle}
				className={this.props.show ? '' : 'hide'} 
			/>
		);
	}
}

