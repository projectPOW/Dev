import React from 'react';


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
		<div className="ui tabular menu">
		  <button className="item" onClick = {onClick1} >Set</button>
		  <button className="item" onClick = {onClick2}>Update</button>
		</div>
	);


}

export default TwoHeaders;