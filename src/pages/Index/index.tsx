import {
  listInterfaceInfoByPageUsingGET,
} from '@/services/fastApi/interfaceInfoController';
import {
  PageContainer,
} from '@ant-design/pro-components';
import { List, message, Pagination } from 'antd';
import {} from 'antd/es/table/interface';
import React, { useState,useEffect } from 'react';

/**
 * 页面主入口
 * @constructor
 */
const TableList: React.FC = () => {
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const [current, setCurrent] = useState(3);

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   * @param page
   * @param pageSize
   */
  const loadData = async (page:number) => {
    setCurrent(page);
    setLoading(true);
    const hide = message.loading('加载中');
    try {
    const res = await listInterfaceInfoByPageUsingGET({
      current:page
    });
    if (res.data) {
      setList(res.data?.records ?? []);
      message.success('加载成功');
      hide();
      setLoading(false);
      return true;
    }}catch (error) {
      hide();
      setLoading(false);
      message.error('加载失败');
      return false;
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <PageContainer>
      <List
        className="API接口列表"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item: API.InterfaceInfo) => {
          const apiLink = `/list/details/${item.id}`;
          return (
            <List.Item
              actions={[<a key="list-details" href={apiLink}>查看</a>]}
            >
              <List.Item.Meta
                title={<a >{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          );

        }}
      />
      <Pagination current={current} onChange={loadData} total={50} />
    </PageContainer>
  );
};

export default TableList;
