import { Button, Table, Dropdown } from "antd";
import { Checkbox, TableColumnsType } from "antd";
import { generateFilters } from "../utils/filter";
import MoreOutlined from "../../../shared/components/icons/MoreOutlined.svg?react";
import type { MenuProps } from "antd";
import type { MemberData } from "../types/member.type";
import dayjs from "dayjs";

interface MemberTableProps {
  members: MemberData[];
  onEdit: (mode: "create" | "edit", record?: MemberData) => void;
  onDelete: (key: string) => void;
  onDeleteSelected: (keys: string[]) => void;
  selectedKeys: React.Key[];
  onSelectedKeysChange: (keys: React.Key[]) => void;
}

const MemberTable = ({
  members,
  onEdit,
  onDelete,
  selectedKeys,
  onSelectedKeysChange,
}: MemberTableProps) => {
  const getItems = (record: MemberData): MenuProps["items"] => [
    {
      key: "1",
      label: "수정",
      onClick: () => onEdit("edit", record),
    },
    {
      key: "2",
      label: "삭제",
      danger: true,
      onClick: () => onDelete(record.key.toString()),
    },
  ];

  const columns: TableColumnsType<MemberData> = [
    {
      title: "이름",
      dataIndex: "name",
      filters: generateFilters(members, "name"),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value as string),
      width: "10%",
    },
    {
      title: "주소",
      dataIndex: "address",
      filters: generateFilters(members, "address"),
      onFilter: (value, record) => record.address.includes(value as string),
      filterSearch: true,
      width: "20%",
    },
    {
      title: "메모",
      dataIndex: "memo",
      filters: generateFilters(members, "memo"),
      onFilter: (value, record) => record.memo.includes(value as string),
      filterSearch: true,
      width: "20%",
    },
    {
      title: "가입일",
      dataIndex: "createdAt",
      filters: generateFilters(members, "createdAt"),
      onFilter: (value, record) =>
        dayjs(record.createdAt)
          .toISOString()
          .includes(value as string),
      width: "20%",
      render: (date: Date | string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "직업",
      dataIndex: "job",
      filters: generateFilters(members, "job"),
      onFilter: (value, record) => record.job.includes(value as string),
      filterSearch: true,
      width: "20%",
    },
    {
      title: "이메일 수신 동의",
      dataIndex: "emailAgree",
      filters: generateFilters(members, "emailAgree"),
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
    <div>
      <Table<MemberData>
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange: (newSelectedRowKeys) => {
            onSelectedKeysChange(newSelectedRowKeys);
          },
        }}
        columns={columns}
        dataSource={members}
      />
    </div>
  );
};

export { MemberTable };
export type { MemberData };
