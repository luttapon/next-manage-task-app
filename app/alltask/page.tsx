"use client";
import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// สร้างตัวแปร Page ที่เป็นฟังก์ชันคอมโพเนนต์
type Task = {
  id: number;
  title: string;
  detail: string;
  is_completed: boolean;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // ดึงข้อมูลจาก Supabase
    async function fetchTasks() {
      const { data, error } = await supabase
        .from("task_tb")
        .select(
          "id, title, detail, is_completed, image_url, created_at, updated_at"
        )
        .order("created_at", { ascending: false });

      // ตรวจสอบข้อผิดพลาดและตั้งค่าข้อมูล
      if (error) {
        alert("Error  tasks:");
        console.log(error.message);
        return;
      }

      if (data) {
        setTasks(data);
      }
    }
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col w-3/4 mx-auto">
      <div className="flex flex-col items-center mt-20 gap-4">
        <Image src={logo} alt="Logo" width={150} height={150} />
        <h1 className="text-2xl font-bold mt-10">Task Manager App</h1>
        <h1 className="text-gray-600">บันทึก จัดการงาน</h1>
      </div>
      <div className="flex justify-end  ">
        <Link
          href="/addtask"
          className="mt-10 px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-max ">
          เพิ่มงาน
        </Link>
      </div>

      <div>
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-black py-2">รูป</th>
              <th className="border border-black py-2">งานที่ต้องทำ</th>
              <th className="border border-black py-2">รายละเอียด</th>
              <th className="border border-black py-2">สถานะ</th>
              <th className="border border-black py-2">วันที่เพิ่ม</th>
              <th className="border border-black py-2">วันที่แก้ไข</th>
              <th className="border border-black py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="border border-black py-2">
                  {task.image_url ? (
                    <Image
                      src={task.image_url}
                      alt="logo"
                      width={50}
                      height={50}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border border-black p-2">{task.title}</td>
                <td className="border border-black p-2">{task.detail}</td>
                <td className="border border-black p-2">
                  {" "}
                  <span
                    className={
                      task.is_completed
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }>
                    {task.is_completed ? "เสร็จสิ้น" : "ยังไม่เสร็จสิ้น"}
                  </span>
                </td>
                <td className="border border-black p-2">
                  {new Date(task.created_at).toLocaleDateString()}{" "}
                </td>
                <td className="border border-black p-2">
                  {" "}
                  {new Date(task.updated_at).toLocaleDateString()}
                </td>
                <td className="border border-black p-2">
                  {" "}
                  <Link href={`/edittask/${task.id}`}> แก้ไข</Link>{" "}
                  <button>ลบ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-10">
        <Link href="/" className="text-blue-600 font-blod">
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
