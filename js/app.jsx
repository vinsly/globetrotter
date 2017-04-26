var Title = React.createClass({
	render: function(){
		return <h2>The Globetrotter</h2>
	}
});

var Header = React.createClass({
	getInitialState: function(){
		return {
			isForm:false,
			isList:false,
			isUpdateForm:false,
			dataName:'',
			formType:null
		};
	},
	render: function(){
		return (
			<div>
				<div className="header">
					<ul>
						<li onClick={this.showList}><a>Customer List</a></li>
						<li onClick={this.showNewForm}><a>Add New Customer</a></li>
					</ul>
				</div>
				{this.state.isForm ? <AddNewCustomerForm data={'form'}/>:null}
				{this.state.isList ? <CustomerList isList={this.showUpdateForm} data={'list'}/>:null}
				{this.state.isUpdateForm ? <AddNewCustomerForm dataName={this.state.dataName} dataType={this.state.formType}/>:null}
			</div>
		)
	},
	showNewForm: function(){
		this.setState({isForm:true, 
			isList:false,
			isUpdateForm:false,
			dataName:'',
			formType:null
		});
	},
	showList: function(){
		this.setState({
			isForm:false,
			isList:true,
			isUpdateForm:false,
			dataName:'',
			formType:null
		});	
	},
	showUpdateForm: function(obj){
		this.setState({
			isForm:false,
			isList:false,
			isUpdateForm:true,
			dataName:obj.name,
			formType:obj.formType
		});
	}
});

