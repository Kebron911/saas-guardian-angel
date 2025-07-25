import { apiClient } from "@/lib/api-client";
import { Plan } from "@/hooks/useAdminFinanceData";

export const updatePlan = async (planId: string, data: Partial<Plan>) => {
  return apiClient.put(`/admin/plans/${planId}`, data);
};

export const createPlan = async (data: Partial<Plan>) => {
  return apiClient.post(`/admin/plans`, data);
};

export const softDeletePlan = async (planId: string) => {
  return apiClient.put(`/admin/plans/${planId}/soft-delete`, {});
};
