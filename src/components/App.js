import React, {Component } from 'react';
import { connect } from 'react-redux';
import { Layout , Breadcrumb } from 'antd';

import Topbar from './Topbar';
import Window from './Window';

import * as actions from '../actions';

import DataSnapshot from '../data/short.json';

const { Content, Footer } = Layout;

class App extends Component{

	backFunction = (event) => {
		if(event.keyCode === 27) {
		  this.props.goBacktoHome();
		}
	  }
	
	
	componentDidMount(){
		document.addEventListener("keydown", this.backFunction, false);
		const finalStructure = {};
		const innerStructure = {
			"Game play resources": {
			  "Installation": {
					"Files": [
						{"file_name": "install.iso","type": "iso image"},
						{"file_name": "archive_unbox.dat","type": "dat file"}
					]
			  },
			  "Resource Dependency": {
					"Files": [
						{"file_name": "profile.sav","type": "sav file"},
						{"file_name": "snd0.AT3","type": "AT3 file"}
					]
			  },
			  "Files": []
			},
			"Files": []
		  }
		
		 DataSnapshot.map(result => {
			finalStructure[result.title] = innerStructure;
		});
		finalStructure["Files"] = [];
		
		if(!localStorage.getItem('data_snapshot')){
			localStorage.setItem('data_snapshot',JSON.stringify(finalStructure));
			this.props.initialHydrate(JSON.parse(localStorage.getItem('data_snapshot')));
		}
		else{
			this.props.initialHydrate(JSON.parse(localStorage.getItem('data_snapshot')));
		}	
	}

	componentWillUnmount(){
		document.removeEventListener("keydown", this.backFunction, false);
	}
	

	render(){
		return(
			<div>
				<Layout>
					<Topbar />
					<Window />
					<Footer style={{ textAlign: 'center', verticalAlign:'center' }}>
					Made with ❤️ by <a href="http://www.soumiksur.com/">Soumik Sur</a>
					</Footer>
				</Layout>
			</div>
			);
	}
}


export default connect(null,actions)(App);