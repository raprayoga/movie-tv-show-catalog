import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSession } from "@/shared/service/tmdb/auth";
import type { AuthResponse } from "@/shared/interface/auth";

export async function POST(): Promise<Response> {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get("tmdb_session_id")?.value;

	if (sessionId) {
		await deleteSession(sessionId);
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
