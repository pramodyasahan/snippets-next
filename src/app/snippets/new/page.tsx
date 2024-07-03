"use client";

import {useFormState} from "react-dom";
import * as actions from "@/actions";
import {db} from "@/db";

export default function SnippetCreatePage() {
    const [formState, action] = useFormState(actions.createSnippet, {message: ""});

    console.log('formState:', formState);

    return (
        <form action={action}>
            <h3 className='font-bold m-3'>Create a Snippet</h3>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-4'>
                    <label className='w-12' htmlFor="title">
                        Title
                    </label>
                    <input
                        className='border rounded p-2 w-full'
                        id="title"
                        name="title"
                        required
                    />
                </div>
                <div className='flex gap-4'>
                    <label className='w-12' htmlFor="code">
                        Code
                    </label>
                    <textarea
                        className='border rounded p-2 w-full'
                        id="code"
                        name="code"
                        required
                    />
                </div>
                {formState.message ? (
                    <div key="message" className="my-2 p-2 bg-red-200 border rounded border-red-400">
                        {formState.message}
                    </div>
                ) : null}
                <button type="submit" className="rounded p-2 bg-blue-200">
                    Save
                </button>
            </div>
        </form>
    );
}


export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();

    return snippets.map((snippet) => {
        return {
            id: snippet.id.toString()
        }
    })
}