var AddNewCustomerForm = React.createClass({
	getInitialState: function(){
		if(this.props.dataName && this.props.dataName!=undefined){
			var updateCustomerObject=this.getCustomerDetails();
			var typeFlag,type;
			if(updateCustomerObject.type=='regular'){
				updateCustomerObject.type2=true;
				updateCustomerObject.type3=false;
				typeFlag=true;
				type='regular'
			}
			else if(updateCustomerObject.type==undefined || updateCustomerObject.type==null || updateCustomerObject.type==''){
				updateCustomerObject.type2=true;
				updateCustomerObject.type3=false;
				typeFlag=true;
				type='regular';
			}
			else{
				updateCustomerObject.type2=false;
				updateCustomerObject.type3=true;
				typeFlag=false;
				type='corporate';
			}

			return{
				formHeading: 'Update Details',
				eFlag: typeFlag,
				corporate: updateCustomerObject.type3,
				regular: updateCustomerObject.type2,
				name: updateCustomerObject.name,
				age: updateCustomerObject.age,
				disc: updateCustomerObject.disc,
				number: updateCustomerObject.number,
				program: updateCustomerObject.program,
				charge: updateCustomerObject.charge,
				employees: updateCustomerObject.emp,
				distance: updateCustomerObject.distance,
				nameFlag:true,
				type:type
			}
		}

		return{
			formHeading:'Add Customer',
			eFlag:true,
			employees:'',
			corporate:false,
			regular:true,
			nameFlag:false,
			type:'regular'
		}
	},
	getCustomerDetails: function(){
		var oldCustomerList=JSON.parse(localStorage.getItem('list'));
		for(var i=0;i<oldCustomerList.length;i++){
			if(oldCustomerList[i].name == this.props.dataName){
				return oldCustomerList[i];
			}
		}
			
	},
	onTypeChanged: function(e){
		if(e.currentTarget.value=='corporate'){
			this.setState({regular:false,corporate:true})
			this.state.eFlag=false;
		}
		else{
			this.setState({regular:true,corporate:false})
			this.state.eFlag=true;
			this.refs.employees.value='';
		}
		this.setState({type:e.currentTarget.value})
	},
	
	style:{
		input1:{marginLeft: '298px', width: 450},
		input2:{marginLeft: '317px'},
		input3:{marginLeft: '226px', width: 450},
		input4:{marginLeft: '169px'},
		label:{marginLeft: '5px'},
		radio1:{marginLeft: '300px'},
		radio2:{marginLeft: '30px'},
		input5:{marginLeft: '264px',width: 150},
		label2:{marginLeft: '12px'},
		input6:{marginLeft: '63px'},
		input7:{marginLeft: '121px'},
		submit:{marginLeft: '460px'}
	},
	render: function(){
		if(this.state.nameFlag){
			this.style.input1={marginLeft: '298px', width: 450,cursor: 'not-allowed'};
		}
		else{
			this.style.input1={marginLeft: '298px', width: 450};
		}
		if(this.state.eFlag){
			this.style.input6={marginLeft: '63px',cursor: 'not-allowed'};
		}
		else{
			this.style.input6={marginLeft: '63px'};
		}
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<fieldset>
						<div className="form_head">
							{this.props.dataType && this.props.dataType=='details'?'Customer Details':this.state.formHeading}
						</div>
				        <div>
				            <label htmlFor="name">Name:</label>
				            <input name="name" type="text" style={this.style.input1} required disabled={this.state.nameFlag} ref="name" defaultValue={this.state.name}/>
				        </div>

				        <div>
				            <label htmlFor="age">Age:</label>
				            <input id="age" type="number" style={this.style.input2} ref="age" defaultValue={this.state.age}/>
				        </div>

				        <div>
				            <label htmlFor="disc">Discription:</label>
				            <input id="disc" type="text" style={this.style.input3} ref="disc" defaultValue={this.state.disc}/>
				        </div>

				        <div>
				            <label htmlFor="m_no">Mobile Number:</label>
				            <input id="m_no" type="number" style={this.style.input4} ref="number" defaultValue={this.state.number}/>
				        </div>

				        <div>
				            <label htmlFor="type">Type:</label>
				            <input name="type" type="radio" value="corporate" style={this.style.radio1} onChange={this.onTypeChanged} checked={this.state.corporate}/><label style={this.style.label}>Corporate</label>
				            <input name="type" type="radio" value="regular" style={this.style.radio2} onChange={this.onTypeChanged} checked={this.state.regular}/><label style={this.style.label}>Regular</label>
				        </div>

				        <div>
				            <label htmlFor="cb" className="pure-checkbox">Loyal Program Subscribed:</label>
				            <input id="cb" type="checkbox" ref="program" defaultChecked={this.state.program}/>
				        </div>
				        <div >
				            <label htmlFor="charge">Charges:</label>
				            <input id="charge" type="number" style={this.style.input5} ref="charge" defaultValue={this.state.charge}/><label style={this.style.label2}>per/km</label>
				        </div>
				        <div>
				            <label htmlFor="noe">Number Of Employees:</label>
				            <input id="noe" type="number" style={this.style.input6} ref="employees" disabled={this.state.eFlag} defaultValue={this.state.employees}/>
				        </div>
				        <div>
				            <label htmlFor="distance">Distance Travelled:</label>
				            <input id="distance" type="number" style={this.style.input7} ref="distance" defaultValue={this.state.distance}/>
				        </div>
				        {this.props.dataType && this.props.dataType=='details'?null:<div>
				            <input id="submit" type="submit" value="Save" style={this.style.submit}/>
				            <input id="reset" type="button" value="Reset" onClick={this.onReset}/>
				        </div>}
				    </fieldset>
				</form>
			</div>
		);
	},
	onSubmit: function(e){
		var oldCustomerList = JSON.parse(localStorage.getItem('list')) || [];
		var discountedCharge=this.calculateCharges();
		if(this.refs.name.value==null || this.refs.name.value == ''){
			e.preventDefault();
			return;
		}
		var newCustomerObj={                                             
			'name':this.refs.name.value,
			'age':this.refs.age.value,
			'disc':this.refs.disc.value,
			'number':this.refs.number.value,
			'type': this.state.type,
			'program':this.refs.program.checked,
			'charge':this.refs.charge.value,
			'emp':this.refs.employees.value,
			'distance':this.refs.distance.value,
			'discount': Math.round(discountedCharge)
		};
		if(this.props.dataName && this.props.dataName!=undefined){
			var index=0;
			for(var i=0;i<oldCustomerList.length;i++)
				if(oldCustomerList[i].name == this.refs.name.value){
					index=i;
					break;
				}
			oldCustomerList[index]=newCustomerObj;
		}else{
			oldCustomerList.push(newCustomerObj);
		}
		localStorage.setItem('list',JSON.stringify(oldCustomerList))
	},
	onReset: function(e){
		e.preventDefault();
		if(!this.props.dataName || this.props.dataName==undefined)
			this.refs.name.value='';
		this.refs.age.value='';
		this.refs.disc.value='';
		this.refs.number.value='';
		this.refs.program.checked=false;
		this.setState({regular:true,corporate:false});
		this.refs.charge.value='';
		this.refs.employees.value='';
		this.refs.distance.value='';
		this.state.eFlag=true;
	},
	calculateCharges: function(){
		var discount=0;
		if(this.state.regular && this.refs.program.checked){
			discount=(5/100)*parseInt(this.refs.charge.value);
			discount=parseInt(this.refs.charge.value)-discount;
		}
		else if(this.state.corporate){
			if(parseInt(this.refs.employees.value) > 10){
				discount=(15/100)*parseInt(this.refs.charge.value);
				discount=parseInt(this.refs.charge.value)-discount;
			}
			else{
				discount=(10/100)*parseInt(this.refs.charge.value);
				discount=parseInt(this.refs.charge.value)-discount;
			}
		}
		else{
			discount=this.refs.charge.value;
		}
		return discount;
	}
});

