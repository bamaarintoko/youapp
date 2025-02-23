export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div style={{
            background: "radial-gradient(at top right, #1F4247 30%, #0D1D23 60%, #09141A 100%)"
        }} className="w-full max-w-screen-sm min-h-screen  mx-auto">
            {children}
        </div>
    )
}