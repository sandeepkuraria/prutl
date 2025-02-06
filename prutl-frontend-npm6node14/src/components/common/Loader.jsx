const Loader = () => (
    <div className="flex items-center justify-center space-x-2">
      <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent text-blue-500 rounded-full" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
  
  export default Loader;