export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm dark:bg-dark/60">
      <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-gray-200 border-t-primary-300 dark:border-gray-700 dark:border-t-primary-300" />
    </div>
  );
}
