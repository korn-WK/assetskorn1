import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { assetsAPI, departmentsAPI, locationsAPI, Asset, Department, Location } from '../../service/api';

const DashboardUser: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [assetsData, departmentsData, locationsData] = await Promise.all([
        assetsAPI.getAll(),
        departmentsAPI.getAll(),
        locationsAPI.getAll()
      ]);
      
      setAssets(assetsData);
      setDepartments(departmentsData);
      setLocations(locationsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusCount = (status: string) => {
    return assets.filter(asset => asset.status === status).length;
  };

  const getDepartmentAssetCount = (departmentId: number) => {
    return assets.filter(asset => asset.department_id === departmentId).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌</div>
          <p className="text-gray-600">เกิดข้อผิดพลาด: {error}</p>
          <button 
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">แดชบอร์ดผู้ใช้</h1>
              <p className="text-gray-600">ภาพรวมทรัพย์สินของมหาวิทยาลัยแม่ฟ้าหลวง</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link href="/user/assets_user">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  ดูทรัพย์สิน
                </button>
              </Link>
              <Link href="/">
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  หน้าหลัก
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ทรัพย์สินทั้งหมด</p>
                <p className="text-2xl font-semibold text-gray-900">{assets.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ใช้งานได้</p>
                <p className="text-2xl font-semibold text-gray-900">{getStatusCount('active')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ตรวจสอบแล้ว</p>
                <p className="text-2xl font-semibold text-gray-900">{getStatusCount('audited')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">โอนย้าย</p>
                <p className="text-2xl font-semibold text-gray-900">{getStatusCount('transferring')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">สถานะทรัพย์สิน</h3>
            <div className="space-y-3">
              {[
                { status: 'active', label: 'ใช้งาน', color: 'bg-green-500', count: getStatusCount('active') },
                { status: 'audited', label: 'ตรวจสอบแล้ว', color: 'bg-blue-500', count: getStatusCount('audited') },
                { status: 'transferring', label: 'โอนย้าย', color: 'bg-yellow-500', count: getStatusCount('transferring') },
                { status: 'missing', label: 'สูญหาย', color: 'bg-red-500', count: getStatusCount('missing') },
                { status: 'broken', label: 'เสียหาย', color: 'bg-orange-500', count: getStatusCount('broken') },
                { status: 'disposed', label: 'จำหน่าย', color: 'bg-gray-500', count: getStatusCount('disposed') }
              ].map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Department Assets */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ทรัพย์สินตามแผนก</h3>
            <div className="space-y-3">
              {departments.map((dept) => (
                <div key={dept.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{dept.name_th}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {getDepartmentAssetCount(dept.id)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Assets */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ทรัพย์สินล่าสุด</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">รหัส</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">แผนก</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานที่</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assets.slice(0, 5).map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {asset.asset_code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        asset.status === 'active' ? 'bg-green-100 text-green-800' :
                        asset.status === 'transferring' ? 'bg-yellow-100 text-yellow-800' :
                        asset.status === 'audited' ? 'bg-blue-100 text-blue-800' :
                        asset.status === 'missing' ? 'bg-red-100 text-red-800' :
                        asset.status === 'broken' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {asset.status === 'active' ? 'ใช้งาน' :
                         asset.status === 'transferring' ? 'โอนย้าย' :
                         asset.status === 'audited' ? 'ตรวจสอบแล้ว' :
                         asset.status === 'missing' ? 'สูญหาย' :
                         asset.status === 'broken' ? 'เสียหาย' :
                         asset.status === 'disposed' ? 'จำหน่าย' : asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.department_name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.location_name || asset.location || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการด่วน</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/user/assets_user">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                📦 ดูทรัพย์สินทั้งหมด
              </button>
            </Link>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              📊 สร้างรายงาน
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              🔍 ค้นหาขั้นสูง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
