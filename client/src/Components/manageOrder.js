import React, {useEffect} from 'react';
import DoubleSearchBarMarketOrder from "./doubleSearchBarMarketOrder";
import TabUnlockedItems from "./tabUnlockedItems";
import Link from "./link"


const ManageOrder = ({createMarketOrder, getMyItemsInOrder,setDataMyItemInOrder, dataMyItemInOrder}) => {


	useEffect(() => {

		getMyItemsInOrder();
		
	},[])


	const makeOrder = (amount, tokenId) => {

		createMarketOrder(amount,tokenId);
	}
	
	return (

		<div>
			<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment">
				<div className="ui tabular menu">
				  <Link href = "/marketplace/manageOrder" className="active item">
				    Create Order Open
				  </Link>
				  <Link href = "/marketplace/manageOrderWhitelisted" className="item">
				    Create Order Indexed
				  </Link>
				  <Link href = "/marketplace/deleteOrder"  className="  item">
				    Cancel Order
				  </Link>
				</div>
				<div style = {{ paddingTop:'30px' }}>
					<DoubleSearchBarMarketOrder 
					title1 = "Price sold"
					holder1 = "Enter a price in ETH"
					title2 = "Id Token"
					holder2 = "Enter the Id of the token Sold"
					functionToCall = {makeOrder}
					functionToCall2 = {setDataMyItemInOrder} 
					/>
					<div style = {{ paddingTop:'30px' }}>
						<h2 style = {{textAlign:'left'}}>My Items</h2>
						<TabUnlockedItems
						entryTab ={dataMyItemInOrder}
						/>
					</div>
				</div>
			</div> 
			</div>
		</div>
	);
}

export default ManageOrder;