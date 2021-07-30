import React,{useState} from 'react';


const TwoHeaders = ({viewSet, viewUpdate}) => {

	const onClick1 = (event) => {
		event.preventDefault();
		viewSet(true);
		viewUpdate(false);

	}

	const onClick2 = (event) => {
		event.preventDefault();
		viewSet(false);
		viewUpdate(true);
	}

	return (
		<div className="ui two item menu">
		  <a className="item" onClick = {onClick1} >Set</a>
		  <a className="item" onClick = {onClick2}>Update</a>
		</div>
	);


}

export default TwoHeaders;