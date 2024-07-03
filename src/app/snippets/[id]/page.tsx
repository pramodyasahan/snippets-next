import {notFound} from "next/navigation";
import {db} from "@/db";
import Link from "next/link";

interface SnippetShowPageProps {
    params: {
        id: string
    }
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
    const snippet = await db.snippet.findFirst({
        where: {id: parseInt(props.params.id)}
    })

    if (!snippet) return notFound()

    return <div>
        <div className="flex m-4 justify-between items-center">
            <h1 className="text-2xl font-bold">{snippet.title}</h1>
            <div className="flex gap-4">
                <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded-2xl px-6">Edit</Link>
                <button className="p-2 border rounded-2xl px-6">Delete</button>
            </div>
        </div>
        <pre className="p-3 border rounded bg-gray-200 border-gray-300">
            <code>{snippet.code}</code>
        </pre>
    </div>
}