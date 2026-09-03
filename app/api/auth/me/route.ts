import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { AuthResponse } from "@/shared/interface/auth";

export async function GET(): Promise<Response> {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get("tmdb_session_id")?.value;
	const accountCookie = cookieStore.get("tmdb_account")?.value;

	if (!sessionId || !accountCookie) {
		return NextResponse.json<AuthResponse>({
			success: true,
			authenticated: false,
			account: null,
		});
	}

	try {
		const account = JSON.parse(accountCookie);
		if (account && account.id) {
			return NextResponse.json<AuthResponse>({
				success: true,
				authenticated: true,
				account: {
					id: account.id,
					username: account.username,
					name: account.name,
				},
			});
		}
	} catch {
		// Invalid cookie data
	}

	const response = NextResponse.json<AuthResponse>({
		success: true,
		authenticated: false,
		account: null,
	});
	response.cookies.delete("tmdb_session_id");
	response.cookies.delete("tmdb_account");
	return response;
}
