import React from 'react';


const TabOrderOn = ({entryTab}) => {

	const tabRender = entryTab.map( (Tab, index) => {

		
		return(
			<tr key={Tab.idItem}>
				<td> {Tab.idItem} </td>
				<td> {Tab.name} </td>
				<td>{Tab.priceRequested} ETH</td>
				<td>{Tab.level}</td>
			</tr>
			)
		})

return (
	<React.Fragment>
		<div>
			<table className = "ui celled table">
				<thead>
					<tr><th>Id Token</th>
					<th>Name</th>
					<th>Price</th>
					<th>Level</th>
				</tr></thead>
					<tbody>
					{tabRender}
					</tbody>
			</table>
		</div>
		
	</React.Fragment>
	)
}

export default TabOrderOn;