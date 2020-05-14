import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import NextSeo from 'next-seo';

class TermsCondition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: [
        {
          title: "1. Services by Restaurant",
          descrip: [
            '1.1. On the website and via third parties\' internet presences, Restaurant presents a selection of products, meals and services to Customers, which Restaurant purchases from various local catering service providers ("Partner Caterers"), and provides a platform enabling a simple handling of orders and payments with Restaurant.',
            "1.2. Restaurant presents the Catering Services, in particular meals, of its Partner Caterers on the website and processes orders from customers as a reseller of these Partner Caterers. The meals are prepared by the Partner Caterers, with whom Restaurant enters into separate Agreements, and supplied to the customer directly by the Partner Caterers on behalf of Restaurant. This agreement only applies between the Customer and Restaurant, the relevant Partner Caterer is not a party to this Agreement and therefore is not a contracting partner of the Customer."
          ]
        },
        {
          title: "2. Preconditions for orders from Customers",
          descrip: [
            `Customers using the services of Restaurant
            - must be at least 18 years of age,
            - must be in a position to accept orders at the address stated in the order,
            - may under no circumstances sub-license, resell or hand over or provide the Catering Services offered via the website to third parties at a charge without written consent from Restaurant,
            - may only register with a customer profile under their own identity or register for enterprises which they are entitled to represent,
            - must ensure the correctness of the data provided in the course of the creation of the profile or in the orders, and must update their profile without delay in the event of changes to the stored data,
            - must keep their login data secret and inform Restaurant without delay as soon as there is the suspicion of a loss or theft of the login data.`
          ]
        },
        {
          title: "3. Registration",
          descrip: [
            `3.1. For an order, Customers must create a customer profile. A customer profile can be created both during the order process and independent of it. An application for production of a customer profile can be made as follows:
            - by phone (the Restaurant customer service is available Mon-Fri from 08:00 – 18:00 and Sat-Sun from 09:00 – 18:00) at +353 83 1861716, or
            - on the website, by the application form being completely filled in and transmitted either during the order process or independent of it.`,
            "3.2. Approval of the registration is at Restaurant' free discretion. If Restaurant approves a registration, a matching customer profile is created.",
            "3.3. Restaurant reserves the right to limit the Customer's access to the customer profile on the website at its own discretion."
          ]
        },
        {
          title: "4. Conclusion of the Agreement",
          descrip: [
            "4.1. The customer can place an order by phone or by using the relevant form on the website. Each order contains information about the selected Partner Caterer, its Catering Services, in particular meals and their quantity, the price and delivery details such as delivery date and location. The details of an order can also be coordinated with Restaurant by phone.",
            '4.2. The [adverts] presented on the website are non-binding and do not constitute offers in the legal sense. By clicking the "Add" button, the Customer can place Catering Services in a virtual shopping trolley. This process is non-binding and does not portray an offer for the conclusion of an Agreement. Before placing the order, the contents of the shopping trolley are put together on an overview page. By clicking the "ORDER WITH AN OBLIGATION TO PAY" button, the Customer makes a binding offer for the conclusion of an Agreement. The Customer can also place an order by phone and make a binding offer in this way.',
            '4.3. An Agreement is only concluded by the transmission of a separate order confirmation from Restaurant (Re.: "Confirmation of your Restaurant order") within two days of the offer by the Customer.',
            '4.5. Restaurant stores the terms of the Agreement, i.e. the Customer\'s order data and the T&Cs, and sends the order data to the Customer in the order confirmation. The T&Cs are attached to the order confirmation (Re.: "Confirmation of your Restaurant order") as a PDF.',
            "4.6. The Customer can save a current version of these T&Cs at any time via the browser and view it on the website."
          ]
        },
        {
          title: "5. Delivery, delivery note, dispatch costs",
          descrip: [
            "5.1. The Catering Services are supplied directly to the Customer by the Partner Caterers on behalf of Restaurant.",
            "5.2. The delivery takes place in the period selected by the Customer and confirmed by Restaurant.",
            "5.3. Upon delivery, the Customer receives a delivery note from the respective Partner Caterer. The delivery note serves quality assurance purposes. The Customer can document delays, quality complaints and other remarks about the Catering Services on the delivery note.",
            "5.4. Delivery and dispatch is at the Customer's expense. The delivery and dispatch costs are displayed to the Customer on the overview page before placement of the order and have to be confirmed by the Customer."
          ]
        },
        {
          title: "6. Prices",
          descrip: [
            "Prices and order values for Catering Services are stated in EUR inclusive of VAT (levied at the prevailing rate from time to time) on the website, during the ordering process and in these T&Cs."
          ]
        },
        {
          title: "7. Payment and invoicing",
          descrip: [
            "7.1. The Customer agrees to receive electronic invoices by e-mail.",
            "7.2. Restaurant will issue an invoice to Customer for payment for the Catering Services, which Customer may pay with a credit card or via PayPal at the Customer's wish. Credit card payments are handled by our partner Adyen BV, Simon Carmiggelstraat 6 – 50, 1011 DJ Amsterdam. To prevent and to discover cases of fraud, we transmit your IP address to our partner Adyen BV, Simon Carmiggelstraat 6 – 50, 1011 DJ Amsterdam. Your IP address is stored by Adyen BV. All data are transmitted encrypted. You can withdraw your consent at any time with an effect for the future via the contact data in the imprint. The PayPal payment method is handled by PayPal (Europe) S.à r.l. & Cie, S.C.A., 5. Etage, 22-24 Boulevard Royal, L-2449 Luxembourg. Further information on privacy with PayPal can be found in the PayPal privacy declaration.",
            '7.3. The payment must be made to the complete amount via the selected means of payment within one week of receipt of the order confirmation (Re.: "Confirmation of your Restaurant order"), in any case no later than forty-eight (48) hours before the date of rendering of the catering service. Restaurant sends Customers for the invoice the necessary payment information or a link to a website for handling of the payment by e-mail.',
            "7.4. Restaurant is entitled to demand a partial payment (e.g. 50% of the payment) directly after the conclusion of the Agreement with a first invoice.",
            "7.5. If the Customer fails to make payment within the timescales set out in section 7.3 above, Restaurant shall not be required to provide the Catering Services.",
            "7.6. Where the Customer is a business (which for the purposes of these T&Cs will mean a person acting for purposes relating to that person's trade, business, craft or profession, whether acting personally or in the business's name or on the business's behalf, and includes a private company, or sole trader or sole practitioner or partnership), Restaurant shall be entitled to charges interest on any late payment at the prevailing rate in accordance with the Late Payment of Commercial Debts (Interest) Act 1998 until the date of payment."
          ]
        },
        {
          title: "8. Meals",
          descrip: [
            "8.1. Meals can be selected from the offers on the website. All the illustrations on the website are exemplary and merely serve visualisation.",
            "8.2. Meals may contain allergens. These are stated accordingly on the website. Please contact the Restaurant customer service for more precise information on allergens."
          ]
        },
        {
          title:
            "9. Cancellation for Consumers – The Right to Change Your Mind",
          descrip: [
            `9.1. The cancellation right does not exist for the Agreements for:
            - the supply of foodstuffs, beverages or other goods intended for current consumption in the household and which are supplied by a trader on frequent and regular rounds to the consumer’s home, residence or workplace;
            - the supply of goods which are liable to deteriorate or expire rapidly;
            - the supply of customised goods which are made to the Customer’s specifications or are clearly personalised.
            `,
            "9.2. A Customer who is a consumer within the meaning of The Consumer Rights Act 2015 and the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 for the part of the order which is not covered by the statutory exclusion noted at section 9.1 above. A consumer means every individual acting for purposes that are wholly or mainly outside that individual’s trade, business, craft or profession.",
            ,
            `9.3. The Customer can cancel the Agreement with Restaurant according to the following provisions:
              You have the right to cancel this Agreement within fourteen days of you receiving the order confirmation without stating a reason.
              To exercise this right, you just have to let us know. You can do this by contacting us by email at support@Restaurant.eu, or by phone on +353 83 1861716 .You can use the sample cancellation form at section 9.5 below but this is not mandatory to exercise your right of cancellation. To comply with the cancellation period, it is sufficient to send the notification of the exercising of the cancellation right before the expiry of the cancellation period.
              `,
            `9.4. Consequences of cancellation
              If you cancel this Agreement within the cancellation period, we will repay all payments which received from you, including the costs of delivery (the maximum refund for delivery costs will be the costs of delivery by the least expensive delivery method we offer) without delay and no later than fourteen days from the day on which the notification of your cancellation of this Agreement has reached us. For this repayment, we use the same means of payment which you used in the original transaction, unless something to the contrary has expressly been agreed with you; under no circumstances will you be charged fees as a result of this repayment.              
                `
          ]
        },
        {
          title: "10. Cancellation, cancellation fee",
          descrip: [
            "10.1. Following conclusion of the Agreement, business Customers (and consumer Customers whose orders are subject to the statutory exclusion set out in section 9.1), have the possibility of cancelling an order free of charge up to the point stated in the following section by an e-mail notification to Restaurant at support@Restaurant.eu. The cancellation fee stated shall be charged for cancellations which are received later than the point in time stated in the list.",
            "10.2. The cancellation fee to be paid shall be reduced accordingly if the Customer renders proof that damage or a reduction of value has not occurred or is considerably lower than the amount to be paid by the Customer. The right to prove higher damage shall be reserved for Restaurant.",
            "10.3. The statutory cancellation right (see Section 9 above) shall remain unaffected by the aforementioned regulations in this section."
          ]
        },
        {
          title: "11. Liability",
          descrip: [
            "11.1 Liability for Customers who are consumers",
            "11.1.1 Restaurant does not exclude or limit in any way our liability to you where it would be unlawful to do so. This includes liability for death or personal injury caused by our negligence of our employees, agents or subcontractors; for fraud or fraudulent misrepresentation; for breach of your legal rights in relation to the Catering Services.",
            "11.1.2 Restaurant is responsible to you for foreseeable loss and damage caused by us. If we fail to comply with these T&Cs, we are responsible for loss or damage you suffer that is a foreseeable result of our breaking this contract or failing to use reasonable care and skill, but we are not responsible for any loss or damage which is not foreseeable. Loss or damage is foreseeable if either it is obvious that it will happen or if, at the time the contract was made, both we and you knew it might happen, for example, if you discussed it with us during the sales process.",
            "11.1.3 Restaurant is not liable for business losses. We only supply the Catering Services to you for domestic and private use. If you use the Catering Services for any commercial, business or re-sale purpose, our liability to you will be limited as set out in term 11.2.",
            "11.2 Liability for Customers who are businesses",
            "11.2.1 Nothing in these T&Cs shall limit or exclude our liability for:",
            "11.2.1.1 death or personal injury caused by our negligence, or the negligence of our employees, agents or subcontractors (as applicable);",
            "11.2.1.2 fraud or fraudulent misrepresentation;",
            "11.2.1.3 breach of the terms implied by section 12 of the Sale of Goods Act or section 2 of the Supply of Goods and Services Act 1982;",
            "11.2.1.4 defective products under the Consumer Protection Act 1987; or",
            "11.2.1.5 any matter in respect of which it would be unlawful for us to exclude or restrict liability.",
            "Otherwise, Restaurant liability shall limited to the order value."
          ]
        },
        {
          title: "12. Consumer Rights",
          descrip: [
            "12.1 If you are a consumer, we are under a legal duty to supply services that are carried out with reasonable care and skill and products that are in accordance with this Agreement. Please visit the Citizens Advice website www.adviceguide.org.uk or call 03454 04 05 06 for further information."
          ]
        },
        {
          title: "13. Data protection",
          descrip: [
            "13.1 Restaurant will only use your personal information as set out in our fair processing notice accessible: Privacy Policy"
          ]
        },
        {
          title: "14. Dispute resolution",
          descrip: [
            "The European Commission provides a platform for online dispute resolution (ODR), which you can find under http://ec.europa.eu/consumers/odr/. The platform acts as a contact point for extrajudicial resolution of disputes concerned with contractual duties resulting from online purchase agreements. We are not obliged and as a matter of principle not willing to participate in dispute resolution proceedings with a consumer's reconciliation office."
          ]
        },
        {
          title: "15. Laws applying to this Agreement",
          descrip: [
            "15.1 If you are a consumer, these T&Cs are governed by Irish law and you can bring legal proceedings in respect of the Catering Services in the Irish courts. If you live in Scotland, you can bring legal proceedings in respect of the Catering Services in either the Scottish or the English courts. If you live in Northern Ireland you can bring legal proceedings in respect of the Catering Services in either the Northern Irish or the English courts.",
            "15.2 If you are a business, any dispute or claim arising out of or in connection with a contract between us or its subject matter or formation (including non-contractual disputes or claims) shall be governed by and construed in accordance with the law of Irish and the courts of Irish shall have exclusive jurisdiction to settle any such dispute or claim.",
            "15.3 Each of the sections of these T&Cs operates separately. If any court or relevant authority decides that any of them are unlawful or unenforceable, the remaining sections will remain in full force and effect."
          ]
        },
        {
          title: "16. Contact",
          descrip: [
            "The Restaurant customer service is available to you for questions, suggestions or criticism. The Restaurant customer service can be reached by e-mail under support@Restaurant.eu or at 353 83 1861716 (Mon-Fri from 08:00 – 18:00. and Sat-Sun from 09:00 – 18:00)."
          ]
        },
        {
          title: "17. Entire Agreement",
          descrip: [
            "If you are a business, these T&Cs constitute the entire agreement between us in relation to your purchase. You acknowledge that you have not relied on any statement, promise, representation, assurance or warranty made or given by or on behalf of us which is not set out in these T&Cs and that you shall have no claim for innocent or negligent misrepresentation based on any statement in this Agreement."
          ]
        }
      ]
    };
  }

  signIn(e) {
    e.preventDefault();
    this.props.history.push("/login");
  }

  renderInnerItems(descrip) {
    var itemsarray = [];

    for (let i = 0; i < descrip.length; i++) {
      itemsarray.push(
        <Col xs="12">
          <div style={{ marginTop: 20, fontSize: 16, whiteSpace: "pre-line" }}>
            {descrip[i]}
          </div>
        </Col>
      );
    }

    return <Row>{itemsarray}</Row>;
  }

  renderItems() {
    var itemsarray = [];

    var text = this.state.text;

    for (let i = 0; i < text.length; i++) {
      itemsarray.push(
        <Col xs="12">
          <h4 style={{ marginTop: 50, fontSize: 16 }}>{text[i].title}</h4>
          {this.renderInnerItems(text[i].descrip)}
        </Col>
      );
    }

    return (
      <Row
        style={{
          marginTop: 20
        }}
      >
        {itemsarray}
      </Row>
    );
  }

  render() {
    return (
      <Layout title={'Terms & Conditions'}>
      <NextSeo
        config={{
          title: 'Terms & Conditions | Restaurant ',
        }}
      />
      <div style={{backgroundColor: 'white'}}>
        <NavBar/>
        <div className="app align-items-center">
        <Container>
          <Row>
            <Col style={{ textAlign: "start", marginTop: 50, marginBottom: 50 }} xs="12">
              <h2 style={{ fontSize: 34 }}>Terms & Conditions</h2>
              {this.renderItems()}
            </Col>
          </Row>
        </Container>
        </div>
        <Footer />
      </div>
      </Layout>
    );
  }
}

export default TermsCondition;
