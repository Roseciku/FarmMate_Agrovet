import { useForm } from "react-hook-form";

function CheckOutPage() {
  const {
    register,
    handleSubmit,
  } = useForm();

  return (
    <div className="flex items-center justify-center min-h-screen bg-farmGreen ">
        <div className="w-[50%]">
        <button className="bg-white px-8 py-3 rounded-2xl shadow-lg w-full text-farmGreen font-bold text-xl mb-2 mt-2">MPesa</button>
        <p className="text-center text-lg font-semibold mb-2">or</p>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full ">
        <form className="font-poppins">
          <h3 className='text-lg  font-bold mb-6'>Contact information</h3>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email address
            </label>
            <input
              type="text"
              {...register("email", { required: "email is required" })}
              className="border rounded w-full py-2 px-3 mb-6"
            />
          </div>
            <h3  className='text-lg font-bold mb-6'>Payment details</h3>
            <div>
            <label
              htmlFor="cardnumber"
              className="block text-gray-700 font-semibold mb-2"
            >
             Card number
            </label>
            <input
              type="text"
              {...register("cardnumber", { required: "Card number is required" })}
              className="border rounded w-full py-2 px-3 mb-2"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 font-bold mb-2"
            >
            Expiration date (MM/YY)
            </label>
            <input
              type="date"
              {...register("date", { required: "Expiry date is required" })}
              className="border rounded w-full py-2 px-3 mb-2"
            />
          </div>
          <div>
            <label
              htmlFor="cvc"
              className="block text-gray-700 font-bold mb-2"
            >
              CVC
            </label>
            <input
              type="number"
              {...register("number", { required: "CVC is required" })}
              className="border rounded w-full py-2 px-3 mb-2"
            />
          </div>
          </div>
           <h3  className='text-lg font-bold mb-6'>Shipping address</h3>
           <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold mb-2"
            >
            Address/town
            </label>
            <input
              type="text"
              {...register("address", { required: "address date is required" })}
              className="border rounded w-full py-2 px-3 mb-6"
            />
          </div>
          <button className="px-8 py-4 rounded-2xl shadow-lg w-full bg-brightYellow text-white font-bold text-xl">Pay {""}<span>0</span></button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default CheckOutPage;
