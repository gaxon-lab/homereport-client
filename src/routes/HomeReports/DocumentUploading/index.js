import React, {Component} from 'react';
import UploaderContainer from "./UploaderContainer";


class DocumentUploading extends Component {

  render() {
    const reportDocuments = this.props.reportDocuments;
    let termConditionDocument, propertyQuestionnaire, energyDocument, surveyDocument;
    if (reportDocuments) {
      termConditionDocument = reportDocuments.find(document => document.caption === "term_cond");
      propertyQuestionnaire = reportDocuments.find(document => document.caption === "property_quest");
      energyDocument = reportDocuments.find(document => document.caption === "eng_cert");
      surveyDocument = reportDocuments.find(document => document.caption === "single_sur");
    }
    return (
      <div>
        <div className="gx-text-grey gx-mb-2">Documents:</div>

        <UploaderContainer caption="property_quest"
                           document={propertyQuestionnaire}
                           onUploadDocument={this.props.onUploadDocument}
                           title="Property Questionnaire"
                           fetchError={this.props.fetchError}
                           fetchSuccess={this.props.fetchSuccess}
                           fetchStart={this.props.fetchStart}/>

        <UploaderContainer caption="term_cond"
                           document={termConditionDocument}
                           onUploadDocument={this.props.onUploadDocument}
                           title="Terms and Conditions"
                           fetchError={this.props.fetchError}
                           fetchSuccess={this.props.fetchSuccess}
                           fetchStart={this.props.fetchStart}/>

        <UploaderContainer caption="eng_cert"
                           document={energyDocument}
                           onUploadDocument={this.props.onUploadDocument}
                           title="Energy Performance Certificate"
                           fetchError={this.props.fetchError}
                           fetchSuccess={this.props.fetchSuccess}
                           fetchStart={this.props.fetchStart}/>

        <UploaderContainer caption="single_sur"
                           document={surveyDocument}
                           onUploadDocument={this.props.onUploadDocument}
                           title="The Single Survey"
                           fetchError={this.props.fetchError}
                           fetchSuccess={this.props.fetchSuccess}
                           fetchStart={this.props.fetchStart}/>
      </div>
    );
  }
}

export default DocumentUploading;
