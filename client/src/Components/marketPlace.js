import React from 'react';
import Link from './link';
import BackButton from './backButton'

const MarketPlace = () => {


	return (
		<div>
			<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment"> 
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
				    		Items by Owner
				    	</h3>
				  	</Link>
				</div>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/marketplace/manageOrder" className=" item">
						<h3>
				    		Manage market order
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
				<BackButton
				textBack = "Back to the menu"
				backPath = "/"
				/>
			</div>
			</div>	  	
		</div>
	) ;
}

export default MarketPlace; 