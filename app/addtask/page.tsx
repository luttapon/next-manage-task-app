"use client";
import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Page() {
  const [title, setTitle] = useState<String>("");
  const [detail, setDetail] = useState<String>("");
  const [is_completed, setIsCompleted] = useState<boolean>(false);
  const [image_url, setImageFile] = useState<File | null>(null);
  const [preview, setPreviewFile] = useState<string>("");

  function handleSelectImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (file) {
      setPreviewFile(URL.createObjectURL(file as Blob));
    }
  }

  async function handleUploadAndSave(e: React.FormEvent<HTMLElement>) {
    if (!title || !detail) {
    }
  }

  return (
    <div className="flex flex-col w-3/4 mx-auto">
      <div className="flex flex-col items-center mt-20 gap-4">
        <Image src={logo} alt="Logo" width={150} height={150} />
        <h1 className="text-2xl font-bold mt-10">Task Manager App</h1>
        <h1 className="text-gray-600">บันทึก จัดการงาน</h1>
      </div>
      <div className="mt-10 flex flex-col border border-gray-300 p-5  ">
        <h1 className="text-center text-xl font-bold">ชื่องาน</h1>
        <form onSubmit={handleUploadAndSave}>
          <div className="flex flex-col mt-5">
            <label className="text-lg font-bold"> งานที่ต้องทำ</label>
            <input
              type="text"
              className="botder border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col mt-5"></div>
          <label className="text-lg font-bold">รายละเอียด</label>
          <textarea className="border border-gray-300 rounded-lg p-2"></textarea>

          <div className="flex flex-col mt-5">
            <label className="text-lg font-bold">อัปโหลดรูปภาพ</label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="fileInput"
              className="bg-blue-500  text-white px-4 py-2 rounded-lg cursor-pointer w-30 text-center  ">
              เลือกรูป
            </label>
            {preview && (
              <div className="mt-4">
                <Image src={preview} alt="preview" width={100} height={100} />
              </div>
            )}
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-lg font-bold ">สถานะงาน</label>
            <select className="border border-gray-300 rounded-lg p-2 ">
              <option value="not_completed">ยังไม่เสร็จสิ้น</option>
              <option value="completed">เสร็จสิ้น</option>
            </select>
          </div>

          <div className="flex justify-center mt-10"></div>
          <button className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600  ">
            บันทึก
          </button>
        </form>
      </div>

      <div className="flex justify-center mt-10 "></div>
      <Link href="/" className="text-blue-600 font-blod text-center">
        กลับหน้าหลัก
      </Link>
    </div>
  );
}
