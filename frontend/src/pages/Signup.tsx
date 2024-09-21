import Quote from '../components/Quote'
import Auth from '../components/Auth'

const Signup = () => {
  return (
    <>
    <div className='grid grid-cols-1 xl:grid-cols-2'>
        <div>
            <Auth type='signup' />
        </div>
        <div className="hidden xl:block">
        <Quote />
        </div>
    </div>
    </>
  )
}

export default Signup