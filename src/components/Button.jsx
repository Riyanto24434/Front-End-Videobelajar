export function PrimaryButton({ children }) {
  return (
    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded text-sm">
      {children}
    </button>
  );
}

export function SecondaryButton({ children }) {
  return (
    <button type="button" className="w-full bg-green-100 text-green-700 font-semibold py-2 rounded text-sm mt-2">
      {children}
    </button>
  );
}

export function GoogleButton() {
  return (
    <button type="button" className="w-full border flex items-center justify-center gap-2 py-2 rounded text-sm font-semibold hover:bg-gray-50">
      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
      Daftar dengan Google
    </button>
  );
}
