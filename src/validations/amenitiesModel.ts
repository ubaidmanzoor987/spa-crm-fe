import * as yup from 'yup';

export const amenitiesModel = yup.object().shape({

 
    name: yup.string().required('Required Aminity name.'),
 });
