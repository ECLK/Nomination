import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DivisionTable from './DivisionTable';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: 12,
    },
    textField: {
        width: 300,
    },
});


class DivisionConfig extends React.Component {
    state = {
        divisions: [],
        errorTextDivisionCode:'',
        errorTextDivisionName:'',
        errorTextNoOfCandidates:'',
        divisionCommonName:''
    };

    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.electionChanged({ ...this.props.electionModule, [event.target.value]: event.target.checked });
    }

    addDivision = () => {
        const newElectionModule = {...this.props.electionModule};
      
        if(this.state.divisionCode===undefined || this.state.divisionCode===''){
            this.setState({errorTextDivisionCode:'emptyField'});
        }
        if(this.state.divisionName===undefined || this.state.divisionName===''){
            this.setState({errorTextDivisionName:'emptyField'});
        }
        if(this.state.noOfCandidates===undefined || this.state.noOfCandidates===''){
            this.setState({errorTextNoOfCandidates:'emptyField'});
        }
        const division = {
            divisionCode: this.state.divisionCode,
            divisionName: this.state.divisionName,
            noOfCandidates: this.state.noOfCandidates
        }
        
            const divisions = this.state.divisions;
            if(this.state.divisionCode!==undefined && this.state.divisionName!==undefined && this.state.noOfCandidates!==undefined){
                if(this.state.divisionCode!=='' && this.state.divisionName!=='' && this.state.noOfCandidates!==''){
                    newElectionModule.divisionConfig.push(division);
                    divisions.push(division);
                    this.props.electionChanged(newElectionModule); 
                    this.setState({  divisions , divisionName:"", divisionCode:"", noOfCandidates:""});
                }
            }
            
           
        
    }
    removeDivision = (index) => () => {
        const newElectionModule = {...this.props.electionModule};

        const divisions = this.state.divisions;
        newElectionModule.divisionConfig.splice(index, 1);
        divisions.splice(index, 1);
        this.props.electionChanged(newElectionModule); 
        this.setState({...this.state, divisions});
    }

    render() {
        const classes = styles();
        const handleChange = name => event => {
            this.setState({ ...this.state, [name]: event.target.value });
            if(name==='divisionCode'){
                this.setState({ errorTextDivisionCode: '' });
            }
            if(name==='divisionName'){
                this.setState({ errorTextDivisionName: '' });
            }
            if(name==='noOfCandidates'){
                this.setState({ errorTextNoOfCandidates: '' });
            }
            this.props.electionChanged({ ...this.props.electionModule, [name]: event.target.value });
        };
        
        return (
            <div className={classes.root}>

                <Grid style={{marginLeft:20}} container spacing={24}>
                    <Grid item xs={12}>
                        <FormControl  error={(this.props.errorTextDivisionCommonName) ? true : false} className={classes.formControl}>
                            {/* <InputLabel className={classes.textField} htmlFor="common-name">Division Common Name</InputLabel> */}
                            <TextField
                                id="common-name"
                                label="Division Common Name"
                                className={classes.textField}
                                value={this.props.electionModule['divisionCommonName']} 
                                // onChange={handleChange('divisionCommonName')}
                                margin="normal"
                                variant="outlined"
                            />
                           {/* <Input className={classes.textField} aria-describedby="component-error-text" id="common-name" value={this.props.electionModule['divisionCommonName']} onChange={handleChange('divisionCommonName')} /> */}
                           <FormHelperText>{(this.props.errorTextDivisionCommonName) ? 'This field is required!' : '(e.g. Province)'}</FormHelperText>
                        </FormControl>
                    </Grid>
                    
                    {/* {
                        this.props.electionModule.divisionConfig.map((element, index) => {
                            return (<React.Fragment>
                                <Grid item xs={2}>
                                    <Typography variant="body1" >{element.divisionName}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="body1" >{element.divisionCode}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="body1" >{element.noOfCandidates}</Typography>
                                </Grid>
                            </React.Fragment>);
                        })
                    } */}
                    <DivisionTable electionModule={this.props.electionModule}></DivisionTable>
                </Grid>
                {(this.props.errorTextDivisionConfig==='emptyField') ? <Typography style={{color:'red'}} variant="subtitle1" gutterBottom>Please add at least one division!</Typography> : ''}

            </div>
        );
    }
}

DivisionConfig.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(DivisionConfig);