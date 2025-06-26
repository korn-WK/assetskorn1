import Image from "next/image";
import Link from "next/link";
import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ระบบจัดการทรัพย์สิน
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            มหาวิทยาลัยแม่ฟ้าหลวง
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Admin Section */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">👨‍💼</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">สำหรับผู้ดูแลระบบ</h2>
              <p className="text-gray-600 mb-6">จัดการทรัพย์สินและระบบ</p>
              <div className="space-y-3">
                <Link href="/admin/assets_admin">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    จัดการทรัพย์สิน
                  </button>
                </Link>
                <Link href="/admin/dashboard_admin">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    แดชบอร์ด
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* User Section */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">👤</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">สำหรับผู้ใช้ทั่วไป</h2>
              <p className="text-gray-600 mb-6">ดูข้อมูลทรัพย์สิน</p>
              <div className="space-y-3">
                <Link href="/user/assets_user">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    ดูทรัพย์สิน
                  </button>
                </Link>
                <Link href="/user/dashboard_user">
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    แดชบอร์ด
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Login Section */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">🔐</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">เข้าสู่ระบบ</h2>
              <p className="text-gray-600 mb-6">เข้าสู่ระบบเพื่อใช้งาน</p>
              <Link href="/login">
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  เข้าสู่ระบบ
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">สถิติระบบ</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">📦</div>
              <div className="text-sm text-gray-600">ทรัพย์สิน</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">🏢</div>
              <div className="text-sm text-gray-600">แผนก</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">📍</div>
              <div className="text-sm text-gray-600">สถานที่</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">👥</div>
              <div className="text-sm text-gray-600">ผู้ใช้</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-300">
            © 2024 ระบบจัดการทรัพย์สิน มหาวิทยาลัยแม่ฟ้าหลวง. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 