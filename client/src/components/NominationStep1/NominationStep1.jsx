import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar";
import CustomToolbarEdit from "./CustomToolbarEdit";
import CustomToolbarDelete from "./CustomToolbarDelete";
import PropTypes from "prop-types";
import { getNominationCandidates } from '../../modules/nomination/state/NominationAction';
import { candidateMessage } from '../../modules/election/state/ElectionAction';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { de } from 'date-fns/locale';
import { Button } from '@material-ui/core';
import CSVReader from 'react-csv-reader'
import axios from 'axios';
import _ from 'lodash';
import download from 'downloadjs';
import DownloadIcon from '@material-ui/icons/GetApp';
import { API_BASE_URL } from "../../config.js";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    grid: {
        alignItems: "left"
    },
});



class CustomizedTable extends React.Component {

    static propTypes = {
        value: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        change: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            nominations: [],
            candidateCount: '0',
            jsonSchemaProperties: null,
        }

    }

    handleForce = (data, fileInfo) => console.log("ddd",data, fileInfo);

    handleSubmit = (data, callback) => {

        // first get the keys out of the first sub array:
        const keys = data[0];

        // then map over the rest of the sub arrays:
        const result = data.slice(1).map(function(item) {
        
        // create an object with key names and item values:
        const obj = {};
        keys.forEach(function(k,i) {
            obj[k] = item[i];
        });
        return obj;
        });

        const { customProps,getNominationCandidates,candidateMessage } = this.props;
        let {jsonSchemaProperties} = this.state;
        let candidateKeyValues = { "nominationId" : customProps,
                                   "candidateData":[] };

            result.forEach(function(k,i) {
                var data2 = k;
            for (var configItem in data2) {
                if(jsonSchemaProperties[configItem]){
                    candidateKeyValues.candidateData.push(
                        {"candidateConfigId" : jsonSchemaProperties[configItem].id,
                        "value" : data2[configItem]});
                }
            }
        });

        var data3 = candidateKeyValues.candidateData,
        ids = ['1', '2', '3', '4', '5'],
        result4 = data3
        .reduce((r, o) => {
            let index = r.indices[o.candidateConfigId]++;
            r.data3[index] = r.data3[index] || [];
            r.data3[index].push(o);
            return r;
        }, { indices: Object.fromEntries(ids.map(k => [k, 0])), data3: [] })
        .data3;

        candidateKeyValues.candidateData = result4;
        data.forEach((element,i) => {
            
        });

        let url = 'nominations/candidates';

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
            candidateMessage('Candidate Added Sccessfully...');
            getNominationCandidates(customProps);
          })
          .catch(function (e) {
            const message = _.get(e, 'response.data.message');
            if(message) {
                candidateMessage(message);
            }
          });
    };

    componentDidMount() {
        const { customProps, getNominationCandidates, moduleId } = this.props;
        getNominationCandidates(customProps);

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
                // if(index) {
                //     progress = 0.5;
                // }
                this.setState({ ajaxState: this.state.ajaxState + progress, jsonSchemaProperties: properties});
            });
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleFileDownload = () => {
        axios.get(`${API_BASE_URL}/nominations/candidate-template/download`, {responseType: 'blob'}, {
        }).then((response) => {
            download(new Blob([response.data]), 'candidate_upload_template', "text/csv", response.headers['content-type']);
        }).catch(err => {
            console.log(err)
        });
    };

    render() {
        const { classes, CandidateList } = this.props;
        const rows = CandidateList;
        console.log("CandidateList", CandidateList);

        const columns = [
            {
                name: "ID",
                options: {
                    display: false
                }
            },
            {
                name: "NIC",
                options: {
                    display: true
                }
            },
            // {
            //     name: "Full Name",
            //     options: {
            //         display: true
            //     }
            // },
            {
                name: "Preferred Name",
                options: {
                    display: true
                }
            },
            // {
            //     name: "Date of Birth",
            //     options: {
            //         display: true
            //     }
            // },
            {
                name: "Gender",
                options: {
                    display: true
                }
            },
            {
                name: "Occupation",
                options: {
                    display: true
                }
            },
            {
                name: "Address",
                options: {
                    display: true
                }
            },
            // {
            //     name: "Electoral Division",
            //     options: {
            //         display: true
            //     }
            // },
            // {
            //     name: "Electoral Division Code",
            //     options: {
            //         display: true
            //     }
            // },
            {
                name: "Action",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <Grid container className={classes.grid} direction="row" justify="flex-start" alignItems="stretch" spacing={12}>
                                <Grid item lg={6}>
                                    <CustomToolbarEdit
                                        className={classes.grid}
                                        value={value}
                                        index={tableMeta.rowData[0]}
                                        change={event => updateValue(event)}
                                        customProps={customProps}
                                        modalType="Update"
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <CustomToolbarDelete
                                        className={classes.grid}
                                        value={value}
                                        index={tableMeta.rowData[0]}
                                        change={event => updateValue(event)}
                                        customProps={customProps}
                                        modalType="Delete"
                                    />
                                </Grid>
                            </Grid>
                        );
                    },
                }
            },
        ]


        const outputData = rows.map(Object.values);
        const { customProps } = this.props;
        const data = outputData;
        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            filter: false,
            customToolbar: () => {
                return (
                    <Grid container direction="row" justify="flex-end"  spacing={2}>
                        <Grid item lg={2}>
                            <CustomToolbar customProps={customProps} modalType="Add"  />
                        </Grid>
                        {/* <Grid style={{marginTop:15}} item lg={6}>
                        <DownloadIcon onClick={() => { this.handleFileDownload() }} color="red"/>
                        </Grid> */}
                        <Grid style={{marginTop:15}} item lg={6}>
                        <CSVReader onFileLoaded={this.handleSubmit} />
                        </Grid>
                    </Grid>
                );
            }
        };

       
        return (
            <MUIDataTable
                title={"Candidates list"}
                data={data}
                columns={columns}
                options={options}
            />
        );
    }
}

const mapStateToProps = ({ Nomination,Election }) => {
    const { getNominationCandidates } = Nomination;
    const moduleId = Election.ElectionTimeLineData.moduleId;
    const CandidateList = Nomination.getNominationCandidates;
    return { getNominationCandidates, CandidateList,moduleId };
};

const mapActionsToProps = {
    getNominationCandidates,
    candidateMessage
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CustomizedTable));

