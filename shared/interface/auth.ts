export interface TMDBAccount {
	id: number
	username: string
	name: string
	avatar?: {
		gravatar?: {
			hash: string
		}
		tmdb?: {
			avatar_path: string
		}
	}
}

export interface CurrentUser {
	authenticated: boolean
	account: TMDBAccount | null
}

export interface AuthResponse {
	success: boolean
	authenticated: boolean
	account: TMDBAccount | null
	error?: string
}

export interface RequestTokenResponse {
	success: boolean
	request_token: string
	error?: string
}

export interface SessionResponse {
	success: boolean
	session_id: string
	error?: string
}
