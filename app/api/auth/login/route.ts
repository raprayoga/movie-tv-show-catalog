import { NextResponse } from "next/server";
import { createRequestToken, buildAuthorizationUrl } from "@/shared/service/tmdb/auth";

export async function GET(): Promise<Response> {
	const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/callback`;

	const result = await createRequestToken();

	if (!result.success || !result.request_token) {
		return NextResponse.json(
			{ success: false, error: result.error || "Failed to create request token" },
			{ status: 500 }
		);
	}

	const authUrl = buildAuthorizationUrl(result.request_token, callbackUrl);

	const response = NextResponse.redirect(authUrl);
	response.cookies.set("tmdb_request_token", result.request_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 15,
		path: "/",
	});

	return response;
}
