import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber, Upload, Modal, message } from "antd";
import { DeleteOutlined, LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import YatchService from "@/services/yatch-service/YatchService";

const YachtDetail = () => {
  const { id } = useParams();
  const { useGetYachtDetail, useUpdateYatch, useDeleteYatchImage } = YatchService();

  const { data: yatch, isLoading, refetch } = useGetYachtDetail(id!);
  const updateYatch = useUpdateYatch();
  const deleteYatchImage = useDeleteYatchImage();

  const [form] = Form.useForm();
  const [previewImages, setPreviewImages] = useState<any[]>([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (yatch) form.setFieldsValue(yatch);
  }, [yatch]);

  // ✅ delete image with correct API
  const handleImageRemove = async (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();

    Modal.confirm({
      title: "Remove Image",
      content: "Are you sure you want to delete this image?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteYatchImage.mutateAsync({
            id: Number(id),
            image_path: url,
          });
          message.success("Image deleted successfully!");
          refetch();
          setIsChanged(true); // user made change
        } catch (error) {
          console.error(error);
          message.error("Failed to delete image!");
        }
      },
    });
  };

  // ✅ handle new uploads
  const handleImageChange = ({ fileList }: any) => {
    setPreviewImages(fileList);
    if (fileList.length > 0) setIsChanged(true);
  };

  // ✅ handle field changes
  const handleValuesChange = () => {
    setIsChanged(true);
  };

  // ✅ update yacht info + add new images
  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("capacity", values.capacity);
      formData.append("rooms", values.rooms);
      formData.append("washrooms", values.washrooms);
      formData.append("per_hour_rate", values.per_hour_rate);
      formData.append("currency", values.currency);

      previewImages.forEach((file: any) => {
        if (file.originFileObj) {
          formData.append("images[]", file.originFileObj);
        }
      });

      await updateYatch.mutateAsync({ id: Number(id), data: formData });
      message.success("Yacht updated successfully!");
      setPreviewImages([]);
      setIsChanged(false); // reset change tracking
      refetch();
    } catch (error) {
      console.error(error);
      message.error("Failed to update yacht!");
    }
  };

  if (isLoading)
    return (
      <p className="p-4 text-gray-600 text-center">
        <LoadingOutlined style={{ fontSize: 40, color: "#00a1b3" }} spin />
      </p>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Yacht Details</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={yatch}
        onValuesChange={handleValuesChange} // track form changes
      >
        {/* Yacht Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Yacht Name"
            name="name"
            rules={[{ required: true, message: "Please enter yacht name" }]}
          >
            <Input placeholder="Enter yacht name" />
          </Form.Item>

          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: "Please enter capacity" }]}
          >
            <InputNumber placeholder="Enter capacity" className="w-full" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Rooms"
            name="rooms"
            rules={[{ required: true, message: "Please enter number of rooms" }]}
          >
            <InputNumber placeholder="Enter rooms count" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Washrooms"
            name="washrooms"
            rules={[{ required: true, message: "Please enter number of washrooms" }]}
          >
            <InputNumber placeholder="Enter washrooms count" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Per Hour Rate"
            name="per_hour_rate"
            rules={[{ required: true, message: "Please enter rate" }]}
          >
            <InputNumber placeholder="Enter per hour rate" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Currency"
            name="currency"
            rules={[{ required: true, message: "Please enter currency" }]}
          >
            <Input placeholder="Enter currency" />
          </Form.Item>
        </div>

        {/* ✅ Image Section */}
        <Form.Item label="Images">
          <div className="flex flex-wrap gap-4">
            {yatch?.image_paths?.map((url: string, index: number) => (
              <div
                key={index}
                className="relative w-28 h-28 border rounded-md overflow-hidden group"
              >
                <img
                  src={url}
                  alt={`Yacht-${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => handleImageRemove(e, url)}
                  type="button"
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition"
                >
                  <DeleteOutlined size={14} />
                </button>
              </div>
            ))}

            <Upload
              listType="picture-card"
              multiple
              beforeUpload={() => false}
              onChange={handleImageChange}
              fileList={previewImages}
              accept="image/*"
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </div>
        </Form.Item>

        {/* ✅ Update button */}
        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isChanged} // disable until changes made
            loading={updateYatch.isPending}
            className={`${
              isChanged
                ? "bg-[#00a1b3] hover:!bg-sky-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Update Yacht
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default YachtDetail;
