import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plan } from "@/hooks/useAdminFinanceData";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface PlanFormDialogProps {
  plan?: Plan | null;
  onSave: (plan: Partial<Plan>) => Promise<void>;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const PlanFormDialog: React.FC<PlanFormDialogProps> = ({ plan, onSave, trigger, open, setOpen }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [form, setForm] = useState<Partial<Plan>>({
    name: "",
    price: 0,
    duration: "",
    description: "",
    status: "active",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (plan) {
      setForm({
        name: plan.name || "",
        price: plan.price || 0,
        duration: plan.duration || "",
        description: plan.description || "",
        status: plan.status || "active",
      });
    } else {
      setForm({ name: "", price: 0, duration: "", description: "", status: "active" });
    }
  }, [plan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "price" ? parseFloat(value) : value }));
  };

  const handleStatusChange = (value: string) => {
    setForm((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
    if (setOpen) setOpen(false);
    else setInternalOpen(false);
  };

  const dialogOpen = open !== undefined ? open : internalOpen;
  const handleDialogOpenChange = (val: boolean) => {
    if (setOpen) setOpen(val);
    else setInternalOpen(val);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{plan ? "Edit Plan" : "Create New Plan"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" value={form.price} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input id="duration" name="duration" value={form.duration} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" value={form.description} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={form.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlanFormDialog;
