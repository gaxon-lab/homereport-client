import React, {Component} from 'react';
import PropertyQuestionareDocument from "./PropertyQuestionareDocument";
import TermsConditionsDocument from "./TermsConditionsDocument";
import EnergyDocument from "./EnergyDocument";
import SingleSurveryDocument from "./SingleSurveryDocument";


class DocumentUploading extends Component {

  render() {

    return (
      <div>
        <h2 className="gx-text-grey">Documents:</h2>
        <PropertyQuestionareDocument onUploadDocument={this.props.onUploadDocument}
                                     fetchError={this.props.fetchError}
                                     fetchSuccess={this.props.fetchSuccess}
                                     fetchStart={this.props.fetchStart}/>
        <TermsConditionsDocument onUploadDocument={this.props.onUploadDocument}
                                 fetchError={this.props.fetchError}
                                 fetchSuccess={this.props.fetchSuccess}
                                 fetchStart={this.props.fetchStart}/>
        <EnergyDocument onUploadDocument={this.props.onUploadDocument}
                        fetchError={this.props.fetchError}
                        fetchSuccess={this.props.fetchSuccess}
                        fetchStart={this.props.fetchStart}/>
        <SingleSurveryDocument onUploadDocument={this.props.onUploadDocument}
                               fetchError={this.props.fetchError}
                               fetchSuccess={this.props.fetchSuccess}
                               fetchStart={this.props.fetchStart}/>
      </div>
    );
  }
}

export default DocumentUploading;
