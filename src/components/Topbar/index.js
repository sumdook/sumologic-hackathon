import React, {Component} from 'react';
import { Layout, Input, Row,Col } from 'antd';
import './index.css';


const Search = Input.Search;
const { Header } = Layout;

class Topbar extends Component{
    render(){
        return(
            <div className="header">
			<Row  type="flex" justify="center" align="top">
			<Col span={3}><div className="logo" /></Col>
      		<Col span={21}>
			  <Search
			  		style={{width:600, opacity:.9, margin:'16px 28px 16px 30px'}}
					placeholder="input search text"
					onSearch={value => console.log(value)}
					enterButton
					/>  
			</Col>
				
				
			</Row>
					
                    {/*
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['2']}
						style={{ lineHeight: '64px' }}
					>
						<Menu.Item key="1">nav 1</Menu.Item>
						<Menu.Item key="2">nav 2</Menu.Item>
						<Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                    */}
			</div>
        );
    }
}

export default Topbar;