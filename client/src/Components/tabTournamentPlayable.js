import React from 'react';


const TabTournamentPlayable = ({entryTab}) => {

	const tabRender = entryTab.map( (Tab, index) => {


		return(
			<tr key={Tab.idTournament}>
				<td> {Tab.idTournament} </td>
				<td>{Tab.subjectTournament}</td>
				<td>{Tab.stakeRequested} POW </td>
				<td>{Tab.rewardTournament} POW </td>
				<td>{Tab.timeLeft} Days </td>
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
					<th>Reward</th>
					<th>Days before end</th>

				</tr></thead>
					<tbody>
					{tabRender}
					</tbody>
			</table>
		</div>
		
	</React.Fragment>
	)
}

export default TabTournamentPlayable;