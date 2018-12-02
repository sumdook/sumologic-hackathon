import React, {Component} from 'react';
import  { BrowserRouter, Route } from 'react-router-dom';
import { Layout , Breadcrumb, Icon } from 'antd';
import Sidebar from '../Sidebar';
import Mainarea from '../Mainarea';

import { connect } from 'react-redux';

import * as actions from '../../actions';


const { Content } = Layout;

class Window extends Component{

	renderBreadcrumb = () =>{
		console.log(this.props.path);
		return this.props.path.map(item=>{
			return(<Breadcrumb.Item href="#" onClick={()=>{this.props.goBackto(item)}}>{item}</Breadcrumb.Item> );
		});
	}



    render(){
        return(
            <Content style={{ padding: '0 50px' , height: '86vh'}}>

				<Breadcrumb style={{ margin: '20px 20px',fontSize:16, fontWeight:500 }}>
					<Breadcrumb.Item href="#" onClick={()=>{this.props.goBacktoHome()}} ><Icon type="home" style={{fontSize:20}}/></Breadcrumb.Item>
					{this.renderBreadcrumb()}
				</Breadcrumb>
				<Layout style={{ padding: '24px 0px', background: '#fff' }}>
					<Sidebar />
					<BrowserRouter>
						<div>
							<Route exact path="/" component={Mainarea} />
						</div>
					</BrowserRouter>
				</Layout>
			</Content>
        );
    }
}

function mapStateToProps({path}){
    return {path};
}

export default connect(mapStateToProps, actions)(Window);