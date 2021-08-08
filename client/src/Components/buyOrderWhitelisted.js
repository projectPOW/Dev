import React, {useEffect} from 'react';
import Link from './link';
import SimpleSearchBarMarketBuyOrder from './simpleSearchBarMarketBuyOrder';
import TabOrderOnWhitelisted from './tabOrderOnWhitelisted';


const BuyOrderWhitelisted = ({updateScreenMarketOrderWhitelisted,UpdateETHAccount,setTabOrderWhitelisted,accounts,currentWhitelistedMarketOrders,getWhitelistedOrder,setCurrentWhitelistedMarketOrders, updateTabOrderWhitelisted}) => {

	useEffect(() => {

		updateTabOrderWhitelisted();
		
		
	},[updateScreenMarketOrderWhitelisted])

	const requestUpdadte =  () => {

		updateTabOrderWhitelisted();
	}
 	

	return (

		<div style = {{textAlign:'center', paddingTop:'100px', paddingRight:'250px', paddingLeft: '250px' }}>
			<div className="ui raised very padded text  segment">
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className ="ui header huge" style = {{paddingBottom:'40px' }}> Buy Whitelisted Order</h1>
				<div className="ui tabular menu">
				  <Link href = "/marketplace/buyOrder" className=" item">
				    Open Market
				  </Link>
				  <Link href = "/marketplace/buyOrderWhitelisted" className=" active item">
				    Whitelisted Market
				  </Link>
				</div>
				<div style = {{ paddingTop:'30px' }}>
					<SimpleSearchBarMarketBuyOrder
					title1 = "Id Order to buy"
					holder1 = "Id Token"
					textButton1 = "Buy"
					textButton2 = "Back"
					functionToCall = {getWhitelistedOrder}
					functionToCall2 = {setTabOrderWhitelisted}
					functionToCall3 = {requestUpdadte}
					textButton3 = "Update list"

					/>
					<div style = {{ paddingTop:'30px' }}>
						<h2 style = {{textAlign:'left'}}>Whitelisted Orders</h2>
						<TabOrderOnWhitelisted
						entryTab ={currentWhitelistedMarketOrders}
						/>	
					</div>
				</div>
			</div>
		</div>

	);
}

export default BuyOrderWhitelisted;