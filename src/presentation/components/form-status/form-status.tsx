
import React, { memo, useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '../'
import Context from '@/presentation/contexts/form/form-context'
const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)
  return <div data-testid="error-wrap" className={Styles.errorWrap}>
    {isLoading && <Spinner className={Styles.spinner} />}
    {errorMessage && <span className={Styles.error}>Errou</span>}

  </div>
}

export default FormStatus
