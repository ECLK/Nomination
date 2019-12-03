import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { EligibilityCheckList } from './Fixtures';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import _ from 'lodash';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: 12,
    },
    group: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    }
});


class ElectionConfig extends React.Component {
    state = {
        divisions: [],
        eligibilityCheckList: [],
        selectedAuthority: '',
        electionConfig:[],
        showAmount:false
    };

    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleNominationSubmission = this.handleNominationSubmission.bind(this);
        this.handleEligibility = this.handleEligibility.bind(this);
    }

    showAmountRpp(event){
        const newElectionModule = {...this.props.electionModule};

        if(event && event.target ){
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            if(value==='No'){
                newElectionModule.electionConfig.map((item,index) => (
                    (item.electionModuleConfigId==='123213') ?
                    newElectionModule.electionConfig.splice(index, 1) : ''
                ));
            }
            (name==='fe2c2d7e-66de-406a-b887-1143023f8e72' && value==='Yes') ? this.setState({ showAmountRpp: true }) : this.setState({ showAmountRpp: false })
        }
    }

    showAmountIg(event){
        const newElectionModule = {...this.props.electionModule};

        if(event && event.target ){
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            if(value==='No'){
                newElectionModule.electionConfig.map((item,index) => (
                    (item.electionModuleConfigId==='123213') ?
                    newElectionModule.electionConfig.splice(index, 1) : ''
                ));
            }
            (name==='fe2c2d7e-66de-406a-b887-1143023f8e54' && value==='Yes') ? this.setState({ showAmountIg: true }) : this.setState({ showAmountIg: false })
        }
    }

    handleChangeAmount = name => event => {
        const newElectionModule = {...this.props.electionModule};
        // this.setState({ [name]: event.target.value });
        const electionConf = {
            electionModuleConfigId: name,
            value: event.target.value,
            id:'securityDepositeAmount'
        }
        newElectionModule.electionConfig.map((item,index) => (
            (item.electionModuleConfigId===electionConf.electionModuleConfigId) ?
            newElectionModule.electionConfig.splice(index, 1) : ''
        ));
        if(electionConf.value!==''){
            newElectionModule.electionConfig.push(electionConf);
        }
        this.props.electionChanged(newElectionModule); 

      };

    handleChange(id,event) {
        if(event && event.target ){
            const newElectionModule = {...this.props.electionModule};
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            const electionConf = {
                electionModuleConfigId: name,
                value: value,
                id:id
            }
            const electionConfig = this.state.electionConfig;

            newElectionModule.electionConfig.map((item,index) => (
                (item.electionModuleConfigId===electionConf.electionModuleConfigId) ?
                newElectionModule.electionConfig.splice(index, 1) : ''
            ));

            newElectionModule.electionConfig.map((item,index) => (
                (item.electionModuleConfigId===electionConf.electionModuleConfigId) ?
                electionConfig.splice(index, 1) : ''
            ));


            newElectionModule.electionConfig.push(electionConf);
            electionConfig.push(electionConf);
            this.props.electionChanged(newElectionModule); 
            this.setState({electionConfig , electionModuleConfigId:"", value:""});
            // this.props.electionChanged({ ...this.props.electionModule, [name]: value });
        }
    }

    handleNominationSubmission(value,name, event) {
        const newElectionModule = {...this.props.electionModule};
        const electionConf = {
            electionModuleConfigId: name,
            value: value,
            id:'nominationSubmision'
        }
        if(event.target.checked){
            newElectionModule.electionConfig.push(electionConf);
        }else{
          
            this.props.electionModule.electionConfig.map((item,index) => (
                (item.value===electionConf.value) ?
                newElectionModule.electionConfig.splice(index, 1) : ''
            ));

            
        }
        this.props.electionChanged(newElectionModule); 
    }

    handleEligibility(row, event) {
        const newElectionModule = {...this.props.electionModule};
        const eligibilityConf = {
            eligibilityConfigId: row.value,
        }
        if(event.target.checked){
            newElectionModule.eligibilityCheckList.push(eligibilityConf);
        }else{
            this.props.electionModule.eligibilityCheckList.map((item,index) => (
                (item.eligibilityConfigId===eligibilityConf.eligibilityConfigId) ?
                newElectionModule.eligibilityCheckList.splice(index, 1) : ''
            ));    
        }
        this.props.electionChanged(newElectionModule); 
    }

    NumberFormatCustom(props) {
        const { inputRef, onChange, ...other } = props;
      
        return (
          <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
              onChange({
                target: {
                  value: values.value,
                },
              });
            }}
            thousandSeparator
            prefix="Rs "
          />
        );
      }

    render() {
        const classes = styles();
        const {errorTextItems} = this.props;
        const electionModule = this.props.electionModule;
        let calType='';
        let SecurityDepositRpp='';
        let SecurityDepositIg='';
        let depositAmountRpp='';
        let depositAmountIg='';
        let Objections='';
        let CreateAlliance='';
        let showRpp='';
        let showIg='';

        this.props.electionModule.electionConfig.map(item => {
            if(item.electionModuleConfigId==='15990459-2ea4-413f-b1f7-29a138fd7a97'){
                calType=item.value
            }
            if(item.electionModuleConfigId==='fe2c2d7e-66de-406a-b887-1143023f8e72'){
                SecurityDepositRpp=item.value
            }
            if(item.electionModuleConfigId==='fe2c2d7e-66de-406a-b887-1143023f8e54'){
                SecurityDepositIg=item.value
            }
            if(item.electionModuleConfigId==='123213'){
                depositAmountRpp=item.value;
            }
            if(item.electionModuleConfigId==='1232132'){
                depositAmountIg=item.value;
            }
            if(item.electionModuleConfigId==='253454355'){
                Objections=item.value
            }
            if(item.electionModuleConfigId==='142343242343'){
                CreateAlliance=item.value
            }
            
        });
        if (depositAmountRpp) {
            showRpp = true;
        }
        if (depositAmountIg) {
            showIg = true;
        }
        return (
            <div className={classes.root}>
                <Grid style={{marginLeft:20,marginBottom:80}} container spacing={24}>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Calculation Type</FormLabel>
                            <RadioGroup
                                aria-label="Gender"
                                name="15990459-2ea4-413f-b1f7-29a138fd7a97"
                                className={classes.group}
                                // onChange={this.handleChange.bind(this,"calType")}
                                value={calType}
                                row
                            >
                                <FormControlLabel control={<Radio />} value="pure_vote_based" label="Pure vote-based" />
                                <FormControlLabel control={<Radio />} value="pure_prefrence_based" label="Pure preference-based" />
                                <FormControlLabel control={<Radio />} value="vote_and_prefrence" label="Vote &amp; Prefrential Based" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel  component="legend">Nomination Submission By</FormLabel>
                            <RadioGroup
                                aria-label="Nomination Submission"
                                className={classes.group}
                                row
                            >
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            // checked={this.props.electionModule.electionConfig.includes('Party Secretory')}
                                            checked={this.props.electionModule.electionConfig.some( nominationSubmit => nominationSubmit['value'] === 'Party Secretory' )}
                                            // onChange={(e)=>{this.handleNominationSubmission('Party Secretory','1243123', e);}} 
                                        />
                                    }
                                    label="Party Secretory"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox  
                                            // checked={this.props.electionModule.nominationSubmission.includes('Independent Group Leader')} 
                                            checked={this.props.electionModule.electionConfig.some( nominationSubmit => nominationSubmit['value'] === 'Independent Group Leader' )}
                                            // onChange={(e)=>{this.handleNominationSubmission('Independent Group Leader','1243123', e);}}
                                        />
                                    }
                                    label="Independent Group Leader"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl  component="fieldset">
                            <FormLabel component="legend">Security Deposit (Registered Political Parties)</FormLabel>
                            <RadioGroup
                                aria-label="Gender"
                                name="fe2c2d7e-66de-406a-b887-1143023f8e72"
                                className={classes.group}
                                value={SecurityDepositRpp}
                                // onChange={this.handleChange.bind(this,"securityDeposite")}
                                // onClick={this.showAmount.bind(this)}
                                row
                            >
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    value="Yes"
                                    label="Security Deposit"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    label="No Security Deposit"
                                    value="No"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Grid item lg={3}>
                    {
                        this.state.showAmountRpp || showRpp ?
                    <TextField
                            id="formatted-numberformat-input"
                            label="Security Deposit Amount"
                            className={classes.textField}
                            prefix={'Rs '}
                            value={depositAmountRpp}
                            // onChange={this.handleChangeAmount('123213')}
                            margin="normal"
                            InputProps={{
                                inputComponent: this.NumberFormatCustom,
                                readOnly: true,
                              }}
                        /> : ''
                    }
                    </Grid> 
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl  component="fieldset">
                            <FormLabel component="legend">Security Deposit (Independent Groups)</FormLabel>
                            <RadioGroup
                                aria-label="Gender"
                                name="fe2c2d7e-66de-406a-b887-1143023f8e54"
                                className={classes.group}
                                value={SecurityDepositIg}
                                // onChange={this.handleChange.bind(this,"securityDeposite")}
                                // onClick={this.showAmountIg.bind(this)}
                                row
                            >
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    value="Yes"
                                    label="Security Deposit"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    label="No Security Deposit"
                                    value="No"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Grid item lg={3}>
                    {
                        this.state.showAmountIg || showIg ?
                    <TextField
                            id="formatted-numberformat-input"
                            label="Security Deposit Amount"
                            className={classes.textField}
                            prefix={'Rs '}
                            value={depositAmountIg}
                            // onChange={this.handleChangeAmount('1232132')}
                            margin="normal"
                            InputProps={{
                                inputComponent: this.NumberFormatCustom,
                                readOnly: true,
                              }}
                        /> : ''
                    }
                    </Grid> 
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl  component="fieldset">
                            <FormLabel component="legend">Objections</FormLabel>
                            <RadioGroup
                                aria-label="Objections"
                                name="253454355"
                                className={classes.group}
                                value={Objections}
                                // onChange={this.handleChange.bind(this,"Objections")}
                                row
                            >
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    label="Allowed&nbsp;"
                                    value="Allowed"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    label="Not Allowed"
                                    value="NotAllowed"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl  component="fieldset">
                            <FormLabel component="legend">Create Alliance</FormLabel>
                            <RadioGroup
                                aria-label="Create Alliance"
                                name="142343242343"
                                className={classes.group}
                                value={CreateAlliance}
                                // onChange={this.handleChange.bind(this,"Alliance")}
                                row
                            >
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    label="Allowed&nbsp;"
                                    value="Allowed"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    label="Not Allowed"
                                    value="NotAllowed"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                   
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Eligibility Criteria Check List</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {EligibilityCheckList.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell padding="checkbox" width="20">
                                     
                                            <Checkbox
                                                // checked={electionModule.eligibilityCheckList[row.value]}
                                                checked={(electionModule.eligibilityCheckList) ? electionModule.eligibilityCheckList.filter(item => {
                                                    return item.eligibilityConfigId === row.value;
                                                }).length > 0 : ''} 
                                                // onChange={(event)=>{this.handleEligibility(row, event);}}
                                                value={row.value} 
                                            />
                                            
                                            
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.label}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ElectionConfig.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ElectionConfig);