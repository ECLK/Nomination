import React from 'react';
import Button from '@material-ui/core/Button';
import { API_BASE_URL } from "../../config.js";
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import update from 'immutability-helper';
import _ from 'lodash';

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit
  },

});


class DynamicForm extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {submitting : false, progress:{}, formData:props.defaultFormData || {}};
    this.createDefaultFromDataMap(null, null);
  }

  createDefaultFromDataMap(prevProperties, prevState) {
    const properties  = this.props.jsonSchema.properties;
    const state = this.state;
    let needReRender = false;
    for (const [propName, value] of Object.entries(properties || {})) {
      // if (!prevState || value['default'] !== prevProperties[propName]['default']) { 
        // TODO: re-enable default values
        const prevFormData = state.formData[propName];
        const prevProgress = JSON.stringify(state.progress[propName]);
        state.formData[propName] = (this.props.defaultFormData && this.props.defaultFormData[propName]) 
                                   || value['default'] || "";
        state.progress[propName] = {edited:false, valid:"unknown"};
        needReRender = needReRender || (prevFormData != state.formData[propName]) 
                                    || (prevProgress != JSON.stringify(state.progress[propName]));
      // }
    }
    if (needReRender) {
      this.setState(state);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props != prevProps) { // not just a state change
      this.createDefaultFromDataMap(prevProps.jsonSchema.properties, prevState);
    }
  }

  onChange(event) {
    if(event.target.name === 'ADDRESS'){
      this.setState(this.editValue(this.state, event.target.name, event.target.value.replace(/[^a-zA-Z0-9,/ ]/g, '')));
    }else{
      this.setState(this.editValue(this.state, event.target.name, event.target.value.replace(/[^a-zA-Z0-9 ]/g, '')));
    }
  }

  editValue(state, name, value){
    let { jsonSchema } = this.props;
    let valid = 'unknown';
    const format = jsonSchema.properties[name].format;
    // const {edited} = progress[event.target.name];
    
    if (jsonSchema.properties[name].type === 'hidden') {
      valid = 'true';
    } else if (format === 'date') {
      if(_.isString(value)) {
        value = Date.parse(value);
      }
      valid = String(this.isAdult(value));
    } else if (format === 'lknic') {
      valid =  (/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/.test(value)).toString();
    } else {
      valid = (!!value).toString();
    }
    let progressValue = {edited:true, valid};
    let delta = {
      progress: {
        [name]: { $set: progressValue }
      },
      formData: {
        [name]: { $set: value }
      }
    };
    return update(state, delta);
  }

  isAdult(birthday) { // birthday is a date
      if (_.isNaN(birthday)) {
        return false;
      }
      var ageDifMs = Date.now() - birthday;
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970) > 14;
  }

  onSubmitCallback(submitReq) {
    const state = this.state;
    if(submitReq.success){
      const properties = this.props.jsonSchema.properties
      for (const [propName, value] of Object.entries(properties)) {
        // state.formData[propName] = value['default'] || "";
        state.progress[propName] = {edited:false, valid:"unknown"};
      }
    } 
    state.submitting = false;
    this.setState(state);
  }

  onSubmit(event) {
    let { jsonSchema } = this.props;
    let { formData } = this.state;
    let state = this.state;
    let valid = true;
    for (const [propName, propSpec] of Object.entries(jsonSchema.properties)) {
      const propValue = formData[propName];
      state = this.editValue(state,propName,propValue)
      valid = valid && state.progress[propName].valid === "true";
    }
    this.setState(state);
    if(valid) {
      state.submitting = true;
      this.setState(state);
      this.props.onSubmit(this.state.formData, this.onSubmitCallback.bind(this));
    }
  }


  render() {
    let { classes, jsonSchema,index } = this.props;
    let { formData, progress, submitting } = this.state;
    let items = [];
    for (const [propName, propSpec] of Object.entries(jsonSchema.properties || {})) {
      const propValue = formData[propName];
      const {edited, valid} = progress[propName];
      const isError = edited === true && valid !== "true";
      if (Array.isArray(propSpec.oneOf)) {
        const d = propSpec.oneOf.map(x => <MenuItem value={x.enum[0]}>{x.title}</MenuItem>);
        items.push(<FormControl fullWidth key={propName + "-label"}>
          <InputLabel shrink={!!formData[propName]} htmlFor={propName}>{propSpec.title}</InputLabel>
          <Select  error={isError} name={propName} value={formData[propName]} onChange={this.onChange}>
            {d}
          </Select>
        </FormControl>);
      } else if (propSpec.format === "date") {
        let d = new Date(propValue);
        let v =  isNaN(d) ? propValue : d.toISOString().slice(0, 10);
        items.push(<FormControl fullWidth key={propName + "-label"}>
          <InputLabel shrink="true" htmlFor={propName}>{propSpec.title}</InputLabel>
          <Input error={isError} type="date" value={v} name={propName} onChange={this.onChange} />
        </FormControl>);
      } else if (propSpec.type !== "hidden") {
        items.push(<FormControl fullWidth key={propName + "-label"}>
          <InputLabel htmlFor={propName}>{propSpec.title}</InputLabel>
          <Input error={isError} value={formData[propName]} name={propName} onChange={this.onChange} />
        </FormControl>);
      }
    }

    return <div>
      {items}
      {
        (index) ? <Button disabled={submitting} onClick={this.onSubmit} variant="contained" type="submit" value="Submit&New" color="primary"
        className={classes.submit}>
        Update
      </Button> :
        <Button disabled={submitting} onClick={this.onSubmit} variant="contained" type="submit" value="Submit&New" color="primary"
        className={classes.submit}>
        Save & New
      </Button>
      }
    </div>;
  }
}

export default withStyles(styles)(DynamicForm);
