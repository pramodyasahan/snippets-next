import {db} from "@/db"
import Link from "next/link";

export default async function Home() {
    const snippets = await db.snippet.findMany();
    const renderedSnippets = snippets.map((snippet) => {
        return (
            <div className="container">
                <Link key={snippet.id}
                      href={`/snippets/${snippet.id}`}
                      className="flex justify-between items-center p-2 border rounded">
                    <div>{snippet.title}</div>
                    <div>Show</div>
                </Link>
            </div>
        )
    })

    return (
        <div>
            <div className="flex m-2 justify-between items-center">
                <h1 className="text-xl font-bold">Snippets</h1>
                <Link href="/snippets/new" className="border p-2 bg-blue-50 rounded-2xl">New</Link>
            </div>
            <div className="flex flex-col gap-2">{renderedSnippets}</div>
        </div>
    );
}
