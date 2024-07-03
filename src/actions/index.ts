"use server";
import {redirect} from "next/navigation";
import {db} from "@/db";
import {revalidatePath} from "next/cache";

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: {id},
        data: {code}
    });
    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: {id}
    });
    revalidatePath('/');
    redirect('/');
}

export async function createSnippet(formState: { message: string }, formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;

        if (title.length < 3) {
            return {
                message: "Title must be longer"
            };
        }
        if (code.length < 10) {
            return {
                message: "code must be longer"
            };
        }

        const snippet = await db.snippet.create({
            data: {
                title,
                code
            }
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {message: err.message}
        } else {
            return {
                message: "Something went wrong!"
            }
        }
    }
    revalidatePath('/')
    redirect('/');
}