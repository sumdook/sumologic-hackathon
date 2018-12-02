import React, {Component} from 'react';
import { Layout, Menu, Icon, Modal, Input } from 'antd';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const { Sider } = Layout;

class Sidebar extends Component{

    state={fileModal:false,folderModal:false,filename:'',foldername:''};

    backFunction = (event) => {
		if(event.keyCode === 8) {
		}
	  }
	
	componentDidMount(){
		document.addEventListener("keydown", this.backFunction, false);
	}
	componentWillUnmount(){
		document.removeEventListener("keydown", this.backFunction, false);
	}

    showfileModal = () => {
        this.setState({
            fileModal: true,
        });
    }

    showfolderModal = () => {
        this.setState({
            folderModal: true,
        });
    }

    handleOkFile = (e) => {
        let file = this.state.filename.split('.');
        this.props.createFile(file[0], file[1], this.props.path);
        this.props.recentFile(this.state.filename, this.props.path);
        this.setState({
            fileModal: false,
            filename:''
        });
    }

    handleOkFolder = (e) => {
        this.props.createFolder(this.state.foldername, this.props.path);
        this.props.recentFolder(this.state.foldername, this.props.path);
        this.setState({
            folderModal: false,
            foldername:''
        });
      }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            fileModal:false,
            folderModal: false,
        });
    }

    onChangeFilename = (e) => {
        this.setState({ filename: e.target.value });
    }

    onChangeFoldername = (e) => {
        this.setState({ foldername: e.target.value });
    }

    render(){
        return(
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    selectable={false}
                    defaultOpenKeys={['sub1']}
                    style={{paddingLeft:'30px'}}
                >
                <Modal
                    title="New File"
                    visible={this.state.fileModal}
                    onOk={this.handleOkFile}
                    onCancel={this.handleCancel}
                    >
                    <Input
                        placeholder="Enter filename with extension"
                        prefix={<Icon type="file-add" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={this.state.filename}
                        onChange={this.onChangeFilename}
                        ref={node => this.filenameInput = node}
                    />
                </Modal>
                <Menu.Item key="1"><a onClick={this.showfileModal}><Icon type="file-add" />New File</a></Menu.Item>

                <Modal
                    title="New Folder"
                    visible={this.state.folderModal}
                    onOk={this.handleOkFolder}
                    onCancel={this.handleCancel}
                    >
                     <Input
                        placeholder="Enter folder name"
                        prefix={<Icon type="folder-add" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={this.state.foldername}
                        onChange={this.onChangeFoldername}
                        ref={node => this.foldernameInput = node}
                    />
                </Modal>
                <Menu.Item key="2"><a onClick={this.showfolderModal}><Icon type="folder-add" />New Folder</a></Menu.Item>
                <Menu.Divider style={{marginRight:'-20px'}}/>
                </Menu>
                <Menu
                    mode="inline"
                    defaultOpenKeys={['sub1']}
                    style={{paddingLeft:'30px', paddingTop:'10px', height:600}}
                >
                <Menu.Item key="3" disabled><Icon type="clock-circle-o" />Recent</Menu.Item>
                <Menu.Item key="4" disabled><Icon type="delete" />Trash</Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

function mapStateToProps({path}){
    return {path};
}

export default connect(mapStateToProps,actions)(Sidebar);