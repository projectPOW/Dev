import React, {useEffect} from 'react';
import Link from './link';
import SimpleSearchBarMarketBuyOrder from './simpleSearchBarMarketBuyOrder';
import TabOrderOn from './tabOrderOn';


const BuyOrder = ({ updateScreenMarketOrder,UpdateETHAccount,currentMarketOrders,getOrder,setCurrentMarketOrders, updateTabOrder, accounts, setTabOrder}) => {

	useEffect(() => {

		updateTabOrder();
		
		

	},[updateScreenMarketOrder])

	const requestUpdadte = () =>{
		UpdateETHAccount();
		updateTabOrder();
	}

	

	return (

		<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment">
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className ="ui header huge" style = {{paddingBottom:'40px' }}> Buy Open order</h1>
				<div className="ui tabular menu">
				  <Link href = "/marketplace/buyOrder" className="active item">
				    Open Market
				  </Link>
				  <Link href = "/marketplace/buyOrderWhitelisted" className=" item">
				    Whitelisted Market
				  </Link>
				</div>
				<div style = {{ paddingTop:'30px' }}>
					<SimpleSearchBarMarketBuyOrder
					title1 = "Id Order to buy"
					holder1 = "Id Token"
					textButton1 = "Buy"
					textButton2 = "Back"
					functionToCall = {getOrder}
					functionToCall2 = {setTabOrder}
					functionToCall3 = {requestUpdadte}
					textButton3 = "Update list"
					/>
					<div style = {{ paddingTop:'30px' }}>
						<h2 style = {{textAlign:'left'}}>Open Orders</h2>
						<TabOrderOn
						entryTab ={currentMarketOrders}
						/>	
					</div>
				</div>
			</div>
		</div>

	);
}

export default BuyOrder;