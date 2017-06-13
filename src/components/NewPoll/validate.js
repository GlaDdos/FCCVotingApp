
const validate = values => {
    const errors = {};

    if(!values.options || (values.options.length < 2)){
        errors.title = 'Poll has to have at least two options';
    } else {
        const optionsArrayErrors = [];
        values.options.forEach((option, optionIndex) => {
         if(!option || !option.length){
             optionsArrayErrors[optionIndex] = 'Required'
         }
        });

        if(optionsArrayErrors.length){
            errors.options = optionsArrayErrors;
        }
    }

    if(!values.title){
        errors.title = 'Required';
    }

    return errors;
};

export default validate;