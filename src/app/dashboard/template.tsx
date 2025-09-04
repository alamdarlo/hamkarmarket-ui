export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  // Product details will re-mount when switching products
  return (
    <>
      {children}
    </>
  )
}