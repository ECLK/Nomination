import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { SupportingDocuments } from './Fixtures';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import _ from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IdentityIcon from '@material-ui/icons/PermIdentity';
import ChartIcon from '@material-ui/icons/ShowChart';
import SecurityIcon from '@material-ui/icons/Security';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import OtherIcon from '@material-ui/icons/DragIndicator';



const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: 12,
    },
    button: {
        margin: 1,
    },
    leftIcon: {
        marginRight: 1,
    },
    rootList: {
        width: '100%',
        maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
    },
});


class CandidateForm extends React.Component {
    state = {};

    constructor() {
        super();
        this.handleChangeSupportingDocuments = this.handleChangeSupportingDocuments.bind(this);
        this.handleChangeCandidateFormConfig = this.handleChangeCandidateFormConfig.bind(this);
    }

    handleChangeSupportingDocuments(event) {
        let supportingDocuments = this.props.electionModule.supportingDocuments;
        // remove item in any case.
        supportingDocuments = supportingDocuments.filter(item => {
            return item.supportDocConfigId !== event.target.value
        });
        if (event.target.checked) {
            supportingDocuments.push({ supportDocConfigId: event.target.value })
        }
        this.props.electionChanged({ ...this.props.electionModule, supportingDocuments });
    }

    handleChangeCandidateFormConfig(event) {
        let candidateFormConfiguration = this.props.electionModule.candidateFormConfiguration;
        // remove item in any case.
        candidateFormConfiguration = candidateFormConfiguration.filter(item => {
            return item.candidateConfigId !== event.target.value
        });
        if (event.target.checked) {
            candidateFormConfiguration.push({ candidateConfigId: event.target.value })
        }
        this.props.electionChanged({ ...this.props.electionModule, candidateFormConfiguration });
    }

    supportDocConfigId

