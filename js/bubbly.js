var BM = {
    setPhone: function(value) {
        return $.ajax("http://localhost:8080/setPhone/" + value, {type: 'POST'});
    },
    setSmsCode: function(value) {
        return $.ajax("http://localhost:8080/setSmsCode/" + value, {type: 'POST'});
    },
    setPaymentMethod: function(value) {
        return $.ajax("http://localhost:8080/setPaymentMethod/" + value, {type: 'POST'});
    },
    setCouponName: function(value) {
        return $.ajax("http://localhost:8080/setCouponName/" + value, {type: 'POST'});
    },
    setFeedbackLevel: function(value) {
        return $.ajax("http://localhost:8080/setFeedbackLevel/" + value, {type: 'POST'});
    },
    setProductQuantity: function(productId, quantity) {
        return $.ajax("http://localhost:8080/setProductQuantity/" + productId + "/" + quantity, {type: 'POST'});
    },
    setTransactionValue: function(key, value) {
        return $.ajax("http://localhost:8080/setTransactionValue?key=" + encodeURIComponent(key) + "&value=" + encodeURIComponent(value), {type: 'POST'});
    },
    open: function () {
        return $.ajax("http://localhost:8080/open", {type: 'POST'});
    },
    close: function () {
        return $.ajax("http://localhost:8080/close", {type: 'POST'});
    },
    closeSecure: function () {
        return $.ajax("http://localhost:8080/closeSecure", {type: 'POST'});
    },
    goNext: function () {
        return $.ajax("http://localhost:8080/goNext", {type: 'POST'});
    },
    goBack: function () {
        return $.ajax("http://localhost:8080/goBack", {type: 'POST'});
    },
    goHome: function () {
        return $.ajax("http://localhost:8080/goHome", {type: 'POST'});
    },
    goToStep: function (step) {
    	step = step - 1;
        return $.ajax("http://localhost:8080/goToStep/" + step, {type: 'POST'});
    },
    showKeypad: function () {
        return $.ajax("http://localhost:8080/showKeypad", {type: 'POST'});
    },
    hideKeypad: function () {
        return $.ajax("http://localhost:8080/hideKeypad", {type: 'POST'});
    },
    createOrder: function (success, fail) {
        BM.createOrderSuccess = success;
        BM.createOrderFail = fail;
        return $.ajax("http://localhost:8080/createOrder", {type: 'POST'});
    },
    saveCustomerPhone: function (success, fail) {
        BM.saveCustomerPhoneSuccess = success;
        BM.saveCustomerPhoneFail = fail;
        return $.ajax("http://localhost:8080/saveCustomerPhone", {type: 'POST'});
    },
    saveSelectedProducts: function (success, fail) {
        BM.saveSelectedProductsSuccess = success;
        BM.saveSelectedProductsFail = fail;
        return $.ajax("http://localhost:8080/saveSelectedProducts", {type: 'POST'});
    },
    sendCustomerSmsCode: function (success, fail) {
        BM.sendCustomerSmsCodeSuccess = success;
        BM.sendCustomerSmsCodeFail = fail;
        return $.ajax("http://localhost:8080/sendCustomerSmsCode", {type: 'POST'});
    },
    customerLogin: function (success, fail) {
        BM.customerLoginSuccess = success;
        BM.customerLoginFail = fail;
        return $.ajax("http://localhost:8080/customerLogin", {type: 'POST'});
    },
    customerLogout: function (success, fail) {
        BM.customerLogoutSuccess = success;
        BM.customerLogoutFail = fail;
        return $.ajax("http://localhost:8080/customerLogout", {type: 'POST'});
    },
    pay: function (success, fail) {
        BM.paySuccess = success;
        BM.payFail = fail;
        return $.ajax("http://localhost:8080/pay", {type: 'POST'});
    },
    sendCoupon: function (success, fail) {
        BM.sendCouponSuccess = success;
        BM.sendCouponFail = fail;
        return $.ajax("http://localhost:8080/sendCoupon", {type: 'POST'});
    },
    sendFeedback: function (success, fail) {
        BM.sendFeedbackSuccess = success;
        BM.sendFeedbackFail = fail;
        return $.ajax("http://localhost:8080/sendFeedback", {type: 'POST'});
    },
    sendSms: function (text) {
        return $.ajax("http://localhost:8080/sendSms?text=" + encodeURIComponent(text), {type: 'POST'});
    },
    getProducts: function () {
        return $.ajax("http://localhost:8080/products", {type: 'GET'});
    },
    getPaymentTypes: function () {
        return $.ajax("http://localhost:8080/paymentTypes", {type: 'GET'});
    },

    createOrderSuccess: function() {},
    createOrderFail: function() {},
    saveCustomerPhoneSuccess: function() {},
    saveCustomerPhoneFail: function() {},
    saveSelectedProductsSuccess: function() {},
    saveSelectedProductsFail: function() {},
    sendCustomerSmsCodeSuccess: function() {},
    sendCustomerSmsCodeFail: function() {},
    customerLoginSuccess: function() {},
    customerLoginFail: function() {},
    customerLogoutSuccess: function() {},
    customerLogoutFail: function() {},
    paySuccess: function() {},
    payFail: function() {},
    sendCouponSuccess: function() {},
    sendCouponFail: function() {},
    sendFeedbackSuccess: function() {},
    sendFeedbackFail: function() {}
};
