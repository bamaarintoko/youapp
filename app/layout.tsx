import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const viewport: Viewport = {
	themeColor: 'black',
}

export const metadata: Metadata = {
	title: "YouApp",
	description: "YouApp",
	manifest: "/manifest.webmanifest",
	// themeColor: "#000000",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "YouApp",
	},
	icons: {
		icon: "/icons/icon-192.png",
		apple: "/icons/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<StoreProvider>
					<div className=" bg-[#09141A] w-full max-w-screen-sm min-h-screen  mx-auto">

						{children}
					</div>
				</StoreProvider>
			</body>
		</html>
	);
}
