import type {
	RequestTokenResponse,
	SessionResponse,
	TMDBAccount,
} from "@/shared/interface/auth";

const TMDB_API_BASE = process.env.TMDB_API_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_AUTH_BASE = process.env.TMDB_AUTH_BASE_URL || "https://www.themoviedb.org/authenticate";

function getAccessToken(): string {
	const token = process.env.TMDB_API_READ_ACCESS_TOKEN;
	if (!token) {
		throw new Error("TMDB API access token is not configured");
	}
	return token;
}

async function tmdbRequest<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const url = `${TMDB_API_BASE}${endpoint}`;
	const response = await fetch(url, {
		...options,
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(
			errorData.status_message || `TMDB API error: ${response.status}`
		);
	}

	return response.json();
}

export async function createRequestToken(): Promise<RequestTokenResponse> {
	try {
		const data = await tmdbRequest<{ request_token: string; success: boolean }>(
			"/authentication/token/new"
		);
		return {
			success: data.success,
			request_token: data.request_token,
		};
	} catch (error) {
		return {
			success: false,
			request_token: "",
			error: error instanceof Error ? error.message : "Failed to create request token",
		};
	}
}

export async function createSession(
	requestToken: string
): Promise<SessionResponse> {
	try {
		const data = await tmdbRequest<{ session_id: string; success: boolean }>(
			"/authentication/session/new",
			{
				method: "POST",
				body: JSON.stringify({ request_token: requestToken }),
			}
		);
		return {
			success: data.success,
			session_id: data.session_id,
		};
	} catch (error) {
		return {
			success: false,
			session_id: "",
			error: error instanceof Error ? error.message : "Failed to create session",
		};
	}
}

export async function deleteSession(
	sessionId: string
): Promise<{ success: boolean; error?: string }> {
	try {
		await tmdbRequest<{ success: boolean }>(
			`/authentication/session?session_id=${sessionId}`,
			{
				method: "DELETE",
			}
		);
		return { success: true };
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to delete session",
		};
	}
}

export async function getCurrentAccount(
	sessionId: string
): Promise<{ success: boolean; account?: TMDBAccount; error?: string }> {
	try {
		const data = await tmdbRequest<{
			id: number
			username: string
			name: string
			avatar?: {
				gravatar?: { hash: string }
				tmdb?: { avatar_path: string }
			}
		}>(`/account?session_id=${sessionId}`);
		return {
			success: true,
			account: {
				id: data.id,
				username: data.username,
				name: data.name,
				avatar: data.avatar,
			},
		};
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to get account",
		};
	}
}

export function buildAuthorizationUrl(
	requestToken: string,
	callbackUrl: string
): string {
	const redirectUrl = encodeURIComponent(callbackUrl);
	return `${TMDB_AUTH_BASE}/${requestToken}?redirect_to=${redirectUrl}`;
}
