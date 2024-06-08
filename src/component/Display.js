import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Table, Button, Select, Input, Typography } from "antd";
import {
    fetchAllUsersService,
    fetchTodoListService,
} from "../state-machine/service";
import { allTodoListAtom, allUserAtom } from "../state-machine/model";
import ViewModal from "./ViewModel";

const { Title } = Typography;
const { Option } = Select;

const Display = () => {
    const [, getTodoList] = useAtom(fetchTodoListService);
    const [, getUserList] = useAtom(fetchAllUsersService);
    const [allTodoList] = useAtom(allTodoListAtom);
    const [allUserList] = useAtom(allUserAtom);
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTitle, setSearchTitle] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState(null);

    /*eslint-disable */
    useEffect(() => {
        getTodoList();
        getUserList();
    }, []);
    /*eslint-enable*/

    useEffect(() => {
        // Merging users and todos based on user ID
        const mergedData = allTodoList.map((todo) => ({
            key: todo.id,
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
            username: allUserList.find((user) => user.id === todo.userId)
                ?.username,
        }));

        setTableData(mergedData);
        setFilteredData(mergedData);
    }, [allTodoList, allUserList]);

    const handleView = (record) => {
        setModalData(record);
        setIsModalVisible(true);
    };

    const handleUserChange = (value) => {
        setSelectedUser(value);
        filterData(value, searchTitle);
    };

    const handleTitleSearch = (e) => {
        const value = e.target.value;
        setSearchTitle(value);
        filterData(selectedUser, value);
    };

    const filterData = (user, title) => {
        let filtered = tableData;
        if (user) {
            filtered = filtered.filter((item) => item.username === user);
        }
        if (title) {
            filtered = filtered.filter((item) =>
                item.title.toLowerCase().includes(title.toLowerCase())
            );
        }
        setFilteredData(filtered);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            filterDropdown: () => (
                <Select
                    showSearch
                    placeholder="Select a user"
                    optionFilterProp="children"
                    style={{ width: 200 }}
                    onChange={handleUserChange}
                    allowClear>
                    {allUserList.map((user) => (
                        <Option key={user.id} value={user.username}>
                            {user.username}
                        </Option>
                    ))}
                </Select>
            ),
            filterIcon: () => <span>🔍</span>,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            filterDropdown: () => (
                <Input
                    placeholder="Search title"
                    value={searchTitle}
                    onChange={handleTitleSearch}
                    style={{ width: 200 }}
                />
            ),
            filterIcon: () => <span>🔍</span>,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button type="primary" onClick={() => handleView(record)}>
                    View
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Title level={2} style={{ marginLeft: "10px" }}>
                Todo List
            </Title>
            <Table columns={columns} dataSource={filteredData} />
            <ViewModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                data={modalData}
            />
        </div>
    );
};

export default Display;
