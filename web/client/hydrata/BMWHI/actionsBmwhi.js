const axios = require('../../libs/ajax');

const SHOW_BMWHI_FORM = 'SHOW_BMWHI_FORM';
const HIDE_BMWHI_FORM = 'HIDE_BMWHI_FORM';

const showBmwhiForm = () => {
    return {
        type: SHOW_BMWHI_FORM
    };
};

const hideBmwhiForm = () => {
    return {
        type: HIDE_BMWHI_FORM
    };
};

module.exports = {
    SHOW_BMWHI_FORM, showBmwhiForm,
    HIDE_BMWHI_FORM, hideBmwhiForm
};
