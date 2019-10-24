import React, {Component} from 'react';
import {Modal} from "antd";

class ViewPropertyQuestionnaire extends Component {

  render() {
    const {isViewOpen, onToggleViewBox, propertyQuestionnaire} = this.props;
    console.log("propertyQuestionnaire", propertyQuestionnaire);
    return (
      <div className="gx-main-layout-content">
        <Modal width="80%"
               visible={isViewOpen}
               title="Property Questionnaire Details"
               maskClosable={false}
               onCancel={() => onToggleViewBox()}
               footer={null}>
          <div>

            <div>
              <h4 className="gx-mb-2">1. Length of ownership</h4>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>How long have you owned the property?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div
                  style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.length_ownership ? propertyQuestionnaire.length_ownership + " " + "years" : "NA"}</div>
              </div>
            </div>

            <div className="gx-my-4">
              <h4 className="gx-mb-2">2. Council Tax</h4>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>What council tax band is your property in?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div
                  style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>
            </div>

            <div className="gx-my-4">
              <h4 className="gx-mb-2">3. Parking</h4>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>What are the arrangements for parking at your property?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>
            </div>

            <div className="gx-my-4">
              <h4 className="gx-mb-2">4. Conservation area</h4>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Is your property in a designated Conservation Area (that is an area of
                  special architectural or historical interest, the character or appearance of which it is desirable to
                  preserve or enhance)?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.conservation_area? propertyQuestionnaire.conservation_area : "NA"}</div>
              </div>
            </div>

