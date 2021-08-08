import React, {useEffect} from 'react';
import TripleSearchBarMarketOrderWhitelisted from "./tripleSearchBarMarketOrderWhitelisted";
import TabUnlockedItems from "./tabUnlockedItems";
import Link from "./link"


const ManageOrderOpen = ({updateMyScreenMarketOrderWhitelisted,createMarketOrderWhitelisted, getMyItemsInOrder,setDataMyItemInOrder, dataMyItemInOrder, accounts}) => {


	useEffect(() => {

		getMyItemsInOrder();
		
	},[updateMyScreenMarketOrderWhitelisted])


	const makeOrderWhitelisted = (amount, tokenId, address) => {

		createMarketOrderWhitelisted(amount,tokenId, address);
	}
	
	return (

		<div>
			<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment">
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className ="ui header huge" style = {{paddingBottom:'40px' }}> Create order</h1>
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