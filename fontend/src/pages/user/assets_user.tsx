import React, { useState, useEffect } from 'react';
import { assetsAPI, departmentsAPI, locationsAPI, Asset, Department, Location } from '../../service/api';

const AssetsUser: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'transferring': return 'bg-yellow-100 text-yellow-800';
      case 'audited': return 'bg-blue-100 text-blue-800';
      case 'missing': return 'bg-red-100 text-red-800';
      case 'broken': return 'bg-orange-100 text-orange-800';
      case 'disposed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ใช้งาน';
      case 'transferring': return 'โอนย้าย';
      case 'audited': return 'ตรวจสอบแล้ว';
      case 'missing': return 'สูญหาย';
      case 'broken': return 'เสียหาย';
      case 'disposed': return 'จำหน่าย';
      default: return status;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesStatus = selectedStatus === 'all' || asset.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || 
                             (asset.department_id && asset.department_id.toString() === selectedDepartment);
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.asset_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (asset.description && asset.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesDepartment && matchesSearch;
  });

  const getStatusCount = (status: string) => {
    return assets.filter(asset => asset.status === status).length;
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">ทรัพย์สิน</h1>
              <p className="text-gray-600">ดูข้อมูลทรัพย์สินของมหาวิทยาลัยแม่ฟ้าหลวง</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                📊 สร้างรายงาน
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{assets.length}</div>
            <div className="text-sm text-gray-600">ทั้งหมด</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{getStatusCount('active')}</div>
            <div className="text-sm text-green-600">ใช้งาน</div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{getStatusCount('transferring')}</div>
            <div className="text-sm text-yellow-600">โอนย้าย</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{getStatusCount('audited')}</div>
            <div className="text-sm text-blue-600">ตรวจสอบแล้ว</div>
          </div>
          <div className="bg-red-50 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{getStatusCount('missing')}</div>
            <div className="text-sm text-red-600">สูญหาย</div>
          </div>
          <div className="bg-orange-50 rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{getStatusCount('broken')}</div>
            <div className="text-sm text-orange-600">เสียหาย</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ค้นหา</label>
              <input
                type="text"
                placeholder="ค้นหาชื่อ, รหัส, หรือคำอธิบาย..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">สถานะ</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">ทั้งหมด</option>
                <option value="active">ใช้งาน</option>
                <option value="transferring">โอนย้าย</option>
                <option value="audited">ตรวจสอบแล้ว</option>
                <option value="missing">สูญหาย</option>
                <option value="broken">เสียหาย</option>
                <option value="disposed">จำหน่าย</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">แผนก</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">ทั้งหมด</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id.toString()}>
                    {dept.name_th}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <div className="bg-gray-100 px-4 py-2 rounded-lg w-full">
                <span className="text-sm text-gray-600">แสดงผล: </span>
                <span className="font-semibold text-gray-900">{filteredAssets.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assets Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    รูปภาพ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    รหัส/ชื่อ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    แผนก
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สถานที่
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ผู้รับผิดชอบ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    วันที่ได้มา
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                        {asset.image_url ? (
                          <img
                            src={asset.image_url}
                            alt={asset.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA5MEwxMDAgNjVMMTI1IDkwSDE3NVYxNzVIMjVWOTBINzVaIiBmaWxsPSIjOUI5QkEwIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMTUiIGZpbGw9IiM5QjlCQTAiLz4KPC9zdmc+';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-500 font-mono">{asset.asset_code}</div>
                        {asset.description && (
                          <div className="text-sm text-gray-600 mt-1 line-clamp-2 max-w-xs">
                            {asset.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(asset.status)}`}>
                        {getStatusText(asset.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.department_name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.location_name || asset.location || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.owner_name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.acquired_date ? 
                        new Date(asset.acquired_date).toLocaleDateString('th-TH') : 
                        '-'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบทรัพย์สิน</h3>
            <p className="text-gray-600">ลองเปลี่ยนเงื่อนไขการค้นหา</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetsUser;

