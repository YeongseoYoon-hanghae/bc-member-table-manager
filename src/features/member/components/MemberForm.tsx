import { Form, Input, DatePicker, Select, Checkbox } from "antd";
import { FormInstance } from "antd/lib/form";
import { MemberData } from "../types/member.type";
import { Dayjs } from "dayjs";

interface FormValues extends Omit<MemberData, "key" | "createdAt"> {
  createdAt: Dayjs;
}

interface MemberFormProps {
  form: FormInstance;
  onFinish: (values: FormValues) => void;
}

const MemberForm = ({ form, onFinish }: MemberFormProps) => {
  const handleFinish = (values: FormValues) => {
    onFinish(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        name="name"
        label="이름"
        rules={[
          { required: true, message: "이름을 입력해주세요" },
          { max: 20, message: "20글자를 초과할 수 없습니다" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="주소"
        rules={[{ max: 20, message: "20글자를 초과할 수 없습니다" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="memo"
        label="메모"
        rules={[{ max: 50, message: "50글자를 초과할 수 없습니다" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="createdAt"
        label="가입일"
        rules={[{ required: true, message: "가입일을 선택해주세요" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="job" label="직업">
        <Select>
          <Select.Option value="개발자">개발자</Select.Option>
          <Select.Option value="PO">PO</Select.Option>
          <Select.Option value="디자이너">디자이너</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="emailAgree" valuePropName="checked">
        <Checkbox>이메일 수신 동의</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default MemberForm;
