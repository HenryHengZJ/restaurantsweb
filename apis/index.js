
export default {

    /*Daily Menu API*/
    GETdailyMenu: "/dailyMenu/getDailyMenu",

    /*Published Caterer API*/
    GETcatererprofile: "/catererPublished/getcatererprofile",
    GETcaterer: "/catererPublished/getcaterer",

     /*Caterer API*/
    POSTnewcaterersignup: "/caterer/newcaterersignup",

    /*Customer API*/
    GETcustomerprofile: "/customer/getcustomerprofile",
    UPDATEcustomerpassword: "/customer/updatecustomerpassword",
    UPDATEcustomerprofile: "/customer/updatecustomerprofile",

    /*Company API*/
    GETcompany: "/company/getcompany",
    POSTcompany: "/company/postcompany",

    /*Menu API*/
    GETmenu: "/menuPublished/getmenu",

    /*Review API*/
    GETreview: "/review/getreview",
    GETcaterer_review: "/review/get_caterer_review",

    /*Lunch Order API*/
    GETlunchorder: "/lunchorder/getlunchorder",
    POSTlunchaddorder: "/lunchorder/addlunchorder",
    PUTupdatelunchorder: "/lunchorder/updatelunchorder",

    /*Order API*/
    GETorder: "/order/getorder",
    POSTaddorder: "/order/addorder",
    PUTupdateorder: "/order/updateorder",

    /*Payment API*/
    GETcustomer_paymentaccount: "/payment/get_customer_paymentaccount",
    GETcustomer_card: "/payment/get_customer_card",
    PUTupdate_customer_card: '/payment/update_customer_card',
    POSTcustomer_makepayment: '/payment/customer_makepayment',
    POSTsave_customer_card: "/payment/save_customer_card",
    POSTcreate_customer_paymentaccount: "/payment/create_customer_paymentaccount",
    UPDATE_customer_paymentaccount: "/payment/update_customer_paymentaccount",
    DELETEcustomer_card: "/payment/detach_customer_card",

    /*Cart API*/
    GETcart: "/cart/getcart",
    UPDATEcart: "/cart/updatecart",
    DELETEcart: "/cart/deletecart",

    /*Auth API*/
    POSTcustomersignup: "/auth/customersignup",
    POSTcustomerlogin: "/auth/customerlogin",
    GETcustomerlogout: "/auth/logout",
    POSTpasswordreset: "/auth/resetpassword",
    GETresetpassword: '/auth/getresetpassword',
    PUTupdatepassword: '/auth/updatepassword',

    /*Report & Message API*/
    POSTcustomermessage: "/postmessage"

  };



