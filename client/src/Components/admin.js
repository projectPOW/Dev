import React from 'react';
import Link from './link';
import BackButton from './backButton'



const Admin = () => {

	return (
		<div>
			<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment"> 
				<h1 className = "ui  huge header" > Admin screen </h1>
				<div className="ui tabular menu">
				  <Link href = "/" className="item">
				    Player
				  </Link>
				  <Link href = "/admin"  className=" active item">
				    Admin
				  </Link>
				</div>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/admin/factory"  className=" item" >
						<h3>
				    		The Factory
				    	</h3>
				  	</Link>
				</div>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/admin/unlock" className=" item">
						<h3>
				    		Unlock/Lock items - Set Reward level
				    	</h3>
				  	</Link>
				</div>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/admin/setUpdate" className=" item">
						<h3>
				    		Set-UpdatePlayer
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
	);
}

export default Admin