const FullPageLoader = ({ text }: { text?: string }) => {
  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
        <p className="text-white text-lg font-semibold">
          {text || "Uploading..."}
        </p>
      </div>
    </div>
  );
};

export default FullPageLoader;
