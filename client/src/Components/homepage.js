import React from 'react';
import Link from "./link";

const Homepage = () => {


	return (
		<div style = {{textAlign:'center', paddingTop:'100px' }}>
			<div className="ui raised very padded text container segment"> 
				<h1 className = "ui  huge header" > POW Multiverse </h1>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/reward"  className=" item" >
						<h3>
				    		Get Your reward
				    	</h3>
				  	</Link>
				</div>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/fusion" className=" item">
						<h3>
				    		Fusion your Items
				    	</h3>
				  	</Link>
				</div>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/marketplace" className = " item">
						<h3>
				    		Market Place
				    	</h3>
				  	</Link>
				</div>
				<div className = "ui blue one item inverted menu" style = {{textAlign:'center', marginTop:'40px' }} >
					<Link href = "/tournament" className=" item" style={{fontWeight: "bold" }}>
				    	<h3>
				    		Tournament
				    	</h3>
				  	</Link>
				</div>
				<div className = "ui red one item inverted menu"  style = {{marginTop:'70px' }} >
					<Link className=" item">
						<h3>
				    		Back to POW
				    	</h3>
				  	</Link>
				</div>
			</div>
		</div>
	) ;
}

export default Homepage; 