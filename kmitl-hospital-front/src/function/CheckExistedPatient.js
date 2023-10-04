import axios from 'axios';

const checkExistedPatient = async (patientIDcard) => {
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/appointment/checkPatient/` + patientIDcard;
    try {
        // There is patient
        const response = await axios.get(url);
        const data = response.data;
        return data;
    } catch (error) {
        // There is no patient
        // throw error;
        const data = undefined;
        return data;
    }
}

export { checkExistedPatient };