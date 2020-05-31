import * as yup from 'yup'

const steps = {
  1: {
    fields: [ [ 'Date of Birth', 'date', 'birth_date' ], [ 'Gender', 'checkbox', 'gender', [
      [ 'Male', 'male', 'Male' ], [ 'Female', 'female', 'Female' ], [ 'Others', 'others', 'Others' ],
    ] ], [ 'SSN', 'text', 'ssn' ] ],
    schema: yup.object().shape( {
      birth_date: yup.string().required( '*Required' ),
      ssn: yup.string().required( '*Required' ),
      gender: yup.bool(),
    } ),
  }
}

export default steps
