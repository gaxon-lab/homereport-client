import React, {Component} from 'react';
import UploaderContainer from "./UploaderContainer";


class DocumentUploading extends Component {

  render() {
    const {reportDocuments, propertyQuestionnaire} = this.props;
    let termConditionDocument, energyDocument, surveyDocument;
    if (reportDocuments) {
      termConditionDocument = reportDocuments.find(document => document.caption === "term_cond");
      energyDocument = reportDocuments.find(document => document.caption === "eng_cert");
      surveyDocument = reportDocuments.find(document => document.caption === "single_sur");
    }
    return (
      <div>
        <div className="gx-text-grey gx-mb-2">Documents:</div>

        <UploaderContainer caption = "property_quest"
                           title="Property Questionnaire"
                           token={this.props.token}
                           document={propertyQuestionnaire}/>

        <UploaderContainer caption="term_cond"
                           document={termConditionDocument}
                           onUploadDocument={this.props.onUploadDocument}
                           title="Terms and Conditions"/>

        <UploaderContainer caption="eng_cert"
                           document={energyDocument}
                           onUploadDocument={this.props.onUploadDocument}
                           title="Energy Performance Certificate"/>

        <UploaderContainer caption="single_sur"
                           document={surveyDocument}
                           onUploadDocument={this.props.onUploadDocument}
                           title="The Single Survey"/>
      </div>
    );
  }
}

export default DocumentUploading;
