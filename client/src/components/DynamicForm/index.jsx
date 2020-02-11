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
    this.state = { formData: {} };
    this.createDefaultFromDataMap(props.jsonSchema.properties, null);
  }

  createDefaultFromDataMap(properties, prevProperties) {
    const state = this.state;
    let needReRender = false;
    for (const [propName, value] of Object.entries(properties)) {
      if (!prevProperties || value['default'] !== prevProperties[propName]['default']) {
        state.formData[propName] = value['default'] || "";
        needReRender = true;
      }
    }
    if (needReRender) {
      this.setState(state);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.createDefaultFromDataMap(this.props.jsonSchema.properties, prevProps.jsonSchema.properties);
  }

  onChange(event) {
    let { formData } = this.state;
    // formData[event.target.id]
    let value = event.target.value;
    if (event.target.type === 'date') {
      value = Date.parse(event.target.value);
    }
    let newState = update(this.state, {
      formData: {
        [event.target.name]: { $set: value }
      }
    });
    console.log(newState);
    this.setState(newState);
  }

  onSubmit(event) {
    this.props.onSubmit(this.state.formData);
  }

  render() {
    let { classes, jsonSchema } = this.props;
    let { formData } = this.state;
    let items = [];
    for (const [propName, propSpec] of Object.entries(jsonSchema.properties)) {
      const propValue = formData[propName];
      if (Array.isArray(propSpec.oneOf)) {
        const d = propSpec.oneOf.map(x => <MenuItem value={x.enum[0]}>{x.title}</MenuItem>);
        items.push(<FormControl fullWidth key={propName + "-label"}>
          <InputLabel htmlFor={propName}>{propSpec.title}</InputLabel>
          <Select name={propName} value={formData[propName]} onChange={this.onChange}>
            {d}
          </Select>
        </FormControl>);
      } else if (propSpec.format === "date") {
        let d = new Date(propValue);
        let v =  isNaN(d) ? propValue : d.toISOString().slice(0, 10);
        items.push(<FormControl fullWidth key={propName + "-label"}>
          <InputLabel shrink="true" htmlFor={propName}>{propSpec.title}</InputLabel>
          <Input type="date" value={v} name={propName} onChange={this.onChange} />
        </FormControl>);
      } else if (propSpec.type !== "hidden") {
        items.push(<FormControl fullWidth key={propName + "-label"}>
          <InputLabel htmlFor={propName}>{propSpec.title}</InputLabel>
          <Input value={formData[propName]} name={propName} onChange={this.onChange} />
        </FormControl>);
      }
    }

    return <div>
      {items}
      <Button onClick={this.onSubmit} variant="contained" type="submit" value="Submit&New" color="primary"
        className={classes.submit}>
        Save & New
      </Button>
    </div>;
  }
}

export default withStyles(styles)(DynamicForm);
