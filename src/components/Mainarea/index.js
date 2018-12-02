import React, {Component} from 'react';
import { Layout, Divider , Icon , Table, Menu, Dropdown, Modal, Input, Pagination } from 'antd';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const { Content } = Layout;

class Mainarea extends Component{

    state = {activePath:{}, renameFile:false, oldFile:'',oldFolder:'',renameFolder:false, filename:'',foldername:''};

    backFunction = (event) => {
		if(event.keyCode === 8) {
		  this.props.goBack();
		}
	  }
	
	componentDidMount(){
		document.addEventListener("keydown", this.backFunction, false);
	}
	componentWillUnmount(){
		document.removeEventListener("keydown", this.backFunction, false);
	}

    renameFileModal = (text) => {
        console.log(text);
        this.setState({
            renameFile: true,
            oldFile: text
        });
      }
    
    renameFileOk = (e) => {
        this.props.updateFile(this.state.oldFile,this.state.filename,this.props.path);
        this.setState({
            renameFile: false,
        });
    }

    renameFolderModal = (text) => {
        this.setState({
            renameFolder: true,
            oldFolder:text
        });
      }
    
    renameFolderOk = (e) => {
        this.props.updateFolder(this.state.oldFolder,  this.state.foldername, this.props.path);
        this.setState({
            renameFolder: false,
        });
    }
    
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            renameFile:false, renameFolder:false
        });
    }

    onChangeFilename = (e) => {
        this.setState({ filename: e.target.value });
    }

    onChangeFoldername = (e) => {
        this.setState({ foldername: e.target.value });
    }
    

    createNewFolder = () =>{
        console.log('inFunction');
        this.props.createFolder("FolderLol", this.props.path);
    }
    componentWillReceiveProps(nextProps) {
        if(!nextProps.path.length){
            this.setState({activePath: nextProps.data_snapshot});
            console.log(this.state.activePath);
        }
        else{
            let a = nextProps.data_snapshot;
            nextProps.path.map(item=>{
                a=a[item];
            })
            this.setState({activePath: a});
        }
      }

    renderFiles = () => {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;"><Icon type="file" />  {text}</a>,
            sorter: (a, b) => a.name.length - b.name.length,
          }, {
          }, {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          }, {
            title: 'Last Modified',
            dataIndex: 'updated',
            key: 'updated',
          }, {
            title: 'Size',
            key: 'size',
            dataIndex: 'size',
          },
          {
            title: '',
            key: 'action',
            dataIndex: 'action',
            render: (text) => {
                const menu = (
                    <Menu>
                      <Menu.Item key="6"><a onClick={()=>{this.renameFileModal(text)}}><Icon type="copy" /> Rename</a></Menu.Item>
                      <Menu.Item key="7"><a onClick={()=>{this.props.deleteFile(text,this.props.path)}}><Icon type="delete" /> Delete</a></Menu.Item>
                      <Menu.Item key="8" disabled><a><Icon type="info-circle-o" /> Properties</a></Menu.Item>
                    </Menu>
                  );
                  
                return(
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                        <Icon type="ellipsis" />
                        </a>
                    </Dropdown>
                );
            },
          }];

        const data=[];
        
        if(this.state.activePath.hasOwnProperty('Files')){
            this.state.activePath['Files'].map(file => {
                data.push({
                    name:file["file_name"],
                    type:file["type"],
                    updated:'12/06/1997',
                    size:'20kb',
                    action:file["file_name"]
                });
            });
        }

        return (<Table columns={columns} dataSource={data} pagination={{ pageSize: 3 }} />);
    }
    renderFolder = () =>{

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;" onClick={()=>{this.props.gotoFolder(text);this.props.recentFolder(text, this.props.path);}}><Icon type="folder-open" />  {text}</a>,
            sorter: (a, b) => a.name.length - b.name.length,
          }, {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
          }, {
            title: 'Last Modified',
            dataIndex: 'updated',
            key: 'updated',
          }, {
            title: 'Size',
            key: 'size',
            dataIndex: 'size',
          },
          {
            title: '',
            key: 'action',
            dataIndex: 'action',
            render: (text) => {
                const menu = (
                    <Menu>
                      <Menu.Item key="0"><a onClick={()=>{this.renameFolderModal(text)}}><Icon type="copy" /> Rename</a></Menu.Item>
                      <Menu.Item key="1"><a onClick={()=>{this.props.deleteFolder(text,this.props.path)}}><Icon type="delete" /> Delete</a></Menu.Item>
                      <Menu.Item key="2" disabled><Icon type="info-circle-o"/>Properties</Menu.Item>
                    </Menu>
                  );
                  
                return(
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                        <Icon type="ellipsis" />
                        </a>
                    </Dropdown>
                );
            },
          }];

        const data=[];

        Object.keys(this.state.activePath).map(function(key, index) {
            if(key!=='Files'){
                data.push({
                    name:key,
                    owner:'Soumik',
                    updated:'12/06/1997',
                    size:'20kb',
                    action:key
                });
            }
         });

         return <Table columns={columns} dataSource={data} pagination={{ pageSize: 3 }} />
    }

    render(){
        return(
            <Content style={{ padding: '0 24px', minHeight: '72vh'}}>
                <Modal
                    title="Rename File"
                    visible={this.state.renameFile}
                    onOk={this.renameFileOk}
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

                <Modal
                    title="Rename Folder"
                    visible={this.state.renameFolder}
                    onOk={this.renameFolderOk}
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
                <Divider orientation="left">Folders</Divider>
                <br/>
                {this.renderFolder()}
                
                <Divider orientation="left">Files</Divider>
                <br/>
                {this.renderFiles()}
            </Content>
        );
    }
}

function mapStateToProps({data_snapshot,path}){
    return {data_snapshot,path};
}

export default connect(mapStateToProps,actions)(Mainarea);