import React from 'react';


const TabTournamentWithdraw = ({entryTab}) => {

	const tabRender = entryTab.map( (Tab, index) => {


		return(
			<tr key={Tab.idTournament}>
				<td> {Tab.idTournament} </td>
				<td>{Tab.subjectTournament}</td>
				<td>{Tab.rewardTournament} POW </td>
				<td>{Tab.winner}</td>
			</tr>
			)
		})

return (
	<React.Fragment>
		<div>
			<table className = "ui celled table" style = {{textAlign : 'center'}}>
				<thead>
					<tr><th>Tournament Id</th>
					<th>Theme</th>
					<th>Reward</th>
					<th>Winner</th>

				</tr></thead>
					<tbody>
					{tabRender}
					</tbody>
			</table>
		</div>
		
	</React.Fragment>
	)
}

export default TabTournamentWithdraw;