import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var dateFormat = require('dateformat');
const guid = require('guid');
const io = require('socket.io-client');  
const socket = io('http://localhost:3001/');
var now = new Date();

class ChatBox extends Component{

     constructor(){
        super()

        this.state={
            messages:[],
            name:'',
            message:''
        }
    }

    componentDidMount(){

      socket.on('message-from-server',(data)=>{
       this.setState({messages: data});

      });

      socket.on('greeting-from-server',(data)=>{
        console.log(data);
      })

      var len = this.state.messages.length - 1;
    const node = ReactDOM.findDOMNode(this['_div' + len]);
    if (node) {
      node.scrollIntoView();
    }
    }
componentDidUpdate() {
    // Scroll as new elements come along
    var len = this.state.messages.length - 1;
    const node = ReactDOM.findDOMNode(this['_div' + len]);
    if (node) {
      node.scrollIntoView();
    }
  }
    

handleChangeName(event) {
   
    this.setState({name: event.target.value});
 
  }

  handleChangeMessage(event) {
    
    this.setState({message: event.target.value});
  
  }

  sendMessage(){
      socket.emit('message-from-client', {
        'id':guid.create(),
        'name':this.state.name,
        'message':this.state.message,
        'timestamp':dateFormat(now)
      });
  }

    render(){
           const messages = this.state.messages;
      return(


        <div className="App-intro">
            <div className="frame">
    
              
                     <ul>

               {
                   
                   messages.map((x, i)=>{     
                    let obj = JSON.parse(x);
                      if(obj.name === this.state.name){
                     return (  <li ref={(ref) => this['_div' + i] = ref} className="width-full animated fadeInUp">
                        <div className="msj-rta macro">
                            <div className="text text-r">
                                <p>{obj.message} </p>
                                <p><small>{obj.timestamp}</small></p>
                            </div>
                        <div className="avatar avatar-padding">
                            <img className="img-circle width-full image-size" src="http://lorempixel.com/g/40/40/"  alt="text" /></div>  
                            </div>                              
                        </li>                       
                               )                               
                        
                      
                      }
                      else{
                     return (  
<li ref={(ref) => this['_div' + i] = ref}  key={obj.id} className="width-full  animated fadeInUp">
                                <div className="msj macro">
                                <div className="avatar"><img className="img-circle width-full image-size" src="http://lorempixel.com/g/40/40/" alt="text" /></div>
                                    <div className="text text-l">
                                        <p> {obj.message}</p>
                                        <p><small>{obj.timestamp}</small></p>
                                    </div>
                                </div>
                            </li> 
                           )
                      }
                   
                })}
                </ul>
               <div className="msj-rta macro margin-auto padding-top-10">   
                              <input className="name-text"  type="text" 
                         placeholder="Type a name" value={this.state.name} 
                         onChange={this.handleChangeName.bind(this)} />        
                    <div className="text text-r chat-background" >
                         <input className="mytext" type="text" 
                         placeholder="Type a message" value={this.state.message} 
                         onChange={this.handleChangeMessage.bind(this)} /> 
                         
                     </div> 
                     
                      <button className='btn btn-primary' onClick={this.sendMessage.bind(this)}>Send</button>   
                </div>
         
                
            </div>
        </div>
        )  
    }
}

export default ChatBox;