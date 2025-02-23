'use client'
import AboutSection from "@/components/AboutSection";
import HomeHeader from "@/components/HomeHeader";
import InstallPrompt from "@/components/InstallPrompt";
import InterestSection from "@/components/InterestSection";
import PhotoSection from "@/components/PhotoSection";
import withAuth from "@/hoc/withAuth";

function Home() {
	return (
		<div>
			<HomeHeader />
			<div className="px-2 space-y-6">
				<PhotoSection />
				<AboutSection />
				<InterestSection />
			</div>
			<InstallPrompt/>

		</div>
	);
}

export default withAuth(Home)
