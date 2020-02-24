import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Hidden from '@material-ui/core/Hidden';
import Notifier, { openSnackbar } from '../Notifier';
import { getNominationCandidates,getCandidateSupportingDocs } from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';
import DynamicForm from "../DynamicForm";
import _ from 'lodash';


const styles = theme => ({
});

class TextFields extends React.Component {

    state ={
        ajaxState: 0,
        jsonSchemaProperties: null,
        formData: null
    };

    componentDidMount() {
        const { moduleId } = this.props;
        const { index,getNominationCandidates,customProps,openSnackbar } = this.props;

        if(index) {

            axios.get(`nominations/${customProps}/candidates/${index}`)
                .then(res => {
                    console.log(res);
                    const formData = res.data[0];
                    //TODO: do this to all 'date' type fields
                    
                    formData["DATE_OF_BIRTH"] = Number(Date.parse(formData["DATE_OF_BIRTH"]));
                    this.setState({ajaxState: this.state.ajaxState + 0.5,  formData });
                });
        }
        this.props.getCandidateSupportingDocs(index);



        axios.get("modules/"+ moduleId +"/candidate-form-config", {}).then(
        (response) => {
            var properties = {
              // TODO: remove following three
              "counsilName": { "type": "hidden", "title": "counsilName", "default": "council", "id": 999 },
              "electoralDivisionCode": { "type": "hidden", "title": "electoralDivisionCode", "default": "K01", "id": 998 },
              "electoralDivisionName": { "type": "hidden", "title": "electoralDivisionName", "default": "kalutara", "id": 997 },

              "nominationId": { "type": "hidden", "title": "nominationId", "default": this.props.customProps, "id": 996},
            };

            const sortedData = _.orderBy(response.data, ['candidate_config_id'], "asc");
            var configLength = sortedData.length;
            for (var i = 0; i < configLength; i++) {
                const config = sortedData[i];
                const keyName = config['key_name'];
                const schema = config["json_schema"];
                if (schema) {
                    properties[keyName] = JSON.parse(schema);
                } else {
                    properties[keyName] = { "type": "string"};
                }
                properties[keyName].title = config['description'];
                properties[keyName].id = config['candidate_config_id'];
            }
            let progress = 1;
            if(index) {
                progress = 0.5;
            }
            this.setState({ ajaxState: this.state.ajaxState + progress, jsonSchemaProperties: properties});
        });
    }

    


    handleChange = name => event => {
        const { customProps } = this.props;
        this.setState({
            nominationId: customProps
        });
        this.setState({
            [name]: event.target.value,
        });
    };
    
    handleChangeButton = (e) => {
        const { onCloseModal } = this.props;
        if(e.currentTarget.value==="Submit&Clouse"){
            onCloseModal();
        }
    }


    handleSubmit = (data, callback) => {
        // this.refs.btn.setAttribute("disabled", "disabled");
        const { index, customProps,getNominationCandidates } = this.props;
        let {jsonSchemaProperties} = this.state;
        let candidateKeyValues = { "nominationId" : customProps,
                                   "candidateData":[] };
        for (var configItem in data) {
            if(jsonSchemaProperties[configItem]){
                candidateKeyValues.candidateData.push(
                    {"candidateConfigId" : jsonSchemaProperties[configItem].id,
                    "value" : data[configItem]});
            }
        }

        let url = 'nominations/candidates';
        if (index) {
            url = `nominations/${index}/candidates`;
        }

        const onCloseModal = this.props.onCloseModal;
        axios({
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: url,
            data: candidateKeyValues
        })
        .then(function (response) {
            callback({success:response.status == 201});
            setTimeout(() => {
                openSnackbar({ message: 'Candidate Added Sccessfully...' });
            }, 10);
            getNominationCandidates(customProps);
            if(index) {
                onCloseModal();
            }
          })
          .catch(function (e) {
            callback({success:false})
            const message = _.get(e, 'response.data.message');
            if(message) {
                setTimeout(() => {
                    openSnackbar({ message });
                }, 10);
            }
          });
    };

    render() {
        let {ajaxState, jsonSchemaProperties, formData} = this.state;
        const jsonSchema = {
            "title": "Create Nomination",
            "description": "Add a new nomiantion",
            "type": "object",
            "required": [
              "firstName",
              "lastName"
            ],
            "properties": jsonSchemaProperties
          };

        if (ajaxState < 1) {
            return <div>Loading form...</div>;
        } else {
            return (<div>
                        <Notifier/>
                        <DynamicForm defaultFormData={formData} jsonSchema={jsonSchema}  onSubmit={this.handleSubmit}/>
                    </div>);
        }
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Nomination, Election}) => {
    const moduleId = Election.ElectionTimeLineData.moduleId;
    const {getNominationCandidates} = Nomination;
    return {getNominationCandidates, moduleId};
  };

  const mapActionsToProps = {
    getNominationCandidates,
    getCandidateSupportingDocs
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TextFields));
