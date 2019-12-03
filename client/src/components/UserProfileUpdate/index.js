import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
// import Notifier, { openSnackbar } from '../Notifier'
import { openSnackbar } from '../../modules/election/state/ElectionAction';
import CustomAutocomplete from '../Autocomplete';
import { getUserInfo,handleChangeProfileData,getUserList } from '../../modules/profile/state/ProfileAction';
import { connect } from 'react-redux';
import { de } from 'date-fns/esm/locale';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit*2,
        marginRight: theme.spacing.unit*2,
        width: '100%',
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    label: {
        marginLeft: theme.spacing.unit*15,
    },
    label: {
        marginLeft: theme.spacing.unit*30,
        padingTop:theme.spacing.unit*30
    },
    submit: {
        marginLeft: theme.spacing.unit
    },

});

const gender = [
    {
        value: '',
        label: '-- Select --',
    },
    {
        value: 'MALE',
        label: 'MALE',
    },
    {
        value: 'FEMALE',
        label: 'FEMALE',
    },

];
const electoralDivisionNames = [
    {
        value: '',
        label: '-- Select --',
    },
    {
        value: 'Kaluthara',
        label: 'Kaluthara',
    },
    {
        value: 'Colombo',
        label: 'Colombo',
    },
    {
        value: 'Gampaha',
        label: 'Gampaha',
    },
    {
        value: 'Kagalla',
        label: 'Kagalla',
    },

];
const electoralDivisionCodes = [
    {
        value: '',
        label: '-- Select --',
    },
    {
        value: 'K001',
        label: 'K001',
    },
    {
        value: 'C002',
        label: 'C002',
    },
    {
        value: 'G003',
        label: 'G003',
    },
    {
        value: 'K002',
        label: 'K002',
    },

];
class TextFields extends React.Component {


    state = {
        nic: '',
        fullName: '',
        preferredName: '',
        nominationId: '',
        dateOfBirth: '',
        gender: 'Select',
        occupation:'',
        address:'',
        electoralDivisionName: 'Select',
        electoralDivisionCode: 'Select',
        counsilName: '',
        party:'',
        userInfo:{
            name:'',
            email:'',
            party:'',
            id:''
        },
        party: []


    };

    componentDidMount() {
        const { index,getUserInfo,userInfo } = this.props;
        getUserInfo(index); 
    }
    
    handleChange = name => event => {
        const { handleChangeProfileData } = this.props;
        const newUserInfo = {};
        
        if(event.target===undefined){
            this.setState({
                party: [
                    {
                      label: event.label,
                      value: event.value
                    }
                  ]
                // [name]: event.value,
            });
        }else{
            this.setState({
                [name]: event.target.value,
            });

            newUserInfo[name]=event.target.value;
        }

        if(name==='party'){
            newUserInfo["party"]=event.value;
        }

        handleChangeProfileData(newUserInfo);
    };
    
    handleChangeButton = (e) => {
        const { onCloseModal } = this.props;
        if(e.currentTarget.value==="Submit&Clouse"){
            onCloseModal();           
        }
        }

    handleSubmit = (e) => {
        
        const { index,userInfo,getUserList } = this.props;
            var postData = {
                        id: userInfo.id,
                        name: userInfo.name,
                        email: userInfo.email,
                        party: userInfo.party
                }
                console.log("userInfo",userInfo);
                if(index){
                    e.preventDefault();
                    axios({
                        method: 'put',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        url: `users/${index}`,
                        data: postData
                    })
                    .then(function (response) {
                        openSnackbar({ message: 'User Profile Updated Sccessfully...' });
                        // setTimeout(() => {
                        // }, 5000);
                        // getNominationCandidates(customProps);

                getUserList();
                    })
                    .catch(function (error) {
                        alert("error",error);
                    });
                }else{
                    e.preventDefault();
                    axios({
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        url: `users`,
                        data: postData
                    })
                    .then(function (response) {
                        openSnackbar({ message: 'User Profile Added Sccessfully...' });
                        // setTimeout(() => {
                        // }, 5000);
                        // getNominationCandidates(customProps);

                getUserList();
                    })
                    .catch(function (error) {
                        alert("error",error);
                    });
                }
        
    };

    render() {
        const {classes , onCloseModal,partyList,userInfo} = this.props;
        const suggestions = partyList.map(suggestion => ({
            value: suggestion.team_id,
            label: suggestion.team_name+" ("+suggestion.team_abbrevation+")",
          }));
          console.log("gggg",this.state.party);
        return (
            <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">

                        <TextField

                            id="standard-name"
                            label="User Name"
                            name="name"
                            ref={(input) => this.input = input}
                            className={classes.textField}
                            value={userInfo.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            fullWidth='true'
                        />
                        <CustomAutocomplete className={classes.textField} value={this.state.party} suggestions={suggestions} handleChange={this.handleChange} />        
                        <TextField

                            id="standard-name"
                            label="Roles"
                            className={classes.textField}
                            value={this.state.preferredName}
                            onChange={this.handleChange('roles')}
                            margin="normal"
                        />
                        <TextField

                            id="standard-name"
                            label="Email"
                            className={classes.textField}
                            value={userInfo.email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                        />
               
                <Grid container spacing={12}>
                    <Grid style={{textAlign:'right',marginRight:'15px'}} className={classes.label}  item lg={12}>
                    <br /><br />
                        <Button variant="contained"  onClick={onCloseModal} value="Submit&New" color="primary" className={classes.submit}>
                            Cancel
                        </Button>
                        <Button  variant="contained" onClick = { this.handleChangeButton }  type="submit" value="Submit&Clouse" color="default" className={classes.submit}>
                            Update
                        </Button>
                    </Grid>
                </Grid>

            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Nomination,Profile}) => {
    const partyList = Nomination.partyList;
    const userInfo = Profile.userInfo;
    return {partyList,userInfo};
  };

  const mapActionsToProps = {
    getUserInfo,
    handleChangeProfileData,
    getUserList
    // getTeams
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TextFields));

