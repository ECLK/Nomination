import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";

import DatePickers from "../components/DatePicker";
import Progress from "../components/Progress/Progress";
import Table from "../components/common/Table";
import ExpansionPanel from "../components/common/ExpansionPanel";
import FileUpload from "../components/common/FileUpload/";
import NominationForm from "../components/NominationForm";

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
