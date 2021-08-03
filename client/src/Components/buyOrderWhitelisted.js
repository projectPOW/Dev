import React, {useEffect} from 'react';
import Link from './link';
import SimpleSearchBarMarketBuyOrder from './simpleSearchBarMarketBuyOrder';
import TabOrderOnWhitelisted from './tabOrderOnWhitelisted';


const BuyOrderWhitelisted = ({currentWhitelistedMarketOrders,getWhitelistedOrder,setCurrentWhitelistedMarketOrders, updateTabOrderWhitelisted}) => {

	useEffect(() => {

		updateTabOrderWhitelisted();
		/*
		return () => {
      		updateTabOrder();
    	};*/

	},[])
	

	return (

		<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment">
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
					textButton1 = "Buy Whitelisted"
					textButton2 = "Back"
					functionToCall = {getWhitelistedOrder}
					/>
					<div style = {{ paddingTop:'30px' }}>
						<h2 style = {{textAlign:'left'}}>Open Orders</h2>
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