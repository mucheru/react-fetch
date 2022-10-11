import axios from "axios";
import React,{Component} from "react";
import ReactDom from 'react-dom';

export default class Trialcomponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            name:'',
            tasks:[]
        }
        this.handleChange=this.handleChange.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }
    handleChange(e){
        this.setState({
            name:e.target.value

        });
        console.log('onChange',this.state.name)

    }
    handleSubmit(e){
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/tasks',{
            name: this.state.name

        })
        .then(response =>{
            console.log('from handle submit',response);
            this.setState({

                tasks: [response.data,...this.state.tasks]
            });
            this.setState({
                name:'',
            })
        })
    }
    getTasks(){
        axios.get('http://127.0.0.1:8000/api/tasks')
        .then((response)=>{
            this.setState({

                tasks:[...response.data.tasks]
            })
        })
    }
    componentWillMount() {
        this.getTasks();
    }
    handleDelete(id){
        const isNotId = task =>task.id !==id;
        const updateTasks = this.state.tasks.filter(isNotId);
        this.setState({ tasks: updateTasks });
        axios.delete('http://127.0.0.1:8000/api/tasks/${id}'); 

    }
    
    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Create Task
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <textarea className="form-control" onChange={this.handleChange} value={this.state.name} rows="5" placeholder="create new task" required>
                                            </textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Create New Task</button>
                                    </form>
                                    {this.renderTasks()}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    renderTasks() {
        return this.state.tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <p>{task.name}{ ''}</p>
                    <button
                            onClick={() => this.handleDelete(task.id)}
                            className="btn btn-sm btn-warning float-right"
                        >
                            Delete
                        </button>
                </div>
            </div>
        ));
    }
    
}