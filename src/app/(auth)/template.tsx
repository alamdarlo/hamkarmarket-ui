export default function AuthTemplate({ children }: { children: React.ReactNode }) {
  // Product details will re-mount when switching products
  return (
    <>
      {children}
    </>
  )
}