import React, { useState } from "react";
import { Table, Button, Input, Space } from "antd";
import { data } from "./GetData";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const TableData = () => {
  const [searchText, setSearchText] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    age: true,
    address: true,
    email: true,
    phone: true,
    assignment: true,
  });

  const toggleColumnVisibility = (columnName) => {
    setVisibleColumns((prevVisibleColumns) => ({
      ...prevVisibleColumns,
      [columnName]: !prevVisibleColumns[columnName],
    }));
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      show: visibleColumns.id,
    },
    {
      title: "name",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.localeCompare(b.name),
      show: visibleColumns.name,
    },
    {
      title: "age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
      show: visibleColumns.age,
    },
    {
      title: "address",
      dataIndex: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
      show: visibleColumns.address,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search address"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters()}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      show: visibleColumns.email,
    },
    {
      title: "phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      show: visibleColumns.phone,
    },
    {
      title: "assignment",
      dataIndex: "completed",
      show: visibleColumns.assignment,
      render: (completed) => {
        return <p>{completed ? "Complete" : "in progress"}</p>;
      },
      filters: [
        { text: "Complete", value: true },
        { text: "in progress", value: false },
      ],
      onFilter: (value, record) => {
        return record.completed === value;
      },
    },
  ].filter((column) => column.show);

  return (
    <div>
      <Input.Search
        placeholder="search name here..."
        style={{ marginBottom: 8 }}
        onSearch={(value) => {
          setSearchText(value);
        }}
      />
      <div>
        {Object.keys(visibleColumns).map((columnName) => (
          <Button
            key={columnName}
            onClick={() => toggleColumnVisibility(columnName)}
            icon={
              visibleColumns[columnName] ? (
                <EyeOutlined />
              ) : (
                <EyeInvisibleOutlined />
              )
            }
          >
            {columnName}
          </Button>
        ))}
      </div>
      <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default TableData;