            <div className="gx-my-4">
              <h4 className="gx-mb-2">5. Listed Buildings</h4>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Is your property a Listed Building, or contained within one (that is a
                  building recognised and approved as being of special architectural or historical interest)?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.listed_building? propertyQuestionnaire.listed_building : "NA"}</div>
              </div>
            </div>

            <div className="gx-my-4">
              <h4 className="gx-mb-2">6. Alterations/additions/extensions</h4>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>i) During your time in the property, have you carried out any structural
                  alterations, additions or extensions (for example, provision of an extra bath/shower room, toilet, or
                  bedroom)?
                  <p>If you have answered yes, please describe below the changes which you have made:</p>
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.any_structural_alteration? propertyQuestionnaire.any_structural_alteration : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>(ii) Did you obtain planning permission, building warrant, completion
                  certificate
                  and other consents for this work?
                  <p>If you have answered yes, the relevant documents will be needed by the purchaser and you should
                    give them to your solicitor as soon as possible for checking.</p>
                  <p>If you do not have the documents yourself, please note below who has these documents and your
                    solicitor or estate agent will arrange to obtain them:</p>
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.obtain_planning? propertyQuestionnaire.obtain_planning : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Have you had replacement windows, doors, patio doors or double glazing
                  installed in your property?
                  <p>If you have answered yes, please answer the three questions below:</p>
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.replacement_windows? propertyQuestionnaire.replacement_windows : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Were the replacements the same shape and type as the ones you replaced?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.replace_shape_type? propertyQuestionnaire.replace_shape_type : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Did this work involve any changes to the window or door openings?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.involve_changes? propertyQuestionnaire.involve_changes : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Please describe the changes made to the windows doors, or patio doors (with
                  approximate dates when the work was completed):
                  <p>Please give any guarantees which you received for this work to your solicitor or estate agent.</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.changes_detail? propertyQuestionnaire.changes_detail : "NA"}</div>
              </div>
            </div>

            <div className="gx-my-4">
              <h4 className="gx-mb-2">7. Central Heating</h4>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Is there a central heating system in your property?
                  (Note: a partial central heating system is one which does not heat all the main rooms of the property
                  — the main living room, the bedroom(s), the hall and the bathroom).
                  <p>
                    If you have answered yes or partial – what kind of central heating is there?
                  </p>
                  <p>(Examples: gas-fired, solid fuel, electric storage heating, gas warm air).</p>
                  <p>If you have answered yes, please answer the three questions below:</p>
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.central_heating_sys? propertyQuestionnaire.central_heating_sys : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>i) When was your central heating system or partial central heating system
                  installed?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>i) When was your central heating system or partial central heating system
                  installed?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>(ii) Do you have a maintenance contract for the central heating system?
                  <p>If you have answered yes, please give details of the company with which you have a maintenance
                    contract:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>(iii) When was your maintenance agreement last renewed? (Please provide the
                  month and year).
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>
            </div>

            <div>
              <h4 className="gx-mb-2">8. Energy Performance Certificate</h4>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Does your property have an Energy Performance Certificate which is less than
                  10 years old?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.energy_perform_cert? propertyQuestionnaire.energy_perform_cert : "NA"}</div>
              </div>
            </div>

            <div>
              <h4 className="gx-mb-2">9. Issues that may have affected your property</h4>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Has there been any storm, flood, fire or other structural damage to your
                  property while you have owned it?
                  <p>If you have answered yes, is the damage the subject of any outstanding insurance claim?</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.structural_damage? propertyQuestionnaire.structural_damage : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Are you aware of the existence of asbestos in your property?
                  <p>If you have answered yes, please give details:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>
            </div>

            <div>
              <h4 className="gx-mb-2">10. Services</h4>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Is there a septic tank system at your property?
                  <p>If you have answered yes, please answer the two questions below:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>(i) Do you have appropriate consents for the discharge from your septic
                  tank?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>(ii) Do you have a maintenance contract for your septic tank?
                  <p>If you have answered yes, please give details of the company with which you have a maintenance
                    contract:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

            </div>

            <div>
              <h4 className="gx-mb-2">11. Responsibilities for shared or common areas</h4>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Are you aware of any responsibility to contribute to the cost of anything
                  used jointly, such as the repair of a shared drive, private road, boundary, or garden area?
                  <p>If you have answered yes, please give details:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Is there a responsibility to contribute to repair and maintenance of the
                  roof, common stairwell or other common areas?
                  <p>If you have answered yes, please give details:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Has there been any major repair or replacement of any part of the roof
                  during the time you have owned the property?
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Do you have the right to walk over any of your neighbours’ property — for
                  example to put out your rubbish bin or to maintain your boundaries?
                  <p>If you have answered yes, please give details:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>As far as you are aware, do any of your neighbours have the right to walk
                  over your property, for example to put out their rubbish bin or to maintain their boundaries?
                  <p>If you have answered yes, please give details:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>As far as you are aware, is there a public right of way across any part of
                  your property? (public right of way is a way over which the public has a right to pass, whether or not
                  the land is privately-owned.)
                  <p>If you have answered yes, please give details:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>
            </div>

            <div>
              <h4 className="gx-mb-2">12. Charges associated with your property</h4>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Is there a factor or property manager for your property?
                  <p>If you have answered yes, please provide the name and address, and give details of any deposit held
                    and approximate charges:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Is there a common buildings insurance policy?
                  <p>If you have answered yes, is the cost of the insurance included in your monthly/annual factor’s
                    charges?</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Please give details of any other charges you have to pay on a regular basis
                  for the upkeep of common areas or repair works, for example to a residents’ association, or
                  maintenance or stair fund.
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

            </div>

            <div>
              <h4 className="gx-mb-2">13. Specialist works</h4>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>As far as you are aware, has treatment of dry rot, wet rot, damp or any
                  other specialist work ever been carried out to your property?
                  <p>If you have answered yes, please say what the repairs were for, whether you carried out the repairs
                    (and when) or if they were done before you bought the property.</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>As far as you are aware, has any preventative work for dry rot, wet rot, or
                  damp ever been carried out to your property?
                  <p>If you have answered yes, please give details:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>If you have answered yes to 13(a) or (b), do you have any guarantees
                  relating to this work?
                  <p>If you have answered yes, these guarantees will be needed by the purchaser and should be given to
                    your solicitor as soon as possible for checking. If you do not have them yourself please write below
                    who has these documents and your solicitor or estate agent will arrange for them to be obtained. You
                    will also need to provide a description of the work carried out. This may be shown in the original
                    estimate.</p>
                  <p>Guarantees are held by:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

            </div>

            <div>
              <h4 className="gx-mb-2">14. Guarantees</h4>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Are there any guarantees or warranties for any of the following:
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>If you have answered ‘yes’ or ‘with title deeds’, please give details of the
                  work or installations to which the guarantee(s) relate(s):
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>Are there any outstanding claims under any of the guarantees listed above?
                  <p>If you have answered yes, please give details:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}>{propertyQuestionnaire && propertyQuestionnaire.council_tax? propertyQuestionnaire.council_tax : "NA"}</div>
              </div>


            </div>

            <div>
              <h4 className="gx-mb-2">15. Boundaries</h4>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>So far as you are aware, has any boundary of your property been moved in the
                  last 10 years?
                  <p>If you have answered yes, please give details:</p>
                </div>

              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}></div>
              </div>
            </div>

            <div>
              <h4 className="gx-mb-2">16. Notices that affect your property</h4>
              <p>In the past three years have you ever received a notice:</p>
              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>advising that the owner of a neighbouring property has made a planning
                  application?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}></div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>that affects your property in some other way?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row gx-mb-2">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}></div>
              </div>

              <div className="gx-d-flex gx-flex-row ">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Question</div>
                <div style={{width: "75%"}}>that requires you to do any maintenance, repairs or improvements to your
                  property?
                </div>
              </div>
              <div className="gx-d-flex gx-flex-row">
                <div style={{width: "20%"}} className="gx-font-weight-bold">Answer</div>
                <div style={{width: "75%"}}></div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ViewPropertyQuestionnaire


