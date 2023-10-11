var mysql = require("mysql");

var connection = mysql.createConnection({
	host: process.env.NEXT_PUBLIC_HOST,
	user: process.env.NEXT_PUBLIC_USER,
	password: process.env.NEXT_PUBLIC_PASSWORD,
	database: process.env.NEXT_PUBLIC_DATABASE,
	port: process.env.NEXT_PUBLIC_PORT
});

connection.connect();

export async function queryExecute(str, value) {
	let data = await new Promise((resolve, reject) => {
		connection.query(str, value, function (error, results) {
			resolve(results);
		});
	});
	return data;
}

export async function GET() {
	const data = await queryExecute('select * from member')

	return Response.json(data);
}

export async function POST(req) {
	const { name, email, id } = await req.json();
	const data = await queryExecute(`insert into member (id,name,email) values (?, ?, ?)`, [id, name, email])

	return Response.json([]);
}


	// const data = await queryExecute('select * from member')
    // const data = await queryExecute(`insert into member (id,name,email) values ('abc','홍길순','hong@gmail.com')`)
    // const data = await queryExecute(`update member set name='차민규' where num = 7`)
    // const data = await queryExecute(`delete from member where num=8`)


    // const data = await queryExecute(`
    //     create table contact (
    //         name varchar(30),
    //         email varchar(100),
    //         contents text,
    //         num int not null auto_increment,
    //         primary key(num)
    //     )
    // `)
	
    // const data = await queryExecute(`drop table contact`);