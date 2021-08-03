import React from 'react';


const TabLockedItems = ({entryTab}) => {

	const tabRender = entryTab.map( (Tab, index) => {


		return(
			<tr key={Tab.tokenId}>
				<td> {Tab.tokenId} </td>
				<td>{Tab.name}</td>
				<td>{Tab.composition}</td>
				<td>{Tab.levelItem}</td>
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
					<th>Composition</th>
					<th>Level Item</th>
				</tr></thead>
					<tbody>
					{tabRender}
					</tbody>
			</table>
		</div>
		
	</React.Fragment>
	)
}

export default TabLockedItems;