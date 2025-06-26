import React, { useState, useEffect } from 'react';
import { assetsAPI, departmentsAPI, locationsAPI, usersAPI, Asset, Department, Location, User } from '../../service/api';

const AssetsAdmin: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [assetsData, departmentsData, locationsData, usersData] = await Promise.all([
        assetsAPI.getAll(),
        departmentsAPI.getAll(),
        locationsAPI.getAll(),
        usersAPI.getAll()
      ]);
      
      setAssets(assetsData);
      setDepartments(departmentsData);
      setLocations(locationsData);
      setUsers(usersData);
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
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.asset_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (asset.description && asset.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('คุณต้องการลบทรัพย์สินนี้หรือไม่?')) {
      try {
        await assetsAPI.delete(id);
        setAssets(assets.filter(asset => asset.id !== id));
      } catch (err) {
        alert('Failed to delete asset');
      }
    }
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการทรัพย์สิน</h1>
              <p className="text-gray-600">ระบบจัดการทรัพย์สินของมหาวิทยาลัยแม่ฟ้าหลวง</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                + เพิ่มทรัพย์สินใหม่
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="flex items-end">
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600">รวมทั้งหมด: </span>
                <span className="font-semibold text-gray-900">{filteredAssets.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Asset Image */}
              <div className="h-48 bg-gray-200 relative">
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
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(asset.status)}`}>
                    {getStatusText(asset.status)}
                  </span>
                </div>
              </div>

              {/* Asset Info */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">{asset.name}</h3>
                  <p className="text-sm text-gray-500 font-mono">{asset.asset_code}</p>
                </div>

                {asset.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{asset.description}</p>
                )}

                <div className="space-y-2 text-sm">
                  {asset.department_name && (
                    <div className="flex items-center">
                      <span className="text-gray-500 w-16">แผนก:</span>
                      <span className="text-gray-900">{asset.department_name}</span>
                    </div>
                  )}
                  {asset.location_name && (
                    <div className="flex items-center">
                      <span className="text-gray-500 w-16">สถานที่:</span>
                      <span className="text-gray-900">{asset.location_name}</span>
                    </div>
                  )}
                  {asset.owner_name && (
                    <div className="flex items-center">
                      <span className="text-gray-500 w-16">ผู้รับผิดชอบ:</span>
                      <span className="text-gray-900">{asset.owner_name}</span>
                    </div>
                  )}
                  {asset.acquired_date && (
                    <div className="flex items-center">
                      <span className="text-gray-500 w-16">วันที่ได้มา:</span>
                      <span className="text-gray-900">
                        {new Date(asset.acquired_date).toLocaleDateString('th-TH')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3 border-t border-gray-200 flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white text-sm py-2 px-3 rounded hover:bg-blue-700 transition-colors">
                    แก้ไข
                  </button>
                  <button 
                    onClick={() => handleDelete(asset.id)}
                    className="flex-1 bg-red-600 text-white text-sm py-2 px-3 rounded hover:bg-red-700 transition-colors"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบทรัพย์สิน</h3>
            <p className="text-gray-600">ลองเปลี่ยนเงื่อนไขการค้นหาหรือเพิ่มทรัพย์สินใหม่</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetsAdmin;
