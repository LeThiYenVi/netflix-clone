import { Button, Form, Image, Input, Modal, Select, Table, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import uploadFile from "../../utils/upload";
function MovieManagement() {
  const [form] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Poster",
      dataIndex: "poster_path",
      key: "poster_path",
      render: (poster_path) => <Image src={poster_path} width={200} />,
    },
  ];
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  async function fetchMovies() {
    const response = await axios.get(
      "https://6627a8dab625bf088c092f74.mockapi.io/Movie"
    );

    console.log(response.data);
    setDataSource(response.data);
  }

  function handleShowModal() {
    setIsOpen(true);
  }

  function handleHideModal() {
    setIsOpen(false);
  }

  function handleOk() {
    form.submit();
  }

  async function handleSubmit(values) {
    console.log(values);
    console.log(values.poster_path.file.originFileObj);
    const url = await uploadFile(values.poster_path.file.originFileObj);
    values.poster_path = url;

    axios.post("https://662b9b40de35f91de158d81b.mockapi.io/Movie", values);

    setDataSource([...dataSource, values]);

    // hide modal
    handleHideModal();

    // clear form
    form.resetFields();
    
  }

  useEffect(function () {
    fetchMovies();
  }, []);

  return (
    <div>
      <Button type="primary" onClick={handleShowModal}>
        Add new movie
      </Button>
      <Table columns={columns} dataSource={dataSource} />

      <Modal
        title="Add new movie"
        open={isOpen}
        onCancel={handleHideModal}
        onOk={handleOk}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select
              options={[
                { value: "Trending", label: <span>Trending</span> },
                { value: "Comedy", label: <span>Comedy</span> },
                { value: "Action", label: <span>Action</span> },
                { value: "Horror", label: <span>Horror</span> },
              ]}
            />
          </Form.Item>
          <Form.Item label="Poster" name="poster_path">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default MovieManagement;
