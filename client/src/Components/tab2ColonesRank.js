import React from 'react';


const Tab2ColonesRank = ({entryTab}) => {

	const tabRender = entryTab.map( (Tab, index) => {


		return(
			<tr key={index}>
				<td> {index +1} </td>
				<td>{Tab}</td>
			</tr>
			)
		})

return (
	<React.Fragment>
		<div>
			<table className = "ui celled table">
				<thead>
					<tr><th>Rank</th>
					<th>Address</th>
				</tr></thead>
					<tbody>
					{tabRender}
					</tbody>
			</table>
		</div>
		
	</React.Fragment>
	)
}

export default Tab2ColonesRank;