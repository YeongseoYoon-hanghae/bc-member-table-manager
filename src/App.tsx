import { MemberTable, type DataType } from "./features/member/components/Table";
import { Button, Modal, Form } from "antd";
import PlusOutlined from "./shared/components/icons/PlusOutlined.svg?react";
import { useState } from "react";
import MemberForm from "./features/member/components/MemberForm";
import dayjs, { Dayjs } from "dayjs";

interface FormValues extends Omit<DataType, "key" | "createdAt"> {
  createdAt: Dayjs;
}

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const handleModalOpen = (mode: "create" | "edit", record?: DataType) => {
    setModalMode(mode);
    setIsModalOpen(true);
    if (mode === "edit" && record) {
      form.setFieldsValue({
        ...record,
        createdAt: dayjs(record.createdAt),
      });
    } else {
      form.resetFields();
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = (values: FormValues) => {
    const formattedValues: Omit<DataType, "key"> = {
      ...values,
      createdAt: values.createdAt.toDate(),
    };
    console.log("Form values:", formattedValues);
    handleModalClose();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">회원 목록</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleModalOpen("create")}
          >
            추가
          </Button>
        </div>
        <MemberTable onOpenModal={handleModalOpen} />
      </div>

      <Modal
        title={modalMode === "create" ? "회원 추가" : "회원 수정"}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleModalClose}
        okText={modalMode === "create" ? "추가" : "수정"}
        cancelText="취소"
      >
        <MemberForm form={form} onFinish={handleSubmit} />
      </Modal>
    </div>
  );
};

export default App;
