import { Button, Table, Dropdown } from "antd";
import { Checkbox, TableColumnsType, TableProps } from "antd";
import { generateFilters } from "../utils/filter";
import MoreOutlined from "../../../shared/components/icons/MoreOutlined.svg?react";
import type { MenuProps } from "antd";
import { initialMembers } from "../data/initialData";
import type { MemberData } from "../types/member.type";

interface Props {
  onOpenModal: (mode: "create" | "edit", record?: MemberData) => void;
}

const onChange: TableProps<MemberData>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const MemberTable = ({ onOpenModal }: Props) => {
  const getItems = (record: MemberData): MenuProps["items"] => [
    {
      key: "1",
      label: "수정",
      onClick: () => onOpenModal("edit", record),
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

  const columns: TableColumnsType<MemberData> = [
    {
      title: "이름",
      dataIndex: "name",
      filters: generateFilters(initialMembers, "name"),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value as string),
      width: "10%",
    },
    {
      title: "주소",
      dataIndex: "address",
      filters: generateFilters(initialMembers, "address"),
      onFilter: (value, record) => record.address.includes(value as string),
      filterSearch: true,
      width: "20%",
    },
    {
      title: "메모",
      dataIndex: "memo",
      filters: generateFilters(initialMembers, "memo"),
      onFilter: (value, record) => record.memo.includes(value as string),
      filterSearch: true,
      width: "20%",
    },
    {
      title: "가입일",
      dataIndex: "createdAt",
      filters: generateFilters(initialMembers, "createdAt"),
      onFilter: (value, record) =>
        record.createdAt.toISOString().includes(value as string),
      width: "20%",
      render: (date: Date) => date.toLocaleDateString(),
    },
    {
      title: "직업",
      dataIndex: "job",
      filters: generateFilters(initialMembers, "job"),
      onFilter: (value, record) => record.job.includes(value as string),
      filterSearch: true,
      width: "20%",
    },
    {
      title: "이메일 수신 동의",
      dataIndex: "emailAgree",
      filters: generateFilters(initialMembers, "emailAgree"),
      onFilter: (value, record) => record.emailAgree === value,
      filterSearch: true,
      width: "10%",
      render: (value) => <Checkbox checked={value} />,
    },
    {
      dataIndex: "action",
      width: "10%",
      render: (_, record) => (
        <Dropdown
          menu={{ items: getItems(record) }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <Table<MemberData>
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
      dataSource={initialMembers}
      onChange={onChange}
    />
  );
};

export { MemberTable };
export type { MemberData };
