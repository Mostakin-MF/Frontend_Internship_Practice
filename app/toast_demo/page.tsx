"use client";

import { toast } from "react-toastify";

export default function ToastDemo() {

    const handleSuccess = () => {
        toast.success("✅ Product added successfully!");
    };

    const handleError = () => {
        toast.error("❌ Something went wrong!");
    };

    const handleCustom = () => {
        toast("🔥 This is a custom message!", {
            style: {
                background: "#1e293b",
                color: "#fff",
                borderRadius: "12px",
            },
        });
    };

    return (
        <div className="flex gap-4 p-10">
            <button
                onClick={handleSuccess}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
                Success
            </button>

            <button
                onClick={handleError}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
                Error
            </button>

            <button
                onClick={handleCustom}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
                Custom
            </button>
        </div>
    );
}