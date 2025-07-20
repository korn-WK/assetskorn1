import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Layout from '../../components/common/Layout';
import Navbar from '../../components/common/Navbar';
import AssetTransferVerificationTable from '../../components/admin/AssetTransferVerificationTable';
import DepartmentSelector from '../../components/common/DepartmentSelector';

const AssetTransferVerificationAdminPage: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<'all' | number>('all');

  React.useEffect(() => {
    console.log('DEBUG: user:', user, 'loading:', loading);
    if (!loading) {
      const role = user?.role?.toLowerCase();
      if (!user || role !== 'superadmin') {
        console.log('DEBUG: redirecting because user is not superadmin');
        router.replace('/admin/dashboard');
      }
    }
  }, [user, loading, router]);

  const role = user?.role?.toLowerCase();
  if (loading || !user || role !== 'superadmin') {
    console.log('DEBUG: return null', { loading, user, role });
    return null;
  }

  return (
    <Layout sidebar={<AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}>
      <Navbar
        title="Asset Transfer Verification (All)"
        isAdmin={true}
        onMenuClick={() => setSidebarOpen(true)}
      />
      <div style={{
        padding: '2rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '15px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <AssetTransferVerificationTable
          isSuperAdmin={true}
          departmentFilter={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
        />
      </div>
    </Layout>
  );
};

export default AssetTransferVerificationAdminPage; 