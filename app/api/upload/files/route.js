import { queryExecute } from "../../route";


export async function GET() {
    const data = await queryExecute("select * from files")

    return Response.json(data);
}

export async function POST(req) {
    const data = await req.json();
    await queryExecute("insert into files (title, imgUrl) values (?, ?)", [data.title, data.imgUrl])

    return Response.json([]);
}