import React from 'react';
import Link from './link';
import BackButton from './backButton'

const MarketPlace = ({accounts}) => {


	return (
		<div>
			<div style = {{textAlign:'center', paddingTop:'100px', paddingBottom:'100px' }}>
			<div className="ui raised very padded text container segment">
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black", position : "center"}} >
				  <p>Current address :{accounts}</p>
				</div> 
				<h1 className = "ui  huge header" > Market place </h1>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/marketplace/viewRank"  className=" item" >
						<h3>
				    		Rank By continent
				    	</h3>
				  	</Link>
				</div>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/marketplace/viewOwner" className=" item">
						<h3>
				    		View Map Player
				    	</h3>
				  	</Link>
				</div>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/marketplace/manageOrder" className=" item">
						<h3>
				    		Create/Cancel order
				    	</h3>
				  	</Link>
				</div>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/marketplace/buyOrder" className=" item">
						<h3>
				    		Buy Order
				    	</h3>
				  	</Link>
				</div>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/marketplace/getbalance" className=" item">
						<h3>
				    		Withdraw Money
				    	</h3>
				  	</Link>
				</div>
				<div style = {{marginTop:'60px' }}>
					<BackButton
					textBack = "Back to the menu"
					backPath = "/"
					/>
				</div>
			</div>
			</div>	  	
		</div>
	) ;
}

export default MarketPlace; 