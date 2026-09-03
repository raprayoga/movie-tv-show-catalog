import { NextResponse } from "next/server";
import { createSession, getCurrentAccount } from "@/shared/service/tmdb/auth";

export async function GET(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url);
	const approved = searchParams.get("approved");
	const requestToken = searchParams.get("request_token");

	const response = NextResponse.redirect(
		`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}`
	);

	if (approved !== "true" || !requestToken) {
		response.cookies.delete("tmdb_request_token");
		return response;
	}

	const sessionResult = await createSession(requestToken);

	if (!sessionResult.success || !sessionResult.session_id) {
		response.cookies.delete("tmdb_request_token");
		return response;
	}

	const accountResult = await getCurrentAccount(sessionResult.session_id);

	response.cookies.delete("tmdb_request_token");
	response.cookies.set("tmdb_session_id", sessionResult.session_id, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 30,
	});

	if (accountResult.success && accountResult.account) {
		const accountCookie = JSON.stringify({
			id: accountResult.account.id,
			username: accountResult.account.username,
			name: accountResult.account.name,
		});
		response.cookies.set("tmdb_account", accountCookie, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24 * 30,
		});
	}

	return response;
}
