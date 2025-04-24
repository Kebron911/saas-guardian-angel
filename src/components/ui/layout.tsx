
import React from "react";
import { cn } from "@/lib/utils";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex min-h-screen flex-col", className)}
        {...props}
      />
    );
  }
);
Layout.displayName = "Layout";

interface LayoutHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const LayoutHeader = React.forwardRef<HTMLDivElement, LayoutHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("sticky top-0 z-30 flex h-16 items-center bg-background", className)}
        {...props}
      />
    );
  }
);
LayoutHeader.displayName = "LayoutHeader";

interface LayoutSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const LayoutSidebar = React.forwardRef<HTMLDivElement, LayoutSidebarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-shrink-0 bg-background", className)}
        {...props}
      />
    );
  }
);
LayoutSidebar.displayName = "LayoutSidebar";

interface LayoutContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const LayoutContent = React.forwardRef<HTMLDivElement, LayoutContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn("flex-1 bg-muted/20", className)}
        {...props}
      />
    );
  }
);
LayoutContent.displayName = "LayoutContent";

export { Layout, LayoutHeader, LayoutSidebar, LayoutContent };
