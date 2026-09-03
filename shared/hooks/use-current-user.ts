"use client"

import useSWR from "swr"
import type { AuthResponse } from "@/shared/interface/auth"

const fetcher = async (url: string): Promise<AuthResponse> => {
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error("Failed to fetch current user")
	}
	return response.json()
}

export function useCurrentUser() {
	const { data, error, isLoading, mutate } = useSWR<AuthResponse, Error>(
		"/api/auth/me",
		fetcher,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: true,
			dedupingInterval: 60000,
		}
	)

	const login = async () => {
		window.location.href = "/api/auth/login"
	}

	const logout = async () => {
		await fetch("/api/auth/logout", { method: "POST" })
		await mutate()
	}

	return {
		user: data?.account ?? null,
		isAuthenticated: data?.authenticated ?? false,
		isLoading,
		isError: !!error,
		login,
		logout,
		mutate,
	}
}
