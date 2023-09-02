
import React, { memo } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '../'
const FormStatus: React.FC = () => {
  return <div className={Styles.errorWrap}>
    <span className={Styles.error}>Errou</span>
    <Spinner className={Styles.spinner} />
  </div>
}

export default FormStatus
