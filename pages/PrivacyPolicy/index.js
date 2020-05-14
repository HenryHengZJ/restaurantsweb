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


class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: [
        {
          title: "1. Contact Details",
          descrip: [
            `If you have any queries or requests concerning this privacy policy or how we handle your data more generally, please get in touch with us using the following details.
              - By contacting our general customer services team at: support@Restaurant.eu
              `
          ]
        },
        {
          title: "2. How We Collect Your Information",
          descrip: [
            `We collect your personal information when you interact with us or use our services, such as when you use our Sites to place an order. We also look at how visitors use our Sites, to help us improve our services and optimise customer experience.
              
              We collect information:
              -	when you create an account with us or you change your account settings;
              -	when you place an order with us and during the order process (including for payment and order delivery);
              -	when you contact us directly via email, phone, post, message or via our chat function; and
              -	when you browse and use our Sites (before and after you create an account with us).
              
              We also collect information from third party sites, such as advertising platforms and our fraud detection provider.
            `
          ]
        },
        {
          title: "3. Information We Collect From You",
          descrip: [
            `As part of our commitment to the privacy of our customers and visitors to our Sites more generally, we want to be clear about the sorts of information we will collect from you.
            When you visit the Sites or make a Restaurant order through the Sites, you are asked to provide information about yourself including your name, contact details, delivery address, order details and payment information such as credit or debit card information.
            
            We also collect information about your usage of the Sites and information about you from any messages you post to the Sites or when you contact us or provide us with feedback, including via e-mail, letter, phone or chat function. If you contact us by phone, we record the call for training and service improvement purposes, and make notes in relation to your call.
            
            We collect technical information from your mobile device or computer, such as its operating system, the device and connection type and the IP address from which you are accessing our Sites.
            
            We also collect technical information about your use of our services through a mobile device, for example, carrier, location data and performance data such as mobile payment methods, interaction with other retail technology such as use of NFC Tags, QR Codes and/or use of mobile vouchers. Unless you have elected to remain anonymous through your device and/or platform settings, this information may be collected and used by us automatically if you use the service through your mobile device(s) via any Restaurant mobile application, through your mobile's browser or otherwise.
            
            We process health information about you only where you volunteer and consent to this, for example if you specify any food allergies.
            `
          ]
        },
        {
          title: "4. Conclusion of the Agreement",
          descrip: [
            `We will only process the data we collect about you if there is a reason for doing so, and if that reason is permitted under data protection law. We will have a lawful basis for processing your information: if we need to process your information in order to provide you with the service you have requested or to enter into a contract; we have your consent; we have a justifiable reason for processing your data; or we are under a legal obligation to do so.
              
              Where we need to in order to provide you with the service you have requested or to enter into a contract, we use your information:
              -	to enable us to provide you with access to the relevant parts of the Sites;
              -	to supply the services you have requested;
              -	to enable us to collect payment from you; and
              -	to contact you where necessary concerning our services, such as to resolve issues you may have with your order.
              
              We also process your data where we have a justifiable reason for doing so— for example personalisation of our service, including processing data to make it easier and faster for you to place orders. We have listed these reasons below:
              - to improve the effectiveness and quality of service that our customers can expect from us in the future;
              - to tailor content that we or our third party restaurant or advertising partners display to you, for example so that we can show you restaurants which are in your area or make sure you see the advertising which is most relevant to you, based on characteristics determined by us;
              - to enable our customer support team to help you with any enquiries or complaints in the most efficient way possible;
              - to contact you for your views and feedback on our services and to notify you if there are any important changes or developments to the Sites or our services, including letting you know that our services are operating in a new area, where you have asked us to do so;
              - to analyse your activity on the Sites so that we can administer, support, improve and develop our business and for statistical and analytical purposes and to help us to prevent fraud;
              - to enforce our contractual terms with you and any other agreement, and for the exercise or defence of legal claims and to protect the rights of Restaurant, restaurant partners, riders, or others (including to prevent fraud);
              - if you submit comments and feedback regarding the Sites and the services, we may use such comments and feedback on the Sites and in any marketing or advertising materials. We will only identify you for this purpose by your first name and the city in which you live; and
              - where you have chosen to receive push notifications from us through our mobile application, we may send you push notifications relating to the services that you have requested from us and information about our services and offers. You can choose to stop receiving push notifications from us at any time by changing your preferences on your mobile device.

              We will also analyse data about your use of our services from your location data to create profiles relating to you and for you. This means that we may make certain assumptions about what you may be interested in and use this, for example, to send you more tailored marketing communications, to present you with restaurants that we think you will prefer, or to let you know about special offers or products which we think you may be interested in (including Restaurant for Business). This activity is referred to as profiling. You have certain rights in relation to this type of processing. Please see 'Your Rights' section below for more information. Where we rely on legitimate interest as a basis for processing your personal information, we carry out a ‘balancing test’ to ensure that our processing is necessary and that your fundamental rights of privacy are not outweighed by our legitimate interests. You can find out more information about these balancing tests by contacting us using the details above.

              Where we are under a legal obligation to do so we may use your information to:
              -	create a record of your order(s);
              -	comply with any legal obligation or regulatory requirement to which we are subject.
              `
          ]
        },
        {
          title: "5. Restaurant For Business",
          descrip: [
            `
            We also process your information to determine whether you may be interested in hearing about our Restaurant for Business service and, if your employer signs up for Restaurant for Business, to make this service available to you.
            
            Where we think you are using your Restaurant account for business purposes and your company may be interested in our Restaurant for Business service, where appropriate, we may contact you as a representative of your business (by email or telephone) to let you know about this service. We do this as it's in our legitimate business interests. You have the right to object to receiving these types of communications, which you can do by responding to our emails to unsubscribe or by contacting us using the contact details in this privacy policy.
            
            If your employer signs up for Restaurant for Business, we will contact you to let you know that the Restaurant for Business service is available to you. If you would like to take up your employer’s offer to use Restaurant for Business, we will tag your Restaurant account as having a Restaurant for Business allowance. For both these activities we are acting as a data processor on behalf of your employer (who is the controller of this information). For more information, please contact your employer.
            
            When you use Restaurant for Business, then:
            -	we will process your information for the purposes set out in section 4 above. We will be the controller of this information; and
            -	we will also share personal data relating to your order (such as the order date and time, the payment amount and the restaurant with which the order was placed) with your employer. Restaurant and your employer will both be separate controllers of this information.
            `
          ]
        },
        {
          title: "6. Cookies",
          descrip: [
            "You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of the Site may become inaccessible or not function properly."
          ]
        },
        {
          title: "7. Direct Marketing",
          descrip: [
            `
            Where you have given your consent or where we have a justifiable reason for doing so (and are permitted to do so by law) we will use your information to let you know about our other products and services that may be of interest to you and we may contact you to do so by email or phone. You can control your email marketing preferences by:
            •	visiting our website www.Restaurant.ie, or mobile application;
            •	clicking on "Account" (for our website this is under the drop-down menu); and
            •	scrolling down to "Marketing Preferences".
            `
          ]
        },
        {
          title: "8. Automated Decision Making",
          descrip: [
            `
            We conduct fraud checks on all customers. Where we believe we may detect fraudulent activity we may block you from placing an order and using our Sites.
            
            We undertake fraud checks on all customers because this is necessary for us to perform our contracted services to customers, by ensuring that the services we (and restaurants) provide are duly paid for, and also so that individuals themselves are protected from fraudulent transactions on their cards.

            Given the volumes of customers and orders we deal with, we use automated systems including a third party fraud detection provider called Ravelin, which analyses your order data in order to make automated decisions as to whether or not we will accept an order. We find this is a fairer, more accurate and more efficient way of conducting fraud checks since human checks would simply not be possible in the timeframes and given the volumes of customers that we deal with.
            
            The checks and decisions that are made look at various components including known industry indicators of fraud which our expert fraud detection provider makes available to us, as well as fraud patterns we have detected on our Sites. When combined, these generate an automated score indicating the likelihood of a fraudulent transaction. If our systems indicate a high score for you, then we may decline an order or even block you from our services. The specific fraud indicators are dynamic so will change depending on what types of fraud are being detected in the wider world, country and our Sites at any particular time.
            
            You have certain rights in respect of this activity - please see 'Your Rights' section below for more information. Our fraud detection is in place to protect all of our customers as well as Restaurant. You have the right to contest any fraud decision made about you and to be given more information about why any such decision was made by contacting us as set out in section 1 above.
            `
          ]
        },
        {
          title: "9. Retention Of Your Information",
          descrip: [
            `   
            We will not retain your information for any longer than we think is necessary. Information that we collect will be retained for as long as needed to fulfil the purposes outlined in the ‘Use of my information’ section above, in line with our legitimate interest or for a period specifically required by applicable regulations or laws, such as retaining the information for regulatory reporting purposes.
            
            When determining the relevant retention periods, we will take into account factors including:
            -	our contractual obligations and rights in relation to the information involved;
            -	legal obligation(s) under applicable law to retain data for a certain period of time;
            -	statute of limitations under applicable law(s);
            -	our legitimate interests where we have carried out balancing tests (see section on 'How we use your personal information' above);
            -	(potential) disputes; and
            -	guidelines issued by relevant data protection authorities.
            
            Otherwise, we securely erase your information where we no longer require your information for the purposes collected.
              `
          ]
        },
        {
          title: "10. Disclosure Of Your Information",
          descrip: [
            `
            The information we collect about you will be transferred to and stored on our servers located within the EU. We are very careful and transparent about who else your information is shared with.
            
            Sharing your information internally:
            -	We share your information with other Restaurant group companies only where necessary for the purposes set out in section 4.
            
            Sharing your information with third parties:
            We share your information with third party service providers. The types of third party service providers whom we share your information with includes:
            -	Payment providers (including online payment providers and fraud detection providers): for the purposes of providing services to us, for example when they process information such as credit card payments for us, provide support services to you or carry out fraud checks for us;
            -	IT service providers (including cloud providers): for the purposes of data storage and analysis;
            -	Restaurant partners: that you have placed your order with so that they can fulfil your order, be made aware of any food allergies you have volunteered to tell them about, resolve issues, or improve their services;
            -	Riders: so they can deliver your order to you;
            -	Customer support partners: who will help us to resolve any issues you may have with our services; and
            -	Marketing and advertising partners: so that they can ensure that you see advertising which is more relevant to you and send you email marketing on our behalf.

            Restaurant will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this privacy policy when it is transferred to third parties. If our business enters into a joint venture with, purchases or is sold to or merged with another business entity, your information may be disclosed or transferred to the target company, our new business partners or owners or their advisors. We may also share your information:
            -	if we are under a duty to disclose or share your information in order to comply with (and/or where we believe we are under a duty to comply with) any legal obligation or regulatory requirement. This includes exchanging information with other companies and other organisations for the purposes of fraud protection and prevention;
            -	in order to enforce our contractual terms with you and any other agreement;
            -	to protect the rights of Restaurant, restaurant partners, riders, or others, including to prevent fraud; and
            -	with such third parties as we reasonably consider necessary in order to prevent crime, e.g. the police.
            
            International transfers of data:
            -	In some cases the personal data we collect from you might be processed outside the European Economic Area ("EEA"), such as the United States, the Philippines and the countries in which Restaurant operates (which are set out on www.Restaurant.ie). These countries may not have the same protections for your personal data as the EEA has. However, we are obliged to ensure that the personal data that is processed by us and our suppliers outside of the EEA is protected in the same ways as it would be if it was processed within the EEA. There are therefore certain safeguards in place when your data is processed outside of the EEA.
            -	We ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is implemented:
              1.	your personal data is transferred to countries that have been deemed to provide an adequate level of protection for personal data by the European Commission;
              2.	we use the EU approved Standard Contractual Clauses; and
              3.	where your personal data is transferred to third party providers based in the US, data may be transferred to them if they have self-certified under the Privacy Shield framework in relation to the type of data being transferred, which requires them to provide similar protection to personal data shared between the EU and the US.
            -	Please contact us using the contact details above if you want further information on the countries to which personal data may be transferred and the specific mechanism used by us when transferring your personal data out of the EEA.
            `
          ]
        },
        {
          title: "11. Security",
          descrip: [
            "We adopt robust technologies and policies to ensure the personal information we hold about you is suitably protected. We take steps to protect your information from unauthorised access and against unlawful processing, accidental loss, destruction and damage. Where you have chosen a password that allows you to access certain parts of the Sites, you are responsible for keeping this password confidential. We advise you not to share your password with anyone. Unfortunately, the transmission of information via the internet is not completely secure. Although we will take steps to protect your information, we cannot guarantee the security of your data transmitted to the Sites; any transmission is at your own risk. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorised access."
          ]
        },
        {
          title: "12. Your Rights",
          descrip: [
            `
            Under data protection law, you may have a number of rights concerning the data we hold about you. If you wish to exercise any of these rights, please contact our Data Protection Officer using the contact details set out above. For additional information on your rights please contact your data protection authority and see below.
            - The right to be informed.You have the right to be provided with clear, transparent and easily understandable information about how we use your information and your rights. This is why we’re providing you with the information in this policy.
            - The right of access.You have the right to obtain access to your information (if we’re processing it). This will enable you, for example, to check that we’re using your information in accordance with data protection law. If you wish to access the information we hold about you in this way, please get in touch (see Contact Details).
            - The right to rectification. You are entitled to have your information corrected if it is inaccurate or incomplete. You can request that we rectify any errors in information that we hold by contacting us (see Contact Details).
            - The right to erasure.This is also known as ‘the right to be forgotten’ and, in simple terms, enables you to request the deletion or removal of certain of the information that we hold about you by contacting us (see Contact Details).
            - The right to restrict processing.You have rights to 'block' or 'suppress' further use of your information. When processing is restricted, we can still store your information, but will not use it further.
            - The right to data portability.You have the right to obtain your personal information in an accessible and transferable format so that you can re-use it for your own purposes across different service providers. This is not a general right however and there are exceptions. To learn more please get in touch (see Contact Details).
            - The right to lodge a complaint.You have the right to lodge a complaint about the way we handle or process your information with the national data protection authority.
            - The right to withdraw consent.If you have given your consent to anything we do with your information (i.e. we rely on consent as a legal basis for processing your information), you have the right to withdraw that consent at any time. You can do this by contacting us (see Contact Details). Withdrawing consent will not however make unlawful our use of your information while consent had been apparent.
            - The right to object to processing.You have the right to object to certain types of processing, including processing for direct marketing and profiling. You can object by changing your marketing preferences, disabling cookies as set out in sections 7 and 8 above or by getting in touch (see Contact Details).

            `
          ]
        },
        {
          title: "13. Changes To Our Privacy Policy",
          descrip: [
            "Any changes to our privacy policy will be posted to the Sites and, where appropriate, we will notify you of the changes for example by email or push notification. This privacy policy was last updated: 22/05/2019"
          ]
        },
        {
          title: "14. Complaints",
          descrip: [
            "If you’re not satisfied with our response to any complaint or believe our processing of your information does not comply with data protection law, you can make a complaint to the Information Commissioner’s Office (ICO). Restaurant Tech Limited, 301, the Windmill, Dock Road, Limerick, Ireland."
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
      <Layout title={'Privacy Policy'}>
      <NextSeo
        config={{
          title: 'Privacy Policy | Restaurant',
        }}
      />
      <div style={{backgroundColor: 'white'}}>
        <NavBar/>
        <div className="app align-items-center">
        <Container>
          <Row>
            <Col style={{ textAlign: "start", marginTop: 50, marginBottom: 50 }} xs="12">
              <h2 style={{ fontSize: 34 }}>Privacy Policy</h2>
              <h4 style={{ marginTop: 50, fontSize: 16 }}>
                Restaurant Tech Limited ("we", "our", "us" or "Restaurant") is
                committed to protecting the privacy of all users of our website
                Restaurant.ie, or mobile applications (together, the "Sites").
                Please read the following privacy policy that explains how we
                use and protect your information. We'll be the "data controller"
                of the information you provide to us.
              </h4>
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

export default PrivacyPolicy;
