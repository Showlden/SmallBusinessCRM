const Spinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10'
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600`}
      />
    </div>
  )
}

export default Spinner