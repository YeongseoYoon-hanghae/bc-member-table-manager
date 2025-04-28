import MemberTable from "./features/member/components/Table";
import { Button } from "antd";
import PlusOutlined from "./shared/components/icons/PlusOutlined.svg?react";

const App = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">회원 목록</h2>
          <Button type="primary" icon={<PlusOutlined />}>
            추가
          </Button>
        </div>
        <MemberTable />
      </div>
    </div>
  );
};

export default App;
