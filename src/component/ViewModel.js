import React from "react";
import { Modal, Typography, Tag } from "antd";

const { Text } = Typography;

const ViewModal = ({ visible, onClose, data }) => {
    if (!data) return null;

    return (
        <Modal
            title="Todo Details"
            visible={visible}
            onOk={onClose}
            onCancel={onClose}
            footer={null}>
            <p>
                <Text strong>Username:</Text> {data.username}
            </p>
            <p>
                <Text strong>Title:</Text> {data.title}
            </p>
            <p>
                <Text strong>Completion:</Text>{" "}
                {data.completed ? (
                    <Tag color="green">Completed</Tag>
                ) : (
                    <Tag color="red">Not Completed</Tag>
                )}
            </p>
        </Modal>
    );
};

export default ViewModal;
