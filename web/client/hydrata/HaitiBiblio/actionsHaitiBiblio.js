const axios = require('../../libs/ajax');

const SHOW_HAITI_BIBLIO_FORM = 'SHOW_HAITI_BIBLIO_FORM';
const HIDE_HAITI_BIBLIO_FORM = 'HIDE_HAITI_BIBLIO_FORM';

const showHaitiBiblioForm = () => {
    return {
        type: SHOW_HAITI_BIBLIO_FORM
    };
};

const hideHaitiBiblioForm = () => {
    return {
        type: HIDE_HAITI_BIBLIO_FORM
    };
};

module.exports = {
    SHOW_HAITI_BIBLIO_FORM, showHaitiBiblioForm,
    HIDE_HAITI_BIBLIO_FORM, hideHaitiBiblioForm
};
