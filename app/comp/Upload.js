"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Upload() {
	const [view, setView] = useState();
	const [data, setData] = useState([]);

	function base64Blob(b64Data, contentType="") {
		const image_data = atob(b64Data.split(",")[1]);

		const arraybuffer = new ArrayBuffer(image_data.length);
		const iview = new Uint8Array(arraybuffer);

		for (let i=0; i<image_data.length; i++) {
			iview[i] = image_data.charCodeAt(i) & 0xff;
		}

		const blob = new Blob([arraybuffer], {type:contentType});
		return URL.createObjectURL(blob); 
	}

	const upload = (e) => {
		e.preventDefault()

		let formData = new FormData(e.target);
		let objData = Object.fromEntries(formData);

		const fr = new FileReader();
		fr.readAsDataURL(objData.upload);
		fr.addEventListener('load', () => {
			axios.post("/api/upload/files", {title:objData.title, imgUrl:fr.result});
		})
	}



	useEffect(()=>{
		axios.get("/api/upload/files")
		.then(res=>{
			setData(res.data);
		}, [])

		// 압축함수사용
		// const setD = data.map(item=>{
		// 	item.imgUrl = base64Blob(item.imgUrl);
		// 	return obj;
		// })
	})

	return (
		<>
		<form encType='multipart/form-data' method='post' onSubmit={(e) => {upload(e)}}>
			<p><input type='text' name='title' /></p>
			<p><input type='file' name='upload' onChange={(e)=>{
					const file = e.target.files[0];
					file && setView(URL.createObjectURL(file));
				}}
				/><img src={view} width="200px"/></p>
			<button>저장</button>
		</form>
		<ul>
			{data.map(item=>(
				<li>
					<img src={item.imgUrl}></img>
					<p>{item.title}</p>
				</li>
			))}
		</ul>
		</>
	)
}

export default Upload