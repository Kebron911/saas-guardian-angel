import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

export const useLoginUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await apiClient.post("/api/login", { email, password });
            if (response.data.success && response.data.user) {
                setUser(response.data.user);
                toast({ title: "Login successful", error: "success" });
            } else {
                setError("Invalid credentials");
                toast({ title: "Login failed", error: "error" });
            }
        } catch (error: any) {
            setError(error?.response?.data?.detail || "Login error");
            toast({ title: "Login failed", error: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    return { user, isLoading, error, login };
};