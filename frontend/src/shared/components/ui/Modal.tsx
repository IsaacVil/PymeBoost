"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
          bg-slate-800 border border-slate-700 rounded-lg p-8 w-full max-w-lg shadow-xl
          focus:outline-none">
          <Dialog.Title className="text-xl font-semibold text-slate-100 mb-4">{title}</Dialog.Title>
          {children}
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-100">✕</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