    render() {
        const classes = styles();
        const electionModule = this.props.electionModule;

        const CandidateFormConfig = this.props.candidateConfigs;
        let middle = (CandidateFormConfig.length) / 2;
        middle += ((CandidateFormConfig.length) % 2) ? 1 : 0;
        const columnOne = CandidateFormConfig.slice(0, middle);
        const columnTwo = CandidateFormConfig.slice(middle);

//---------------Start candidate supporting docs------------------

        const SupportingDocuments = this.props.candidateSupportingDocs;
        let CandidateIdentityDocs = [];
        let CandidateRepresentationDocs = [];
        let CandidateSecurityDepositeDocs = [];
        let CandidateFinancialDocs = [];
        let CandidateOtherDocs = [];
        SupportingDocuments.map((element) => {
            if(element.category==='IDENTITY'){
                CandidateIdentityDocs.push(element)
            }
            if(element.category==='REPRESENTATION'){
                CandidateRepresentationDocs.push(element)
            }
            if(element.category==='SECURITY DEPOSIT'){
                CandidateSecurityDepositeDocs.push(element)
            }
            if(element.category==='FINANCIAL'){
                CandidateFinancialDocs.push(element)
            }
            if(element.category==='OTHER'){
                CandidateOtherDocs.push(element)
            }
        });
        let ismiddle = (CandidateIdentityDocs.length) / 2;
        ismiddle += ((CandidateIdentityDocs.length) % 2) ? 1 : 0;
        const iscolumnOne = CandidateIdentityDocs.slice(0, ismiddle);
        const iscolumnTwo = CandidateIdentityDocs.slice(ismiddle);

        let rsmiddle = (CandidateRepresentationDocs.length) / 2;
        rsmiddle += ((CandidateRepresentationDocs.length) % 2) ? 1 : 0;
        const rscolumnOne = CandidateRepresentationDocs.slice(0, rsmiddle);
        const rscolumnTwo = CandidateRepresentationDocs.slice(rsmiddle);

        let sdsmiddle = (CandidateSecurityDepositeDocs.length) / 2;
        sdsmiddle += ((CandidateSecurityDepositeDocs.length) % 2) ? 1 : 0;
        const sdscolumnOne = CandidateSecurityDepositeDocs.slice(0, sdsmiddle);
        const sdscolumnTwo = CandidateSecurityDepositeDocs.slice(sdsmiddle);

        let fsmiddle = (CandidateFinancialDocs.length) / 2;
        fsmiddle += ((CandidateFinancialDocs.length) % 2) ? 1 : 0;
        const fscolumnOne = CandidateFinancialDocs.slice(0, fsmiddle);
        const fscolumnTwo = CandidateFinancialDocs.slice(fsmiddle);

        let otsmiddle = (CandidateOtherDocs.length) / 2;
        otsmiddle += ((CandidateOtherDocs.length) % 2) ? 1 : 0;
        const otscolumnOne = CandidateOtherDocs.slice(0, otsmiddle);
        const otscolumnTwo = CandidateOtherDocs.slice(otsmiddle);
//---------------Start nomination supporting docs------------------

        const NominationSupportingDocuments = this.props.nominationSupportingDocs;
        let NominationIdentityDocs = [];
        let NominationRepresentationDocs = [];
        let NominationSecurityDepositeDocs = [];
        let NominationFinancialDocs = [];
        let NominationOtherDocs = [];
        NominationSupportingDocuments.map((element) => {
            if(element.category==='IDENTITY'){
                NominationIdentityDocs.push(element)
            }
            if(element.category==='REPRESENTATION'){
                NominationRepresentationDocs.push(element)
            }
            if(element.category==='SECURITY DEPOSIT'){
                NominationSecurityDepositeDocs.push(element)
            }
            if(element.category==='FINANCIAL'){
                NominationFinancialDocs.push(element)
            }
            if(element.category==='OTHER'){
                NominationOtherDocs.push(element)
            }
        });
        let nismiddle = (NominationIdentityDocs.length) / 2;
        nismiddle += ((NominationIdentityDocs.length) % 2) ? 1 : 0;
        const niscolumnOne = NominationIdentityDocs.slice(0, nismiddle);
        const niscolumnTwo = NominationIdentityDocs.slice(nismiddle);

        let nrsmiddle = (NominationRepresentationDocs.length) / 2;
        nrsmiddle += ((NominationRepresentationDocs.length) % 2) ? 1 : 0;
        const nrscolumnOne = NominationRepresentationDocs.slice(0, nrsmiddle);
        const nrscolumnTwo = NominationRepresentationDocs.slice(nrsmiddle);

        let nsdsmiddle = (NominationSecurityDepositeDocs.length) / 2;
        nsdsmiddle += ((NominationSecurityDepositeDocs.length) % 2) ? 1 : 0;
        const nsdscolumnOne = NominationSecurityDepositeDocs.slice(0, nsdsmiddle);
        const nsdscolumnTwo = NominationSecurityDepositeDocs.slice(nsdsmiddle);

        let nfsmiddle = (NominationFinancialDocs.length) / 2;
        nfsmiddle += ((NominationFinancialDocs.length) % 2) ? 1 : 0;
        const nfscolumnOne = NominationFinancialDocs.slice(0, nfsmiddle);
        const nfscolumnTwo = NominationFinancialDocs.slice(nfsmiddle);
        
        let notsmiddle = (NominationOtherDocs.length) / 2;
        notsmiddle += ((NominationOtherDocs.length) % 2) ? 1 : 0;
        const notscolumnOne = NominationOtherDocs.slice(0, notsmiddle);
        const notscolumnTwo = NominationOtherDocs.slice(notsmiddle);
//---------------Start objection supporting docs------------------

        const ObjectionSupportingDocuments = this.props.objectionSupportingDocs;
        let ObjectionIdentityDocs = [];
        let ObjectionRepresentationDocs = [];
        let ObjectionSecurityDepositeDocs = [];
        let ObjectionFinancialDocs = [];
        let ObjectionOtherDocs = [];

        ObjectionSupportingDocuments.map((element) => {
            if(element.category==='IDENTITY'){
                ObjectionIdentityDocs.push(element)
            }
            if(element.category==='REPRESENTATION'){
                ObjectionRepresentationDocs.push(element)
            }
            if(element.category==='SECURITY DEPOSIT'){
                ObjectionSecurityDepositeDocs.push(element)
            }
            if(element.category==='FINANCIAL'){
                ObjectionFinancialDocs.push(element)
            }
            if(element.category==='OTHER'){
                ObjectionOtherDocs.push(element)
            }
        });
        let oismiddle = (ObjectionIdentityDocs.length) / 2;
        oismiddle += ((ObjectionIdentityDocs.length) % 2) ? 1 : 0;
        const oiscolumnOne = ObjectionIdentityDocs.slice(0, oismiddle);
        const oiscolumnTwo = ObjectionIdentityDocs.slice(oismiddle);

        let orsmiddle = (ObjectionRepresentationDocs.length) / 2;
        orsmiddle += ((ObjectionRepresentationDocs.length) % 2) ? 1 : 0;
        const orscolumnOne = ObjectionRepresentationDocs.slice(0, orsmiddle);
        const orscolumnTwo = ObjectionRepresentationDocs.slice(orsmiddle);

        let osdsmiddle = (ObjectionSecurityDepositeDocs.length) / 2;
        osdsmiddle += ((ObjectionSecurityDepositeDocs.length) % 2) ? 1 : 0;
        const osdscolumnOne = ObjectionSecurityDepositeDocs.slice(0, osdsmiddle);
        const osdscolumnTwo = ObjectionSecurityDepositeDocs.slice(osdsmiddle);

        let ofsmiddle = (ObjectionFinancialDocs.length) / 2;
        ofsmiddle += ((ObjectionFinancialDocs.length) % 2) ? 1 : 0;
        const ofscolumnOne = ObjectionFinancialDocs.slice(0, ofsmiddle);
        const ofscolumnTwo = ObjectionFinancialDocs.slice(ofsmiddle);

        let ootsmiddle = (ObjectionOtherDocs.length) / 2;
        ootsmiddle += ((ObjectionOtherDocs.length) % 2) ? 1 : 0;
        const ootscolumnOne = ObjectionOtherDocs.slice(0, ootsmiddle);
        const ootscolumnTwo = ObjectionOtherDocs.slice(ootsmiddle);
       
//---------------Start payment supporting docs------------------

        const PaymentSupportingDocuments = this.props.paymentSupportingDocs;
        let PaymentIdentityDocs = [];
        let PaymentRepresentationDocs = [];
        let PaymentSecurityDepositeDocs = [];
        let PaymentFinancialDocs = [];
        let PaymentOtherDocs = [];

        PaymentSupportingDocuments.map((element) => {
            if(element.category==='IDENTITY'){
                PaymentIdentityDocs.push(element)
            }
            if(element.category==='REPRESENTATION'){
                PaymentRepresentationDocs.push(element)
            }
            if(element.category==='SECURITY DEPOSIT'){
                PaymentSecurityDepositeDocs.push(element)
            }
            if(element.category==='FINANCIAL'){
                PaymentFinancialDocs.push(element)
            }
            if(element.category==='OTHER'){
                PaymentOtherDocs.push(element)
            }
        });
        let pismiddle = (PaymentIdentityDocs.length) / 2;
        pismiddle += ((PaymentIdentityDocs.length) % 2) ? 1 : 0;
        const piscolumnOne = PaymentIdentityDocs.slice(0, pismiddle);
        const piscolumnTwo = PaymentIdentityDocs.slice(pismiddle);

        let prsmiddle = (PaymentRepresentationDocs.length) / 2;
        prsmiddle += ((PaymentRepresentationDocs.length) % 2) ? 1 : 0;
        const prscolumnOne = PaymentRepresentationDocs.slice(0, prsmiddle);
        const prscolumnTwo = PaymentRepresentationDocs.slice(prsmiddle);

        let psdsmiddle = (PaymentSecurityDepositeDocs.length) / 2;
        psdsmiddle += ((PaymentSecurityDepositeDocs.length) % 2) ? 1 : 0;
        const psdscolumnOne = PaymentSecurityDepositeDocs.slice(0, psdsmiddle);
        const psdscolumnTwo = PaymentSecurityDepositeDocs.slice(psdsmiddle);

        let pfsmiddle = (PaymentFinancialDocs.length) / 2;
        pfsmiddle += ((PaymentFinancialDocs.length) % 2) ? 1 : 0;
        const pfscolumnOne = PaymentFinancialDocs.slice(0, pfsmiddle);
        const pfscolumnTwo = PaymentFinancialDocs.slice(pfsmiddle);

        let potsmiddle = (ObjectionOtherDocs.length) / 2;
        potsmiddle += ((ObjectionOtherDocs.length) % 2) ? 1 : 0;
        const potscolumnOne = ObjectionOtherDocs.slice(0, potsmiddle);
        const potscolumnTwo = ObjectionOtherDocs.slice(potsmiddle);
        return (
            <div className={classes.root}>
                <Typography variant="h6">
                    Candidate Form Configuration
                </Typography>
                <FormControl component="fieldset" className={classes.formControl}>
                    {/* <Button variant="contained" disabled color="secondary" className={classes.button}>
                    <AddIcon className={classes.leftIcon} />
                    Add New
                </Button> */}
                    <FormGroup>
                        {columnOne.map((element) => {
                            return (<FormControlLabel
                                control={
                                    <Checkbox
                                        checked={(electionModule.candidateFormConfiguration) ? electionModule.candidateFormConfiguration.filter(item => {
                                            return item.candidateConfigId === element.key;
                                        }).length > 0 : ''}
                                        onChange={this.handleChangeCandidateFormConfig}
                                        value={element.key}
                                    />
                                }
                                label={element.value}
                            />);
                        })}
                    </FormGroup>
                </FormControl>
                <FormControl required component="fieldset" className={classes.formControl}>
                    <FormGroup>
                        {columnTwo.map((element) => {
                            return (<FormControlLabel
                                control={
                                    <Checkbox
                                        checked={(electionModule.candidateFormConfiguration) ? electionModule.candidateFormConfiguration.filter(item => {
                                            return item.candidateConfigId === element.key;
                                        }).length > 0 : ''}
                                        onChange={this.handleChangeCandidateFormConfig}
                                        value={element.key}
                                    />
                                }
                                label={element.value}
                            />);
                        })}
                    </FormGroup>
                </FormControl>
                {(this.props.errorTextCandidateConfig) ? <Typography style={{ color: 'red' }} variant="subtitle1" gutterBottom>Select at least one field!</Typography> : ''}

                <br /><br />
                <Typography variant="h6">
                    Candidate Supporting Documents
                </Typography>
                <FormControl required component="fieldset" className={classes.formControl}>
                    <List className={classes.rootList}>
                    {(iscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <IdentityIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Identity" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {iscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {iscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                         :  ''}
                        <Divider variant="inset" component="li" />
                        {(rscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ChartIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Representation" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {rscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {rscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                        :  ''}
                        <Divider variant="inset" component="li" />
                        {(fscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <MoneyIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Financial" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {fscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {fscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                        :  ''}
                        <Divider variant="inset" component="li" />
                        {(sdscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <SecurityIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Security Deposit" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {sdscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {sdscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                         :  ''}
                         <Divider variant="inset" component="li" />
                        {(otscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <OtherIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Other" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {otscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {otscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                         :  ''}
                    </List>
                </FormControl>
                <br /><br />
                <Typography variant="h6">
                    Nomination Supporting Documents
                </Typography>
                <FormControl required component="fieldset" className={classes.formControl}>
                    <List className={classes.rootList}>
                    {(niscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <IdentityIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Identity" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {niscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {niscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                         :  ''}
                        <Divider variant="inset" component="li" />
                        {(nrscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ChartIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Representation" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {nrscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {nrscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                        :  ''}
                        <Divider variant="inset" component="li" />
                        {(nfscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <MoneyIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Financial" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {nfscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {nfscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                        :  ''}
                        <Divider variant="inset" component="li" />
                        {(nsdscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <SecurityIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Security Deposit" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {nsdscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {nsdscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                         :  ''}
                          <Divider variant="inset" component="li" />
                        {(notscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <OtherIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Other" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {notscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {notscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                         :  ''}
                    </List>
                </FormControl>
                <br /><br />
                <Typography variant="h6">
                    Objection Supporting Documents
                </Typography>
                <FormControl required component="fieldset" className={classes.formControl}>
                    <List className={classes.rootList}>
                    {(oiscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <IdentityIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Identity" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {oiscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {oiscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                         :  ''}
                        <Divider variant="inset" component="li" />
                        {(orscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ChartIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Representation" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {orscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {orscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                        :  ''}
                        <Divider variant="inset" component="li" />
                        {(ofscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <MoneyIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Financial" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {ofscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {ofscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                        :  ''}
                        <Divider variant="inset" component="li" />
                        {(osdscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <SecurityIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Security Deposit" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {osdscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {osdscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                         :  ''}
                          <Divider variant="inset" component="li" />
                        {(ootscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <OtherIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Other" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {ootscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {ootscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                         :  ''}
                    </List>
                </FormControl>
                <br /><br />
                <Typography variant="h6">
                    Payment Supporting Documents
                </Typography>
                <FormControl required component="fieldset" className={classes.formControl}>
                    <List className={classes.rootList}>
                    {(piscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <IdentityIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Identity" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {piscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {piscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                         :  ''}
                        <Divider variant="inset" component="li" />
                        {(prscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ChartIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Representation" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {prscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {prscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                        :  ''}
                        <Divider variant="inset" component="li" />
                        {(pfscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <MoneyIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Financial" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {pfscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {pfscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                        :  ''}
                        <Divider variant="inset" component="li" />
                        {(psdscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <SecurityIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Security Deposit" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {psdscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {psdscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                         :  ''}
                          <Divider variant="inset" component="li" />
                        {(potscolumnOne.length>0) ?
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <OtherIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Other" secondary="Category" />
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {potscolumnOne.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key} />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    {potscolumnTwo.map((element) => {
                                        return (<FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={(electionModule.supportingDocuments) ? electionModule.supportingDocuments.filter(item => {
                                                        return item.supportDocConfigId === element.key;
                                                    }).length > 0 : ''}
                                                    onChange={this.handleChangeSupportingDocuments}
                                                    value={element.key}
                                                />
                                            }
                                            label={element.value}
                                        />);
                                    })}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                         :  ''}
                    </List>
                </FormControl>
            </div>
        );
    }
}

CandidateForm.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(CandidateForm);