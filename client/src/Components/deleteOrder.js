import React, {useEffect} from 'react';
import Link from './link';
import SimpleSearchBarMarketOrderCancel from './simpleSearchBarMarketOrderCancel';
import TabUnlockedItems from "./tabUnlockedItems";


const DeleteOrder = ({updateCancelScreen,cancelOrder,getMyItemsInCurrentOrder, setDataMyItemInCurrentOrder, dataMyItemInCurrentOrder,accounts }) => {
	
	useEffect(() => {

		getMyItemsInCurrentOrder();
		
	},[updateCancelScreen])

	const onClick = (tokenId) => {

		cancelOrder(tokenId);

	}

	const cleanFunction = () => {

		setDataMyItemInCurrentOrder([]);
	}
	
	return (
		<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment">
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className ="ui header huge" style = {{paddingBottom:'40px' }}> Cancel Order</h1>
				<div className="ui tabular menu">
				  <Link href = "/marketplace/manageOrder" className="item">
				    Create Order Open
				  </Link>
				  <Link href = "/marketplace/manageOrderWhitelisted" className="item">
				    Create Order Indexed
				  </Link>
				  <Link href = "/marketplace/deleteOrder"  className=" active item">
				    CancelOrder
				  </Link>
				</div>
			  	<div style = {{ paddingTop:'30px' }}>
					<SimpleSearchBarMarketOrderCancel
					title1 = "Sell to cancel"
					holder1 = "Id Token"
					textButton1 = "Cancel Order"
					textButton2 = "Back"
					functionToCall = {onClick}
					functionToCall2 = {cleanFunction}
					/>
					<div style = {{ paddingTop:'30px' }}>
						<h2 style = {{textAlign:'left'}}>My Current Orders</h2>
						<TabUnlockedItems
						entryTab ={dataMyItemInCurrentOrder}
						/>	
					</div>
				</div>
			</div>
		</div>
	)

}

export default DeleteOrder;
