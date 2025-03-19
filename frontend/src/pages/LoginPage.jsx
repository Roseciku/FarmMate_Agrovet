import {useForm} from 'react-hook-form'

function LoginPage() {
const{register, handleSubmit, formState:{errors},} = useForm();
const onSubmit = (data) => {
    console.log(data)
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-farmGreen ">
    <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm md:max-w-lg'>
      <form onSubmit={handleSubmit(onSubmit)} className='font-poppins'> 
        <h2 className='text-3xl text-center font-semibold mb-6'>Log In</h2>
        <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 font-bold mb-2'>Username</label>
            <input
             type="text"
            {...register("email",{required:"Email is required" })}
             className='border rounded w-full py-2 px-3 mb-2'  
             />
             {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
        </div>
        <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700 font-bold mb-2'>Password</label>
            <input 
            type="password"
            {...register("password",{required:"Name is required" })}
            className='border rounded w-full py-2 px-3 mb-2' 
            />
            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
        </div>
        <button
        type='submit'
        className="w-full text-xl font-bold bg-brightYellow text-white p-3 rounded-lg hover:bg-brightOrange transition"
        >
            Login
            
            </button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
    </div>
    </div> 
  )
}

export default LoginPage
