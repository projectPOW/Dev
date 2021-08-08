import React, {useEffect} from 'react';
import Link from "./link";


const Homepage = ({accounts, admin,UpdateETHAccount}) => {

	useEffect(() => {

		UpdateETHAccount();

	},[])
		

	const superUserEnable = admin != accounts ? " " : "item"; 

	const SuperUser = () => {
		
		if (admin == accounts){

			return(
				<Link href = "/admin"  className={`${superUserEnable}`}>
			    	Admin
		  		</Link>
			);
		}
	}

	return (
		<div style = {{textAlign:'center', paddingTop:'100px'}}>
			<div className="ui raised very padded text container segment stretched" >
				<div className="ui green mini compact message " style = {{fontSize : "10px", color : "black"}} >
				  <p>Current address :{accounts}</p>
				</div>
				<h1 className = "ui  huge header" style = {{paddingBottom : "40px" }} > POW Multiverse </h1>
				<div className="ui tabular menu">
				  <a className="active item">
				    Player
				  </a>
				  {SuperUser()}
				</div>
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