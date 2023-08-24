import React from "react";
import Link from "next/link";
import Image from "next/image";

const logoLink = {
	display: "inline-block",
};

export default function LogoDashBoard({ path }: any) {
	return (
		<div style={{display: "flex", justifyContent: "center", marginTop: "15px"}}>
			<Link
				href={path}
				style={logoLink}
			>
				<Image
					width={161}
					height={32}
					alt="Logo"
					src="/images/logo/logo-horizontal-white.png"
					priority
				/>
			</Link>
		</div>
	);
}