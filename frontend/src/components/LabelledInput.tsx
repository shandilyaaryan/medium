import { ChangeEvent } from 'react'

interface LabelledInputType {
    label: String;
    placeholder: string;
    onChange: (e: ChangeEvent) => void;
    type?: string;
}

const LabelledInput = ({label, placeholder, onChange, type}: LabelledInputType) => {
  return (
    <div>
        <label className=" block text-sm font-bold text-black pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="mt-1 border border-gray-500 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" placeholder={placeholder} required />
    </div>
  )
}

export default LabelledInput