import React, { useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { emailVerificationStart } from "../../../../redux-saga/redux/emailVerification";

const EmailVerification = () => {
  const { token } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(emailVerificationStart(token))
    }, [])
    const { error, isLoading, success } = useSelector((state) => state.emailVerification);
    return (
      <>
      {isLoading && ( <> Please wait</>)}
      {success && ( <> You're email has been verified </>)}
      {error && ( <> An unexpected error occured </>)}
      </>
    )
}

export default EmailVerification