import './globals.css'

export default function StoreAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div>Admin Dashboard</div>

      <div>{children}</div>
    </div>
  )
}
