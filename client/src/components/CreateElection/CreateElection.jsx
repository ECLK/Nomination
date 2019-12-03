import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';//--
import CardActions from '@material-ui/core/CardActions';//--
import CardContent from '@material-ui/core/CardContent';//--
import Button from '@material-ui/core/Button';//--
import Typography from '@material-ui/core/Typography';//--
import { Redirect } from 'react-router-dom'
import {asyncValidateTemplate,getElectionTemplateData} from '../../modules/election-model/state/ElectionAction';
import { connect } from 'react-redux';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    textCallElection:{
        marginLeft:'10px',
    }
});

const ElectionModule = [
    {
        value: 'Parliamentary',
        label: 'Parliamentary',
    },
    {
        value: 'Provincial',
        label: 'Provincial',
    },

];

class FilledTextFields extends React.Component {
    state = {
        ModuleName: '',
        goToConfig: false,
        errorTextTemplate: '',
        exist:false
    };

    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
    }

    handleChange = name => event => {
        if(name==='ModuleName'){
            this.setState({errorTextTemplate:''});
        }
        this.setState({
            [name]: event.target.value,
        });
    };

    handleNext() {
        this.props.getElectionTemplateData();
        if(this.state.exist===true){
            this.setState({errorTextTemplate:'emptyField2'});
            }else if(this.state.ModuleName===''){
            this.setState({errorTextTemplate:'emptyField'});
            }else{
                this.setState({goToConfig:true});
            }
    }

    asyncValidation = name => event =>{
        if(event.target.value){
        asyncValidateTemplate(event.target.value).then((data)=>{
          if(data.exist===true){
           this.setState({exist:data.exist});
          }else{
           this.setState({exist:data.exist});
          }
       })
        }else{
            this.setState({exist:false});
        }
       }

    render() {
        const {classes} = this.props;

        if (this.state.goToConfig) return <Redirect
            to={{
            pathname: '/admin/create-election',
            state: { name: this.state.ModuleName }
          }}
        />;

        return (

            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Create Election Template
                    </Typography>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="filled-name"
                            label="Template Name"
                            // helperText="Please type your Module Name"
                            className={classes.textField}
                            value={this.state.ModuleName}
                            error={this.state.errorTextTemplate}
                            helperText={this.state.errorTextTemplate === "emptyField2" ? 'This template name already used!' : 'Please type your template Name '}
                            onChange={this.handleChange('ModuleName')}
                            onChange={(evt) => {
                                this.handleChange('ModuleName')(evt)
                                this.asyncValidation('ModuleName')(evt)
                            }}
                            margin="normal"
                            variant="filled"
                            style={{marginBottom:'28px'}}

                        />


                    </form>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={this.handleNext}>Next</Button>
                </CardActions>
            </Card>
        );
    }
}

FilledTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ ElectionModel }) => {
};

const mapActionsToProps = {
    getElectionTemplateData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(FilledTextFields));