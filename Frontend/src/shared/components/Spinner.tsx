import { ClipLoader } from 'react-spinners'

const override = {
    display : 'block',
    margin : '100px auto'
}
type spinnerType = {
 loading ?: boolean
}

const Spinner = ({loading}: spinnerType) => {
  return (
    <ClipLoader
      color='#FF0000'
      loading = {loading}
      cssOverride = {override}
      size = {45}
    />
  )
}

export default Spinner