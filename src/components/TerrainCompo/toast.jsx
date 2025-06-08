
import { cn } from '../lib/utils';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva } from 'class-variance-authority';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle as AlertCircleIcon } from 'lucide-react';
import React from 'react';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
	<ToastPrimitives.Viewport
		ref={ref}
		className={cn(
			'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
			className,
		)}
		{...props}
	/>
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
	'data-[swipe=move]:transition-none group relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full',
	{
		variants: {
			variant: {
				default: 'bg-background border border-gray-200 text-foreground',
        success: 'group success border-green-500 bg-green-50 text-green-700',
				destructive: 'group destructive border-red-500 bg-red-50 text-red-700',
        warning: 'group warning border-yellow-500 bg-yellow-50 text-yellow-700',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  const Icon = {
    success: CheckCircle,
    destructive: AlertCircleIcon,
    warning: AlertTriangle,
    default: Info,
  }[variant] || Info;

	return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className="flex items-start space-x-3">
        <Icon className={cn(
          "h-6 w-6",
          variant === "success" && "text-green-500",
          variant === "destructive" && "text-red-500",
          variant === "warning" && "text-yellow-500",
          variant === "default" && "text-blue-500",
        )} />
        <div className="flex-1">
          {props.children}
        </div>
      </div>
    </ToastPrimitives.Root>
	);
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
	<ToastPrimitives.Action
		ref={ref}
		className={cn(
			'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      'group-[.success]:border-green-200 group-[.success]:hover:bg-green-100 group-[.success]:focus:ring-green-500',
      'group-[.destructive]:border-red-200 group-[.destructive]:hover:bg-red-100 group-[.destructive]:focus:ring-red-500',
      'group-[.warning]:border-yellow-200 group-[.warning]:hover:bg-yellow-100 group-[.warning]:focus:ring-yellow-500',
			className,
		)}
		{...props}
	/>
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
	<ToastPrimitives.Close
		ref={ref}
		className={cn(
			'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100',
      'group-[.success]:text-green-400 group-[.success]:hover:text-green-600 group-[.success]:focus:ring-green-500',
      'group-[.destructive]:text-red-400 group-[.destructive]:hover:text-red-600 group-[.destructive]:focus:ring-red-500',
      'group-[.warning]:text-yellow-400 group-[.warning]:hover:text-yellow-600 group-[.warning]:focus:ring-yellow-500',
			className,
		)}
		toast-close=""
		{...props}
	>
		<X className="h-4 w-4" />
	</ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
	<ToastPrimitives.Title
		ref={ref}
		className={cn('text-sm font-semibold', className)}
		{...props}
	/>
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
	<ToastPrimitives.Description
		ref={ref}
		className={cn('text-sm opacity-90', className)}
		{...props}
	/>
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export {
	Toast,
	ToastAction,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
};