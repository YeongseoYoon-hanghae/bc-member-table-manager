import { Key } from "react";
import { Button, Table, Dropdown } from "antd";
import { Checkbox, TableColumnsType, TableProps } from "antd";
import { generateFilters } from "../utils/filter";
import MoreOutlined from "../../../shared/components/icons/MoreOutlined.svg?react";
import type { MenuProps } from "antd";

interface DataType {
  key: Key;
  name: string;
  address: string;
  memo: string;
  createdAt: string;
  job: string;
  emailAgree: boolean;
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    createdAt: "2024-10-02",
    job: "개발자",
    emailAgree: true,
  },
  {
    key: "2",
    name: "Foo Bar",
    address: "서울 서초구",
    memo: "한국인",
    createdAt: "2024-10-01",
    job: "PO",
    emailAgree: false,
  },
];

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "수정",
    onClick: () => {
      console.log("수정 clicked");
    },
  },
  {
    key: "2",
    label: "삭제",
    danger: true,
    onClick: () => {
      console.log("삭제 clicked");
    },
  },
];

const columns: TableColumnsType<DataType> = [
  {
    title: "이름",
    dataIndex: "name",
    filters: generateFilters(data, "name"),
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value as string),
    width: "10%",
  },
  {
    title: "주소",
    dataIndex: "address",
    filters: generateFilters(data, "address"),
    onFilter: (value, record) => record.address.includes(value as string),
    filterSearch: true,
    width: "20%",
  },
  {
    title: "메모",
    dataIndex: "memo",
    filters: generateFilters(data, "memo"),
    onFilter: (value, record) => record.memo.includes(value as string),
    filterSearch: true,
    width: "20%",
  },
  {
    title: "가입일",
    dataIndex: "createdAt",
    filters: generateFilters(data, "createdAt"),
    onFilter: (value, record) => record.createdAt.includes(value as string),
    width: "20%",
  },
  {
    title: "직업",
    dataIndex: "job",
    filters: generateFilters(data, "job"),
    onFilter: (value, record) => record.job.includes(value as string),
    filterSearch: true,
    width: "20%",
  },
  {
    title: "이메일 수신 동의",
    dataIndex: "emailAgree",
    filters: generateFilters(data, "emailAgree"),
    onFilter: (value, record) => record.emailAgree === value,
    filterSearch: true,
    width: "10%",
    render: (value) => <Checkbox checked={value} />,
  },
  {
    dataIndex: "action",
    width: "10%",
    render: () => (
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <Button icon={<MoreOutlined />} type="text" />
      </Dropdown>
    ),
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const MemberTable = () => {
  return (
    <Table<DataType>
      rowSelection={{
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
      }}
      columns={columns}
      dataSource={data}
      onChange={onChange}
    />
  );
};

export default MemberTable;
