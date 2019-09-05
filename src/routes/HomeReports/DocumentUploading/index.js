import React, {Component} from 'react';
import PropertyQuestionareDocument from "./PropertyQuestionareDocument";
import TermsConditionsDocument from "./TermsConditionsDocument";
import EnergyDocument from "./EnergyDocument";
import SingleSurveryDocument from "./SingleSurveryDocument";


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
        <PropertyQuestionareDocument onUploadDocument={this.props.onUploadDocument}
                                     fetchError={this.props.fetchError}
                                     fetchSuccess={this.props.fetchSuccess}
                                     fetchStart={this.props.fetchStart}
                                     propertyQuestionnaire={propertyQuestionnaire}/>
        <TermsConditionsDocument onUploadDocument={this.props.onUploadDocument}
                                 fetchError={this.props.fetchError}
                                 fetchSuccess={this.props.fetchSuccess}
                                 fetchStart={this.props.fetchStart}
                                 termConditionDocument={termConditionDocument}/>
        <EnergyDocument onUploadDocument={this.props.onUploadDocument}
                        fetchError={this.props.fetchError}
                        fetchSuccess={this.props.fetchSuccess}
                        fetchStart={this.props.fetchStart}
                        energyDocument={energyDocument}/>
        <SingleSurveryDocument onUploadDocument={this.props.onUploadDocument}
                               fetchError={this.props.fetchError}
                               fetchSuccess={this.props.fetchSuccess}
                               fetchStart={this.props.fetchStart}
                               surveyDocument={surveyDocument}/>
      </div>
    );
  }
}

export default DocumentUploading;
