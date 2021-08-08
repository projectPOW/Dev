import React from 'react';


const TabTournamentWaitingWinner = ({entryTab}) => {

	const tabRender = entryTab.map( (Tab, index) => {


		return(
			<tr key={Tab.idTournament}>
				<td> {Tab.idTournament} </td>
				<td>{Tab.subjectTournament}</td>
				<td>{Tab.stakeRequested}</td>
				<td>{Tab.timeLeft}</td>
				<td>{Tab.state}</td>
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
					<th>Stake requested</th>
					<th>Days before end</th>
					<th>State</th>

				</tr></thead>
					<tbody>
					{tabRender}
					</tbody>
			</table>
		</div>
		
	</React.Fragment>
	)
}

export default TabTournamentWaitingWinner;