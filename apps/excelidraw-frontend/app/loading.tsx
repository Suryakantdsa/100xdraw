export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-gray-200">
          Loading 100xDraw...
        </p>
        <p className="text-sm text-gray-400">
          Please wait while we set things up.
        </p>
      </div>
    </div>
  );
}
