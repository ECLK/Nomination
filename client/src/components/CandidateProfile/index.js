import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Hidden from '@material-ui/core/Hidden';
import Notifier, { openSnackbar } from '../Notifier';
import { getNominationCandidates } from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';
import DynamicForm from "../DynamicForm";
import _ from 'lodash';


const styles = theme => ({
});

class TextFields extends React.Component {

    state ={
        ajaxState: "LOADING",
        jsonSchemaProperties: null,
        formData: null
    };

    componentDidMount() {
        const { moduleId } = this.props;
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
                const keyName = _.camelCase(config['key_name']);
                const schema = config["json_schema"];
                if (schema) {
                    properties[keyName] = JSON.parse(schema);
                } else {
                    properties[keyName] = { "type": "string"};
                }
                properties[keyName].title = config['description'];
                properties[keyName].id = config['candidate_config_id'];
            }

            this.setState({ ajaxState: "DONE", jsonSchemaProperties: properties});
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


    handleSubmit = (data) => {
        // this.refs.btn.setAttribute("disabled", "disabled");
        const { customProps,getNominationCandidates } = this.props;
        let {jsonSchemaProperties} = this.state;
        let candidateKeyValues = { "nominationId" : "aba7c1bb-15b0-46ec-bfb3-6ce26a919ace",
                                   "candidateData":[] };
        for (var configItem in data) {
            candidateKeyValues.candidateData.push(
                {"candidateConfigId" : jsonSchemaProperties[configItem].id,
                 "value" : data[configItem]});
        }
        axios({
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: 'nominations/candidates',
            data: candidateKeyValues
        })
        .then(function (response) {
            setTimeout(() => {
                openSnackbar({ message: 'Candidate Added Sccessfully...' });
            }, 10);
            getNominationCandidates(customProps);
          })
          .catch(function (e) {
            const message = _.get(e, 'response.data.message');
            if(message) {
                setTimeout(() => {
                    openSnackbar({ message });
                }, 10);
            }
          });
    };

    render() {
        let {ajaxState, jsonSchemaProperties} = this.state;
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

        if (ajaxState === "LOADING") {
            return <div>Loading form...</div>;
        } else {
            return (<div>
                        <Notifier/>
                        <DynamicForm jsonSchema={jsonSchema}  onSubmit={this.handleSubmit}/>
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
    getNominationCandidates
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TextFields));
