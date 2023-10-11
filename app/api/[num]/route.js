import { useSearchParams } from "next/navigation";
import { queryExecute } from "../route";

export async function DELETE(req, {params}) {
	// const params = useSearchParams();

    const data = await queryExecute(`delete from member where num=?`, [params.num])
    const getData = await queryExecute(`select * from member`, [])

	return Response.json(getData);
}

export async function PUT(req, {params}) {
	// const params = useSearchParams();

    const data = await req.json();
    const q = await queryExecute(`update member set name=? where num=?`, [data.name, params.num])
    const getData = await queryExecute(`select * from member`)

	return Response.json(getData);
}

