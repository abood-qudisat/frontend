import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import useFileUpload from '../../hooks/useFileUpload';

const FileUpload = () => {
    const { file, setFile, uploadFile } = useFileUpload();
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            message.error('Please select a file before submitting.');
            return;
        }
        setLoading(true);
        try {
            await uploadFile(file);
            message.success('File uploaded successfully!');
        } catch (error) {
            message.error('File upload failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Input type="file" onChange={handleFileChange} />
            <Button 
                type="primary" 
                onClick={handleSubmit} 
                loading={loading}
                disabled={loading}
            >
                Upload Assignment
            </Button>
        </div>
    );
};

export default FileUpload;