"use client";

import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface ErrorPageProps {
    error: Error,
    reset: () => void;
}

export default function ErrorPage({error}: ErrorPageProps) {
    return <div>
        {error.message}
    </div>
}