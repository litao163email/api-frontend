import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProTable } from '@ant-design/pro-components';
import React, { useEffect, useRef } from 'react';

export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const UpdateForm: React.FC<Props> = (props) => {
  const { values, visible, columns, onCancel, onSubmit } = props;

  const ref = useRef<ProFormInstance>();

  useEffect(() => {
    if (ref) {
      ref.current?.setFieldsValue(values);
    }
  }, [values]);

  return (
    <ModalForm
      width={640}
      title="更新"
      open={visible}
      submitTimeout={1000}
      modalProps={{
        destroyOnClose: true,
        onCancel: onCancel,
      }}
      submitter={false}
    >
      {/* 用于展示原有的数据 */}
      <ProTable
        type="form"
        formRef={ref}
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </ModalForm>
  );
};

export default UpdateForm;
