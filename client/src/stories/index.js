import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import {withKnobs, text, boolean, number, object} from '@storybook/addon-knobs';
// import { linkTo } from "@storybook/addon-links";

import DatePickers from "../components/DatePicker";
import Progress from "../components/Progress/Progress";
import Table from "../components/common/Table";
import ExpansionPanel from "../components/common/ExpansionPanel";
import FileUpload from "../components/common/FileUpload/";
import NominationForm from "../components/NominationForm";
import DynamicForm from "../components/DynamicForm";

import { tableHeadings, tableData, expansionPanelData } from "./_data";

storiesOf("Table", module).add("default", () => (
  <Table headings={tableHeadings} rows={tableData} />
));

storiesOf("ExpansionPanel", module).add("default", () => (
  <ExpansionPanel data={expansionPanelData} />
));

storiesOf("DatePicker", module).add("default", () => <DatePickers />);

storiesOf("Progress", module).add("default", () => <Progress />);

storiesOf("FileUpload", module).add("default", () => (
  <NominationForm
    allowedTypes={[]}
    allowedSize={15}
    multiple={false}
    onUploadFiles={action("onUploadFiles triggered.")}
  />
));

const dynFormStory = storiesOf("DynamicForm", module);
dynFormStory.addDecorator(withKnobs);
dynFormStory.add('default', () => {
  const jsonSchema = {
    "title": "A registration form",
    "description": "A simple form example.",
    "type": "object",
    "required": [
      "firstName",
      "lastName"
    ],
    "properties": {
      "preferredName": {
        "id": 1,
        "type": "string",
        "title": "Preferred Name",
        "default": "Manu Perera x"
      },
      "secret": {
        "id": 2,
        "type": "hidden",
        "default": "42"
      },
      "occupation": {
        "id": 3,
        "type": "string",
        "title": "Occupation"
      },
      "age": {
        "id": 4,
        "type": "integer",
        "title": "Age"
      },
      "nic": {
        "id": 5,
        "type": "string",
        "title": "NIC"
      },
      "password": {
        "id": 6,
        "type": "string",
        "title": "Password",
        "minLength": 3
      },
      "telephone": {
        "id": 7,
        "type": "string",
        "title": "Telephone",
        "minLength": 10
      }
    }
  };

  const value = object("jsonSchema", jsonSchema);

  return (<DynamicForm onSubmit={action('onSubmit')} jsonSchema={value}/>);
});
