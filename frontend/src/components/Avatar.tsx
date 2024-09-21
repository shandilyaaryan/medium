
const Avatar = ({ name }: {name: string}) => {
  return (
    <div>
    <div className="flex justify-center items-center w-6 h-6 overflow-hidden bg-gray-400 rounded-full">
    <span className="text-[10px] text-white">{ name[0] }</span>
    </div>
    </div>
  )
}

export default Avatar