var CustomerList = React.createClass({
	getInitialState: function(){
		return {}
	},
	style:{
		disc:{overflow: 'hidden',height:'initial'}
	},
	getCustomerList:function(){
		return JSON.parse(localStorage.getItem('list'))? JSON.parse(localStorage.getItem('list')) : [];
	},
	deleteCustomer: function(e){
		if(confirm("Are you sure you want to delete this customer?") == true){
			var name=e.target.parentNode.parentNode.childNodes[0].innerHTML;
			var oldCustomerList=JSON.parse(localStorage.getItem('list'));
			var index=0;
			for(var i=0;i<oldCustomerList.length;i++)
				if(oldCustomerList[i].name == name){
					index=i;
					break;
				}
			if (index > -1) {
			    oldCustomerList.splice(index, 1);
			}
			localStorage.setItem('list',JSON.stringify(oldCustomerList));
			this.forceUpdate();
		}
		
	},
	updateCustomer: function(e){
		this.state.currentCustomerName=e.target.parentNode.parentNode.childNodes[0].innerHTML;
		this.props.isList({name:this.state.currentCustomerName,formType:'update'});
	},
	customerDetails: function(e){
		this.state.currentCustomerName=e.target.parentNode.parentNode.childNodes[0].innerHTML;
		this.props.isList({name:this.state.currentCustomerName,formType:'details'});
	},
	render: function(){
		
		return (
			<div>
				<ul className="sortable_list">
					<li id="listitem" className="clearfix header">
						<div className="listitem_name">Name</div>
						<div className="listitem_type">Type</div>
						<div className="listitem_disc" style={this.style.disc}>Discription</div>
						<div className="listitem_charge">Charges</div>
						<div className="listitem_action">Action</div>
					</li>
					{this.getCustomerList().map(function(person){
							return (<li key={person.name} className="clearfix header">
									<div className="listitem_name">{person.name}</div>
									<div className="listitem_type">{person.type}</div>
									<div className="listitem_disc">{person.disc}</div>
									<div className="listitem_charge">{person.distance?person.discount:''}</div>
									<div className="listitem_action">
										<span className="action_item" onClick={this.deleteCustomer}>Delete</span>
										<span className="action_item" onClick={this.updateCustomer}>Update</span>
										<span className="action_item" onClick={this.customerDetails}>Details</span>
									</div>
								</li>)
						}.bind(this))
					}
				</ul>
			</div>
		);
	}
});

var MainDiv = React.createClass({
	render: function(){
		return (
			<div>
				<Title />
				<Header />
			</div>
		);
	}
});

ReactDOM.render(<MainDiv />, document.getElementById('root'));

