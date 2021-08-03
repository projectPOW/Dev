import React, {useEffect} from 'react';
import TripleSearchBarMarketOrderWhitelisted from "./tripleSearchBarMarketOrderWhitelisted";
import TabUnlockedItems from "./tabUnlockedItems";
import Link from "./link"


const ManageOrderOpen = ({createMarketOrderWhitelisted, getMyItemsInOrder,setDataMyItemInOrder, dataMyItemInOrder}) => {


	useEffect(() => {

		getMyItemsInOrder();
		
	},[])


	const makeOrderWhitelisted = (amount, tokenId, address) => {

		createMarketOrderWhitelisted(amount,tokenId, address);
	}
	
	return (

		<div>
			<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment">
				<div className="ui tabular menu">
				  <Link href = "/marketplace/manageOrder" className="item">
				    Create Order Open
				  </Link>
				  <Link href = "/marketplace/manageOrderWhitelisted" className=" active item">
				    Create Order Indexed
				  </Link>
				  <Link href = "/marketplace/deleteOrder"  className="  item">
				    Cancel Order
				  </Link>
				</div>
				<div style = {{ paddingTop:'30px' }}>
					<TripleSearchBarMarketOrderWhitelisted 
					title1 = "Price sold"
					holder1 = "Enter a price in ETH"
					title2 = "Id Token"
					holder2 = "Enter the Id of the token Sold"
					title3 = "Whitelisted Address"
					holder3 = "0x4b45..."
					functionToCall = {makeOrderWhitelisted}
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

export default ManageOrderOpen;